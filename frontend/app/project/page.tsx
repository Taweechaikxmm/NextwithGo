"use client"; //ใช้เพื่อจะใช้ useState , useEffect จริงๆ สามารถแยกออกไปเป็น component ย่อยๆ ก็ได้

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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-2">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Project Management</h1>

      {/* ฟอร์มสร้างโปรเจกต์ */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          className="border p-3 flex-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter new project name..."
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
        />
        <input
          type="text"
          className="border p-3 flex-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter new description..."
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          onClick={handleCreate}
        >
          Add Project
        </button>
      </div>

      {/* ฟอร์มแก้ไขโปรเจกต์ */}
      {editingProject && (
        <div className="flex gap-2 mb-6 bg-yellow-100 p-4 rounded-lg shadow-md">
          <input
            type="text"
            className="border p-3 flex-1 rounded-md"
            value={editingProject.Name}
            onChange={(e) => setEditingProject({ ...editingProject, Name: e.target.value })}
          />
          <input
            type="text"
            className="border p-3 flex-1 rounded-md"
            value={editingProject.Description}
            onChange={(e) => setEditingProject({ ...editingProject, Description: e.target.value })}
          />
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition"
            onClick={() => setEditingProject(null)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* รายการโปรเจกต์ */}
      <ul className="space-y-4">
        {projects.map((project, index) => (
          <li key={index} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{project.Name}</h3>
              <p className="text-gray-600">{project.Description}</p>
            </div>
            <div className="flex space-x-4">
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                onClick={() => setEditingProject(project)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                onClick={() => project.ID !== undefined && handleDelete(Number(project.ID))}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectPage;
