import express from 'express'
import mongoose from 'mongoose'
import Anime from '../Schema/animeSchema.js'


const router = express.Router()

//Viewing Anime Data 
router.get('/',async (req, res) => {
try {
    const anime = await Anime.find()
    res.json(anime)
} catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error fetching anime data' });
}
})


//Posting anime Data
router.post('/post', async(req, res) => {
    const {title, episodes, rating} = req.body
    try {
        const newAnime = new Anime({
            title,
            episodes,
            rating
        })
       const saveAnime =  await newAnime.save()
       res.json(saveAnime)
       console.log(`Anime Data Saved succesfully`);
       
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error Posting anime data' });   
    }
})



export default router

