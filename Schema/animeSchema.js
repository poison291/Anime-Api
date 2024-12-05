import mongoose from "mongoose";

const animeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    episodes: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
    }
})

const Anime = mongoose.model("Anime", animeSchema)

export default Anime