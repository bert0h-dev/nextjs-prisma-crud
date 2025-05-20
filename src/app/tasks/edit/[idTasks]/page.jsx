import NewPage from '@/app/new/page';

export default async function EditTaskPage({ params }) {
  // params ya es una promesa, así que hay que esperarla
  const { idTasks } = await params;
  return <NewPage idTasks={idTasks} />;
}
