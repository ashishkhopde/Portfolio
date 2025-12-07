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