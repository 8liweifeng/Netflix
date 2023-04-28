import React from 'react';
import "./Watch.scss";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

function Watch() {

  const location = useLocation();
  console.log(location);
  const movie = location.movie;
  return (
    <div className='watch'>
      <Link to="/">
        <div className="back">
              <ArrowBackOutlinedIcon/>
              Home
          </div>
      </Link>
       
        <video
        className="video"
        autoPlay
        progress
        controls
        src={movie.video}
        // src="https://upload.wikimedia.org/wikipedia/commons/a/a7/How_to_make_video.webm"

      />
    </div>
  )
}

export default Watch