import freelancingModel from "../models/freelancing.model.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";

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
        const { name, description, source_code_link, live_link } = req.body;
        const localFilePath = req.file ? req.file.path : null;

        if (!name || !description || !source_code_link || !live_link || !localFilePath) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const image = await uploadOnCloudinary(localFilePath);

        const newFreelancingInfo = new freelancingModel({
            name,
            description,
            image: image.secure_url,
            source_code_link,
            live_link,
        });

        const savedInfo = await newFreelancingInfo.save();
        res.status(201).json(savedInfo);

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const editFreelancingInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, source_code_link, live_link } = req.body;
        const localFilePath = req.file ? req.file.path : null;
        let image;

        if (!localFilePath) {
            const existingInfo = await freelancingModel.findById(id);
            image = existingInfo.image;
        } else {
            image = await uploadOnCloudinary(localFilePath);
        }

        const updatedInfo = await freelancingModel.findByIdAndUpdate(id,
            {
                name,
                description,
                image: image.secure_url,
                source_code_link,
                live_link,
            }, { new: true });
            
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