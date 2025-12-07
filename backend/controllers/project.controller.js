import projectModel from "../models/project.model.js"

export const getAllProjects = async (req, res) => {
    try {
        const projects = await projectModel.find();
        res.json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const addProject = async (req, res) => {
    try {
        const newProject = new projectModel(req.body);
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        console.error("Error adding project:", error);
        res.status(500).json({ message: "Server Error" });
    }
}