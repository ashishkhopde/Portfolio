import projectModel from "../models/project.model.js"

export const getAllProjects = async (req, res) => {
    try {
        const projects = await projectModel.find().sort({ createdAt: -1 });
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

export const editProject = async (req, res) => {
    try {
        const updatedProject = await projectModel.findByIdAndUpdate({_id: req.params.id}, req.body, { new: true });
        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.json(updatedProject);
    }
    catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const deletedProject = await projectModel.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.json({ message: "Project deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ message: "Server Error" });
    }
};