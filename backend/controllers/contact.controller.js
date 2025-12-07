import contactModel from "../models/contact.model.js";

export const getContact = async (req, res) => {
    try {
        const contacts = await contactModel.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const postContact = async (req, res) => {
    try {
        const newContact = new contactModel(req.body);  
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};