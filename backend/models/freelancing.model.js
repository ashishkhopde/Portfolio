import { Schema, model } from "mongoose";

const freelancingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    source_code_link: {
        type: String,
        required: true
    },
    live_link: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default model("Freelancing", freelancingSchema);