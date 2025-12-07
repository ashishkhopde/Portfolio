import technologiesModel from "../models/technologies.model.js";

export const getTechnologies = async (req, res) => {
    try {
        const technologies = await technologiesModel.find();
        res.status(200).json(technologies);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const createTechnology = async (req, res) => {
    try {
        const newTechnology = new technologiesModel(req.body);
        const savedTechnology = await newTechnology.save();
        res.status(201).json(savedTechnology);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }           
};

export const editTechnology = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const updatedTechnology = await technologiesModel.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedTechnology) {
            return res.status(404).json({ message: "Technology not found" });
        }
        res.status(200).json(updatedTechnology);
    } catch (error) {
        console.error("Error updating technology:", error);
    }
}

export const deleteTechnology = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedTechnology = await technologiesModel.findByIdAndDelete(id);
        if (!deletedTechnology) {
            return res.status(404).json({ message: "Technology not found" });
        }
        res.status(200).json({ message: "Technology deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
}
