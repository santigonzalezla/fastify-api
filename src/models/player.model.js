import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [5, "Name must be at least 5 characters"],
        maxlength: [50, "Name must be at most 50 characters"],
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
        min: [18, "Age must be at least 18"],
        max: [40, "Age must be at most 40"],
    },
    team: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
}, { timestamps: true, versionKey: false });

export const Player = mongoose.model("Player", playerSchema);