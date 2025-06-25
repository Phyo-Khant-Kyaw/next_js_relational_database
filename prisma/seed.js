import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initialTree = {
  id: 1,
  label: "All Permissions",
  checked: false,
  children: [
    {
      id: 2,
      label: "User Management",
      children: [
        { id: 3, label: "View Users", checked: false },
        { id: 4, label: "Edit Users", checked: false },
        { id: 5, label: "Create Users", checked: false },
        { id: 6, label: "List Users", checked: false },
        { id: 7, label: "Permission", checked: false },
      ],
    },
    {
      id: 8,
      label: "Member Management",
      children: [
        { id: 9, label: "View Member", checked: false },
        { id: 10, label: "Edit Member", checked: false },
        { id: 11, label: "Create Member", checked: false },
        { id: 12, label: "List Member", checked: false },
        { id: 13, label: "Approve", checked: false },
      ],
    },
    {
      id: 14,
      label: "Project Management",
      children: [
        { id: 15, label: "View Projects", checked: false },
        { id: 16, label: "Edit Projects", checked: false },
        { id: 17, label: "Create Projects", checked: false },
        { id: 18, label: "List Projects", checked: false },
      ],
    },
    {
      id: 19,
      label: "Issue Management",
      children: [
        { id: 20, label: "View Issues", checked: false },
        { id: 21, label: "Edit Issues", checked: false },
        { id: 22, label: "Create Issues", checked: false },
        { id: 23, label: "List Issues", checked: false },
        { id: 24, label: "Priority", checked: false },
      ],
    },
  ],
};

async function createPermissions(node , parentId = null) {
  const permission = await prisma.permission.create({
    data: {
      name: node.label,
      group: node.label.split(" ")[0] ?? "General",
      parentId,
    },
  });

  const children = node.children || [];
  for (const child of children) {
    await createPermissions(child, permission.id);
  }

  return permission;
}

async function main() {
  await createPermissions(initialTree);
  const allPermissions = await prisma.permission.findMany();
  const adminGroup = await prisma.userGroup.upsert({
    where: { name: "Admin Group" },
    update: {},
    create: {
      name: "Admin Group",
      description: "Has access to all permissions",
      createdBy: "Seeder",
      updatedBy: "Seeder",
    },
  });

  await prisma.groupPermission.createMany({
    data: allPermissions.map((perm) => ({
      userGroupId: adminGroup.id,
      permissionId: perm.id,
    })),
    skipDuplicates: true,
  });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
