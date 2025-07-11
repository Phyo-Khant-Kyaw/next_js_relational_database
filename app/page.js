'use client';

import TreeNode from "@/components/TreeNode";
import React, { useState } from "react";

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

export default function Home() {
  const [treeData, setTreeData] = useState(initialTree);
  return (
    <div className="p-4">
      <TreeNode node={treeData} onChange={setTreeData} />
    </div>
  );
}
