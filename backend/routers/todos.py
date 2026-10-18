from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from PosgreSql import Task, User, get_db
from schemas import TaskCreate, TaskResponse, TaskUpdate
from routers.auth import get_current_user 

from PosgreSql import get_db
router = APIRouter(
    prefix="/tasks",
    tags=["Задачи"]
)
@router.post("/", response_model=TaskResponse, status_code=201)
def create_task(task: TaskCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_task = Task(
        title=task.title,
        description=task.description,
        owner_id=current_user.id, 
        is_completed=task.is_completed
    )

    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    
    return db_task
@router.get("/", response_model=list[TaskResponse])
def get_tasks(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    tasks = db.query(Task).filter(Task.owner_id == current_user.id).offset(skip).limit(limit).all()
    return tasks

@router.get("/{task_id}", response_model=TaskResponse)
def get_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    task = db.query(Task).filter(Task.id == task_id, Task.owner_id == current_user.id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Задача не найдена")
    return task

@router.put("/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: int,
    task_update: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_task = db.query(Task).filter(Task.id == task_id, Task.owner_id == current_user.id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Задача не найдена")

    db_task.title = task_update.title
    db_task.description = task_update.description
    db_task.is_completed = task_update.is_completed

    db.commit()
    db.refresh(db_task)
    return db_task

@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_task = db.query(Task).filter(Task.id == task_id, Task.owner_id == current_user.id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Задача не найдена")

    db.delete(db_task)
    db.commit()
    return {"status": "deleted", "message": f"Задача {task_id} удалена"}

@router.patch("/{task_id}", response_model=TaskResponse)
def patch_task(
    task_id: int,
    task_update: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_task = db.query(Task).filter(Task.id == task_id, Task.owner_id == current_user.id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Задача не найдена")

    update_data = task_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_task, key, value)

    db.commit()
    db.refresh(db_task)
    return db_task