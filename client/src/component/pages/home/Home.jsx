import React from 'react';
import "./Home.scss";
import Navbar from '../../narbar/Navbar';
import Featured from '../../featured/Featured';
import List from '../../list/List';
import { useState,useEffect } from 'react';
import axios from "axios";
function Home({type}) {

  const [lists, setLists] = useState([]);
  const [genre,setGenre] = useState(null);
  useEffect(() => {
    //fetch data from API
    const getRandomLists = async () => {
      try{
        //go to our API and make a request -- use libereay npm i axios
        //first go to the package.json, add "proxy":"http://localhost:8800/api/"
        // add condition use -- `xx${}` // ?type -- type query
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre :""}`,
          {
            headers: {
              token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmJjNmFkNWIyNzJiYmViNWVlZGNiZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MjYzOTg5OCwiZXhwIjoxNjg1MjMxODk4fQ.akA6KkM9kSD79WSSxYaNO4fVLSVwqq83XNtYTv4R1CY"
            }
          }
          );
          
        setLists(res.data)

      }catch(err){
        console.log(err)
      }
    }
    getRandomLists()

  },[type,genre]);//[type,genre] is the input
  return (
    <div className='home'>  
        
        <Navbar/>
        <Featured type={type}/>
        {lists.map((list)=> (
          <List list={list}/>
        ))}
        
    </div>
  )
}

export default Home