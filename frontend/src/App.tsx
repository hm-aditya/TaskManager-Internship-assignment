import { useEffect,useState } from "react";
import { createTask,fetchTasks, completeTaskApi } from "./api/tasks"
import { TaskForm } from "./components/TaskForm"
import type { Task } from "./types/task"
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadTasks()
  })
  async function loadTasks() {
    try {
      const tasks = await fetchTasks()
      setTasks(tasks)
    } catch (error) {
      setError("Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }
  const HandleAddTask = async(title: string, description: string) => {
    try {
     const newTask = await createTask(title, description)
     setTasks(((prev) => [...prev, newTask]))
    } catch (error) {
      alert("Failed to add task")
    }
  }

  const HandleCompleteTask =async (taskId: number) => {
    try {
      const updatedTask = await completeTaskApi(taskId)
      setTasks((prev) => prev.map((task) => task.id === taskId ? updatedTask : task))
    } catch (error) {
      alert("Failed to complete task")
    }
  }

  const pendingTasks = tasks.filter((task) => !task.is_completed);
  const completedTasks = tasks.filter((task) => task.is_completed);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl md:mx-auto mx-[4vw] py-6">
      <div className="max-w-4xl mx-auto border border-green-200 ">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Task Manager
        </h1>
        <TaskForm onAdd={HandleAddTask} />
        <TaskList title="Pending Tasks" tasks={pendingTasks} onComplete={HandleCompleteTask} />
        <TaskList title="Completed Tasks" tasks={completedTasks} onComplete={HandleCompleteTask} />
      </div>
    </div>
  )
}

export default App
