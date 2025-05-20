import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(request, { params }) {
  const { idTask } = await params;
  const task = await prisma.task.findUnique({
    where: {
      id: Number(idTask),
    },
  });

  if (!task) {
    return NextResponse.json(
      {
        message: 'Tarea no encontrada',
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    task,
  });
}

export async function PUT(request, { params }) {
  const { idTask } = await params;
  const data = await request.json();

  try {
    const taskUpdate = await prisma.task.update({
      where: {
        id: Number(idTask),
      },
      data: data,
    });

    return NextResponse.json({
      task: taskUpdate,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Tarea no encontrada',
      },
      { status: 404 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { idTask } = await params;
  try {
    const task = await prisma.task.delete({
      where: {
        id: Number(idTask),
      },
    });

    return NextResponse.json({
      message: 'Tarea eliminada',
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Tarea no encontrada',
      },
      { status: 404 }
    );
  }
}
