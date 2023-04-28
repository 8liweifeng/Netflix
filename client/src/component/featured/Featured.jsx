import React from 'react';
import "./Featured.scss";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState,useEffect } from 'react';
import axios from 'axios';
function Featured({type}) {
  const [content, setContent] = useState({});
 
  useEffect(() => {
    const getRamdomContent = async ()=> {
      try{
        const res = await axios.get(`/movies/random?type=${type}`,{
          headers: {
            token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmJjNmFkNWIyNzJiYmViNWVlZGNiZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MjYzOTg5OCwiZXhwIjoxNjg1MjMxODk4fQ.akA6KkM9kSD79WSSxYaNO4fVLSVwqq83XNtYTv4R1CY"
          }
        });
        setContent(res.data[0]);
      }catch(err){
        console.log(err);
      }
    };
    getRamdomContent();
  }, [type])

  return (
    <div className='featured'>
        {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
        <img 
          src={content.img}
          alt="" />
          
          <div className="info">
            <img src={content.imgTitle} alt="" />
            <span className="desc">
          {content.desc}
            </span>
            <div className="bottons">
                <button className='play'>
                    <PlayArrowIcon/>
                    <span>Play</span>
                </button>
                <button className="more">
                    <InfoOutlinedIcon/>
                    <span>Info</span>
                </button>
            </div>
          </div>
    </div>
  )
}

export default Featured