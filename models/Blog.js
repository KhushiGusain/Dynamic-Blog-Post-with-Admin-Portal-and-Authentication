import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    slug: {type: String, required: true, unique: true},
    title: {type: String, required: true},
    subtitle: {type: String},
    content: {type: String, required: true},
    hero_image: {type: String, required: true},
    inline_images: {type: [String], default: []},
    read_time: {type: Number}
}, {
    timestamps: true,
});

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);