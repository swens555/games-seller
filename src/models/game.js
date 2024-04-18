import mongoose from "mongoose";

const gameSchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true, min: 3 },
  releaseYear:{ type: Number,required: true},
  condition: { type: String, required: true },
  price: { type: Number,required: true},
  userId: { type: String, required: true },
  coverUrl: { type: String, required: true },
});

export default mongoose.model("Game", gameSchema);