'use client';
import { useRouter } from 'next/navigation';

function TaskCard({ task }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/tasks/edit/${task.id}`);
  };

  return (
    <div
      className="bg-slate-900 p-3 hover:bg-slate-800 hover:cursor-pointer"
      onClick={handleClick}
    >
      <h3 className="text-2xl font-semibold mb-2">{task.title}</h3>
      <p>{task.description}</p>
      <p className="text-sm text-gray-500 mt-2">
        Creado: {new Date(task.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
export default TaskCard;
