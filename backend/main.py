from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from PosgreSql import engine, Base
from routers import todos, auth

Base.metadata.create_all(bind=engine)

app = FastAPI(title="My First API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Привет! FastAPI успешно запущен и работает"}

app.include_router(todos.router)
app.include_router(auth.router)