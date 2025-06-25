import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createPermission(label, parentId = null) {
  return await prisma.permission.create({
    data: {
      label,
      parentId,
    },
  });
}

export async function getPermissions() {
  return await prisma.permission.findMany({
    where: { parentId: null },
    include: {
      children: true,
    },
  });
}

export async function getPermission(id) {
  return await prisma.permission.findUnique({
    where: { id },
    include: {
      children: true,
    },
  });
}

export async function updatePermission(id, data) {
  return await prisma.permission.update({
    where: { id },
    data,
  });
}

export async function deletePermission(id) {
  await prisma.permission.deleteMany({ where: { parentId: id } });
  return await prisma.permission.delete({
    where: { id },
  });
}
