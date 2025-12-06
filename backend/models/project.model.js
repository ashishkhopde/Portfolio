import { Schema, model } from "mongoose";

// name: "Virtual Helper",
//     description:
//       "Virtual Helper is a web-based personal assistant that executes everyday tasks through voice commands, enabling users to open websites, set reminders, and perform quick calculations with ease.",
//     tags: [
//       {
//         name: "react",
//         color: "blue-text-gradient",
//       },
//       {
//         name: "tailwind",
//         color: "pink-text-gradient",
//       },
//     ],
//     image: virtualHelper,
//     source_code_link: "https://github.com/ashishkhopde/Virtual-Helper",
//     live_link: 'https://virtualhelper-va.netlify.app/ '
//   }

const projectSchema = new Schema({
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
});

export default model("Project", projectSchema);