import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  shortDescription: { type: String, required: true },
  category: [{ type: String }],
  tags: [{ type: String }],
  publishedDate: { type: Date, default: Date.now },
  updatedDate: { type: Date },
  imageUrl: { type: String },
  reactions: {
    like: { type: Number, default: 0 },
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

export const Post = mongoose.model("Post", postSchema);
