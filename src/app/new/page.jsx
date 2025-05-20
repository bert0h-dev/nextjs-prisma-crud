'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function NewPage({ idTasks }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!idTasks) return;
    fetch(`/api/tasks/${Number(idTasks)}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.task.title ?? '');
        setDescription(data.task.description ?? '');
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, [idTasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (idTasks) {
      const response = await fetch(`/api/tasks/${Number(idTasks)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await response.json();
    } else {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await response.json();
    }

    router.refresh();
    router.push('/');
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        className="bg-slate-800 p-10 lg:w-1/4 md:w-1/2"
        onSubmit={handleSubmit}
      >
        <label htmlFor="title" className="font-bold text-sm">
          Título
        </label>
        <input
          type="text"
          id="title"
          className="border border-gray-400 p-2 mb-4 w-full"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description" className="font-bold text-sm">
          Descripción de la tarea
        </label>
        <textarea
          rows="3"
          id="description"
          className="border border-gray-400 p-2 mb-4 w-full"
          placeholder="Describe tu tarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            type="submit"
          >
            {idTasks ? 'Actualizar' : 'Crear'}
          </button>
          {idTasks && (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              type="button"
              onClick={async () => {
                const respDelete = await fetch(
                  `/api/tasks/${Number(idTasks)}`,
                  {
                    method: 'DELETE',
                  }
                );
                const data = await respDelete.json();
                router.refresh();
                router.push('/');
              }}
            >
              Eliminar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default NewPage;
