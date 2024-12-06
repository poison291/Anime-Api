import express from "express";
import mongoose from "mongoose";
import Anime from "../Schema/animeSchema.js";

const router = express.Router();

//Viewing Anime Data
router.get("/", async (req, res) => {
  try {
    const anime = await Anime.find();
    res.json(anime);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching anime data" });
  }
});

//Viewing Particular Data
router.get("/:animeId", async (req, res) => {
  try {
    const { animeId } = req.params;
    const anime = await Anime.findOne({ animeId });
    res.json(anime);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching anime data" });
  }
});

//Posting anime Data
router.post("/post", async (req, res) => {
  const lastAnime = await Anime.findOne().sort({ animeId: -1 });
  const newAnimeId = lastAnime ? lastAnime.animeId + 1 : 1;

  const { title, episodes, rating } = req.body;
  try {
    const newAnime = new Anime({
      animeId: newAnimeId,
      title,
      episodes,
      rating,
    });
    const saveAnime = await newAnime.save();
    res.json(saveAnime);
    console.log(`Anime Data Saved succesfully`);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error Posting anime data" });
  }
});

//Posting Large Data At once
router.post("/mass-post", async (req, res) => {
  try {
    const animeData = req.body;

    if (!Array.isArray(animeData)) {
      return res.json("Data must be in an array");
    } else {
      const lastAnime = await Anime.findOne().sort({ animeId: -1 });
      let newAnimeId = lastAnime ? lastAnime.animeId + 1 : 1;

      const new_anime = animeData.map(anime => ({
        animeId: newAnimeId++,
        title: anime.title,
        episodes: anime.episodes,
        rating: anime.rating,
      }))

      const saveData = await Anime.insertMany(new_anime)
      res.json(saveData)
      console.log('Bulk Data save succesfully');
      
    }
  } catch (error) {
    console.error(error.message);
    res.json("Failed to post mass data");
  }
});

export default router;
