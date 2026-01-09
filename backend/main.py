from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import Task, TaskCreate
import tasks as task_service

app = FastAPI(title="Task Manager API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)


@app.post("/tasks", response_model=Task)
def create_task(task: TaskCreate):
    return task_service.add_task(task)


@app.get("/tasks", response_model=list[Task])
def fetch_tasks(status: str | None = None):
    return task_service.get_tasks(status)


@app.put("/tasks/{task_id}/complete", response_model=Task)
def mark_task_completed(task_id: int):
    task = task_service.complete_task(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task
