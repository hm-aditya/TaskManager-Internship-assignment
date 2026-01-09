from typing import List
from models import Task, TaskCreate

tasks: List[Task] = []
task_id_counter = 1


def add_task(task_data: TaskCreate) -> Task:
    global task_id_counter

    task = Task(
        id=task_id_counter,
        title=task_data.title,
        description=task_data.description,
        is_completed=False
    )

    tasks.append(task)
    task_id_counter += 1
    return task


def get_tasks(status: str | None = None) -> List[Task]:
    if status == "completed":
        return [task for task in tasks if task.is_completed]
    elif status == "pending":
        return [task for task in tasks if not task.is_completed]
    return tasks


def complete_task(task_id: int) -> Task | None:
    for task in tasks:
        if task.id == task_id:
            task.is_completed = True
            return task
    return None
