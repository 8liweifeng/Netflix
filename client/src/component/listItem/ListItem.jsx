import React from 'react';
import "./ListItem.scss";
import { useState, useEffect } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListItem({index,item}) {
//item is just a id, we should use the id to get the data

  const [isHovered,setIsHovered] =useState(false);
  const [movie,setMovie] =useState({});
  useEffect(() => { 
    const getMovie = async () => {
      try{
        const res = await axios.get("movies/find/"+item, {
          headers: {
            token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmJjNmFkNWIyNzJiYmViNWVlZGNiZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MjYzOTg5OCwiZXhwIjoxNjg1MjMxODk4fQ.akA6KkM9kSD79WSSxYaNO4fVLSVwqq83XNtYTv4R1CY"
          }
        });
        setMovie(res.data)
      }catch(err) {
        console.log(err);
      }

      
    };
    getMovie();

  }, [item])

  return (

    <Link to={{pathname:"/watch", movie:movie}}>
      <div 
    className='ListItem'
    style={{left:isHovered&& index*225-50 + index*2.5}}
    onMouseEnter={()=>setIsHovered(true)}
    onMouseLeave={()=>setIsHovered(false)}>
      <img 
      src={movie.img}
      alt="" />
    {isHovered &&(
      <>
      <video src={movie.trailer} autoPlay={true} loop/>
      <div className="itemInfo">
            <div className="icons">
              <PlayArrowIcon className="icon" />
              <AddIcon className="icon" />
              <ThumbUpAltOutlinedIcon className="icon" />
              <ThumbDownAltOutlinedIcon className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>{movie.duration}</span>
              <span className="limit">+{movie.limit}</span>
              <span>{movie.year}</span>
            </div>
            <div className="desc">
              {movie.desc}
            </div>
            <div className="genre">{movie.genre}</div>
          </div>
          </>
        )}
    </div>
    </Link>
    
  )
}

export default ListItem