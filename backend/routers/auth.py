from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from pydantic import BaseModel
import random
from jose import JWTError, jwt

from PosgreSql import get_db, User
from security import get_password_hash, verify_password, create_access_token
from schemas import UserCreate
from email_utils import send_verification_email
from PosgreSql import get_db, User, Task

router = APIRouter(prefix="/auth", tags=["auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")
SECRET_KEY = "my-super-secret-key-for-horror-game"
ALGORITHM = "HS256"

class VerifyCodeRequest(BaseModel):
    email: str
    code: str

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Этот email уже зарегистрирован")
    
    verification_code = str(random.randint(100000, 999999))
    
    new_user = User(
        email=user.email,
        hashed_password=get_password_hash(user.password),
        is_verified=False,
        verification_code=verification_code
    )
    db.add(new_user)
    db.commit()
    
    try:
        send_verification_email(new_user.email, verification_code)
    except Exception as e:
        db.delete(new_user)
        db.commit()
        raise HTTPException(status_code=500, detail="Ошибка отправки письма. Проверьте настройки Gmail.")

    return {"message": "Пользователь создан. Проверьте почту для подтверждения."}

@router.post("/verify")
def verify_email(data: VerifyCodeRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    if user.is_verified:
        return {"message": "Email уже подтвержден"}
    if user.verification_code != data.code:
        raise HTTPException(status_code=400, detail="Неверный код")
    
    user.is_verified = True
    user.verification_code = None
    db.commit()
    return {"message": "Email успешно подтвержден!"}

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Неверный email или пароль")
    
    if not user.is_verified:
        raise HTTPException(status_code=403, detail="Почта не подтверждена. Введите код из письма.")
        
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

@router.delete("/delete-account")
def delete_account(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    import PosgreSql
    TaskModel = getattr(PosgreSql, "Todo", None) or getattr(PosgreSql, "Task", None)
    
    if TaskModel:
        db.query(TaskModel).filter(TaskModel.owner_id == current_user.id).delete()
    
    db.delete(current_user)
    db.commit()
    return {"message": "Аккаунт успешно удален"}