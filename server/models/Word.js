import { Schema, model } from "mongoose";

let WordSchema = new Schema({
  title: String,
  createdAt: Date
});

export default model('Word', WordSchema);
