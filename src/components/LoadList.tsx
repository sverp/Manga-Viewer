import axios from "axios";
import * as cheerio from "cheerio";
import { useEffect, useState } from "react"
import { useLocation, Link } from "react-router-dom";


export default function LoadList(){

    const [chapterData,setChapterData] = useState<string>("");
    let dataArray: any[] = [];

    const state = useLocation();
    let stateData = state.state;


    useEffect(() => {
        const fetchChapter = async () => {
            try {
                let newStateData = stateData.title.toLowerCase()
                let replace = newStateData.replace(/[' ']/g,'-')
                //console.log(replace);
                const resChapterData = await axios.get( `http://localhost:3000/proxy/manga/${replace}`,{
                    headers : {
                        "Access-Control-Allow-Origin":"*",
                    }
                });
                setChapterData(resChapterData.data);
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchChapter();
    },[])

    
        //console.log(chapterData);
        if(chapterData){
            const $ = cheerio.load(chapterData);
            const selectedElements = $('.chapter-list > ul > li')   
            selectedElements.each((i,el) => {
                let title : string = $(el).find('div > h4 > a').attr('title') || '';
                let url : string = $(el).find('div > h4 > a').attr('href') || '';
                dataArray.push({title,url});
            })       
        }

      //console.log(dataArray)

        
    
    return (
        <div className="container">
            <h1>{stateData.title}.</h1>

            <div>
                {dataArray.map((el) => {
                    return (

                        <div>
                            <Link to='/manga' state={{ title : el.title }}>
                                <button className="outline">
                                    {el.title}
                                </button>
                            </Link>
                        </div>
                    )
                })}
            </div>
            
        </div>
    )

}