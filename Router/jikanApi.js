import express from "express";

let animeData = []
const fetchData  = async () => {
    const URL = `https://api.jikan.moe/v4/anime/`
    try {
        const res = await fetch(URL)
        const data = await res.json()
        // console.log(data)
        animeData = data
    } catch (error) {
        console.log(error.message)
    }
}

const init = async () => {
    await fetchData();
    console.log(animeData); // Now it will be populated with the fetched data
};

init()