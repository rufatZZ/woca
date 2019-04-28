import { Schema, model } from "mongoose";

let ListSchema = new Schema({
    name: String,
    createdAt: Date
});

export default model('List', ListSchema);
