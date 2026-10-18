from pwdlib import PasswordHash
import jwt
from datetime import datetime, timedelta, timezone

password_hash = PasswordHash.recommended()

def get_password_hash(password: str) -> str:
    return password_hash.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return password_hash.verify(plain_password, hashed_password)

SECRET_KEY = "my-super-secret-key-for-horror-game"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30  

def create_access_token(data: dict):
    to_encode = data.copy()
    
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt