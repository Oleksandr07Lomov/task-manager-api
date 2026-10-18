from pydantic import BaseModel, Field, EmailStr

class TaskCreate(BaseModel):
  
  title: str = Field(
      ...,
      min_length=3,
      max_length=50,
      description="Название задачи (от 3 до 50 символов)",
  )
  description: str | None = Field(
      default=None, max_length=200, description="Описание задачи (до 200 знаков)"
  )
  is_completed: bool = False

class TaskResponse(BaseModel):
    id: int
    title: str
    description: str | None = None
    is_completed: bool

    class Config:
        from_attributes = True

class TaskUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=3, max_length=50)
    description: str | None = Field(default=None, max_length=200)
    is_completed: bool | None = None

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True