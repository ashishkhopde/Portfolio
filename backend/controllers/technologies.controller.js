import technologiesModel from "../models/technologies.model.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";

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
    const { name } = req.body;
    const localFilePath = req.file?.path;

    if (!localFilePath) {
      return res.status(400).json({ message: "No icon file provided" });
    }

    const cloudResult = await uploadOnCloudinary(localFilePath);
    if (!cloudResult || !cloudResult.secure_url) {
      return res.status(500).json({ message: "Failed to upload to Cloudinary" });
    }

    const newTech = new technologiesModel({
      name,
      icon: cloudResult.secure_url,
    });

    const savedTech = await newTech.save();
    res.status(201).json(savedTech);
  } catch (error) {
    console.error("Error creating technology:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const editTechnology = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    let updateData = { name };

    if (req.file) {
      const localFilePath = req.file.path;
      const cloudResult = await uploadOnCloudinary(localFilePath);
      if (cloudResult?.secure_url) {
        updateData.icon = cloudResult.secure_url;
      }
    }

    const updatedTech = await technologiesModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedTech) {
      return res.status(404).json({ message: "Technology not found" });
    }

    res.status(200).json(updatedTech);
  } catch (error) {
    console.error("Error updating technology:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


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
