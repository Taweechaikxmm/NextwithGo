const url = 'http://localhost:8085/projects'; // อนาคตสามารถใช้จาก .env

// กำหนด Type สำหรับ Project
export interface Project {
    ID?: string | number; // id อาจไม่มีถ้าเป็น user ใหม่
    Name: string;
    Description: string;
}

// GET Projects
export const getAllProjects = async (): Promise<Project[]> => {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch projects");
        return await res.json();
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
};

// CREATE Project
export const createProject = async (project: Project): Promise<Project | null> => {
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project),
        });
        if (!res.ok) throw new Error("Failed to create project");
        return await res.json();
    } catch (error) {
        console.error("Error creating project:", error);
        return null;
    }
};

// UPDATE Project
export const updateProject = async (id: string | number, project: Project): Promise<Project | null> => {
    try {
        const res = await fetch(`${url}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project),
        });
        if (!res.ok) throw new Error("Failed to update project");
        return await res.json();
    } catch (error) {
        console.error("Error updating project:", error);
        return null;
    }
};

// DELETE Project
export const deleteProject = async (id: string | number): Promise<{ message: string } | null> => {
    try {
        const res = await fetch(`${url}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete project");
        return await res.json();
    } catch (error) {
        console.error("Error deleting project:", error);
        return null;
    }
};
