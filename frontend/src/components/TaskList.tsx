import type { Task } from "../types/task";

interface TasklistProps {
  title: string;
  tasks: Task[];
  onComplete: (taskId: number) => void;
}

export default function TaskList({ title, tasks, onComplete }: TasklistProps) {
  return (
    <div className=" p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      {tasks.length === 0 && <p className="text-gray-500">No tasks</p>}
      <ul className="space-y-2">
        {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between border border-gray-300 rounded p-2">
            <div>
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-gray-300">{task.description}</p>
            </div>
            {task.is_completed ? (
                <button
                onClick={() => onComplete(task.id)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                >
                Completed
                </button>
            ) : (
                <button
                onClick={() => onComplete(task.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                Pending
                </button>
            )}
            </li>
        ))}
      </ul>
    </div>
  );
}
