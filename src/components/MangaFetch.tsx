import axios from "axios"
import * as cheerio from "cheerio"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

export default function MangaFetch(){

    const [mangaData,setMangaData] = useState<string>("");
    let dataArray: any[] = [];


    const state = useLocation();
    let stateData = state.state;
    //console.log(stateData);

    useEffect( () => {
        const fetchManga = async () => {
            let newStateData = stateData.title.toLowerCase();
            let chapter = newStateData.replace(/[' ']/g,'-')
            //console.log(chapter)
            const resMangaData = await axios.get(`http://localhost:3000/proxy/manga_list/${chapter}`,{
                headers: {
                    "Access-Control-Allow-Origin" : "*",
                }
            })
            setMangaData(resMangaData.data);
        }

        fetchManga();
    },[])

    //console.log(mangaData);

    
    if(mangaData){
        const $ = cheerio.load(mangaData)
        const selectedElements = $('.chapter-content-inner');

        // Loop through the selected elements and do whatever you want
        selectedElements.each((i, el) => {
            const url = $(el).find('p').text();
            dataArray = url.split(",");
        });
    }

    //console.log(dataArray);


    return (
      <div className="container">
        <h6>{stateData.title}</h6>
        {dataArray.map((el) => {
            return (
                <div><img src ={el} width="100%" /></div>
            )
        })}
      </div> 
    )
}