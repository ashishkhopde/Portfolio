import freelancingModel from "../models/freelancing.model.js";

export const getFreelancingInfo = async (req, res) => {
    try {
        const freelancingInfo = await freelancingModel.find().sort({ createdAt: -1 });
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

export const editFreelancingInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedInfo = await freelancingModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedInfo) {
            return res.status(404).json({ message: "Freelancing info not found" });
        }   
        res.status(200).json(updatedInfo);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const deleteFreelancingInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedInfo = await freelancingModel.findByIdAndDelete(id);
        if (!deletedInfo) {
            return res.status(404).json({ message: "Freelancing info not found" });
        }
        res.status(200).json({ message: "Freelancing info deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};