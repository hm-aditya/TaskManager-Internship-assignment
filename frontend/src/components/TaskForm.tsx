import { useState } from "react";

interface TaskFormProps {
  onAdd: (title: string, description: string) => void;
}
export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, description);
    setTitle("");
    setDescription("");
  }
  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-md shadow mb-6">
      <h2>Add Task</h2>
      <input
        className="w-full border rounded p-2 mb-3"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border rounded p-2 mb-3"
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full p-2 rounded"
      >
        Add Task
      </button>
    </form>
  );
}
