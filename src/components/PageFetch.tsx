import axios from "axios";
import { useEffect, useState } from "react";
import * as cheerio from "cheerio";
import { Link } from "react-router-dom";

export default function PageFetch(){


    const [data, setData] = useState<string>("");
    const [manga,setManga] = useState<string>("");
    let dataArray: any[] = [];

    

    useEffect(() => {
        const fetchData = async () => {
            try{
                let replace = manga.replace(/[' ']/g,'+');
                const resData = await axios.get(`http://localhost:3000/proxy/${replace}`,{
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                    }
                });
                setData(resData.data);
            }
            catch (error){
                console.error(error);
            }
        }

        fetchData();        
    },[manga])


    if (data) {
        const $ = cheerio.load(data);
        const selectedElements = $('.cate-manga > div > div > div.cover-manga')
        selectedElements.each((i,el) => {

            let title : string = $(el).find('a').attr('title') || '';
            let url : string = $(el).find('a').attr('href') || '';
            let img : string = $(el).find('img').attr('src') || '';
            dataArray.push({title,url,img})

        }) 
    }
    //console.log(dataArray)


    return(
    
        <div className="container">
            <section></section>
            <input 
                name="myIput"
                onChange={ e => setManga(e.target.value) }
                placeholder="enter manga"
            />
            
            <div className="gird">
                {dataArray.map((item) => {
                return(
                    <div>
                        {/* <img src={item.img}></img> */}
                        <Link to='/chapter' state={{title : item.title , url : item.url}}>
                            {item.title}
                        </Link>
                    </div>    
                )
                })}
            </div>
            

        </div>
    )
}