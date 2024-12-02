import express from 'express'
import mongoose from 'mongoose'

const router = express.Router()

const animeSchema = new mongoose.Schema({
    name: String,
    genre: String,
    episodes: Number,
})
const Anime = mongoose.model('Anime', animeSchema)

// Viewing Anime Data 
router.get('/', async (req, res) => {
    try {
        const animeList = await Anime.find()
        res.json(animeList)
    } catch (error) {
        console.log(error.message);
        
    }
})

// Adding Anime data
router.post('/',async (req, res) => {
    const {name, genre, episodes} = req.body

    const newAnime = new Anime({
        name,
        genre,
        episodes,
})
    try {
        await newAnime.save()
        res.json(newAnime)
        console.log(`Anime Added Succesfully`)
    } catch (error) {
        console.log(error.message);
    }
})
// Updating ANime Data 


export default router