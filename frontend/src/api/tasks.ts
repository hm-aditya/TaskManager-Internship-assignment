import type { Task } from "../types/task";

const BASE_URL = "http://127.0.0.1:8000";

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${BASE_URL}/tasks`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function createTask(
  title: string,
  description: string
): Promise<Task> {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function completeTaskApi(id: number): Promise<Task> {
  const res = await fetch(`${BASE_URL}/tasks/${id}/complete`, {
    method: "PUT",
  });

  if (!res.ok) throw new Error("Failed to complete task");
  return res.json();
}
