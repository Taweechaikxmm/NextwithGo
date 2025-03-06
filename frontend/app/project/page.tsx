"use client";

import { useState, useEffect } from "react";
import { getAllProjects, createProject, updateProject, deleteProject, Project } from "../lib/project/actions";

const ProjectPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // ดึงข้อมูล Projects
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const data = await getAllProjects();
    setProjects(data);
    console.log(data);
  };

  // สร้างโปรเจกต์ใหม่
  const handleCreate = async () => {
    if (!newProject) return;
    const created = await createProject({ Name: newProject, Description: newDescription });
    if (created) {
      setProjects([...projects, created]);
      setNewProject("");
      setNewDescription("");
    }
  };

  // อัปเดตโปรเจกต์
  const handleUpdate = async () => {
    if (!editingProject || editingProject.ID === undefined) return;
  
    const updated = await updateProject(String(editingProject.ID), { 
      Name: editingProject.Name || "", 
      Description: editingProject.Description || "" 
    });
  
    if (updated) {
      setProjects(projects.map(p => (p.ID === updated.ID ? updated : p)));
      setEditingProject(null);
    }
  };
  

  // ลบโปรเจกต์
  const handleDelete = async (id: number) => {
    await deleteProject(id);
    setProjects(projects.filter(p => p.ID !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Project Management</h1>

      {/* ฟอร์มสร้างโปรเจกต์ */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-1"
          placeholder="Enter new project name..."
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 flex-1"
          placeholder="Enter new description..."
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCreate}>
          Add Project
        </button>
      </div>

      {/* ฟอร์มแก้ไขโปรเจกต์ */}
      {editingProject && (
        <div className="flex gap-2 mb-4 bg-yellow-100 p-3 rounded">
          <input
            type="text"
            className="border p-2 flex-1"
            value={editingProject.Name}
            onChange={(e) => setEditingProject({ ...editingProject, Name: e.target.value })}
          />
          <input
            type="text"
            className="border p-2 flex-1"
            value={editingProject.Description}
            onChange={(e) => setEditingProject({ ...editingProject, Description: e.target.value })}
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleUpdate}>
            Update
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setEditingProject(null)}>
            Cancel
          </button>
        </div>
      )}

      {/* รายการโปรเจกต์ */}
      <ul className="space-y-2">
        {projects.map((project, index) => (
          <li key={index} className="bg-white p-3 rounded shadow flex justify-between items-center">
            <>
              <span>{project.Name}</span>
              <span>{project.Description}</span>
              <div>
                <button className="bg-yellow-500 text-white px-2 py-1 ml-2" onClick={() => setEditingProject(project)}>
                  Edit
                </button>
                <button className="bg-red-500 text-white px-2 py-1 ml-2" onClick={() => project.ID !== undefined && handleDelete(Number(project.ID))}>
                  Delete
                </button>
              </div>
            </>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectPage;
