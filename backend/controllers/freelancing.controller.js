import freelancingModel from "../models/freelancing.model.js";

export const getFreelancingInfo = async (req, res) => {
    try {
        const freelancingInfo = await freelancingModel.find();
        res.status(200).json(freelancingInfo);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const postFreelancingInfo = async (req, res) => {
    try {
        const newFreelancingInfo = new freelancingModel(req.body);
        const savedInfo = await newFreelancingInfo.save();
        res.status(201).json(savedInfo);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};