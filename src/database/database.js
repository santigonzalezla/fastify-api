import mongoose from "mongoose";

mongoose.set("strictQuery", false)

export const connectDB = async (uri) =>
{
    mongoose.connect(uri)
        .then( () => console.log("Connected to database..."))
        .catch( (error) => console.log("Error connecting to database: ", error));
}