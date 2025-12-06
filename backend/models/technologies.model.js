import { Schema, model } from "mongoose";

const technologySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
});

export default model("Technology", technologySchema);