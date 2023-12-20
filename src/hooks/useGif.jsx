import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const apiKey = process.env.REACT_APP_GIPHY_API_KEY;

function useGif(searchTag){
    const [gif, setGif] = useState('');
    const [loading, setLoading] = useState(true);

    const tagMemeUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${searchTag}`;
    const randomMemeUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`;
    
    async function fetchData(){
        setLoading(true);
        const url = searchTag ? (tagMemeUrl) : (randomMemeUrl);
        const output = await axios.get(url);
        const imageSource = output.data.data.images.downsized_large.url;
        // console.log(imageSource);
        setGif(imageSource);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return ({gif, loading, fetchData});
}

export default useGif;