import React, { useState } from "react";
import {v4 as uuid} from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [roomId,setRoomId]=useState();
  const [userName,setUserName]=useState();
  const navigate=useNavigate();
  

  const createRoomId=(e)=>{

    e.preventDefault();

    const id=uuid();

    setRoomId(id);

    toast.success('Created a new Room');

    console.log(id);


  }
  const joinRoom=()=>{
    if(!roomId ||   !userName)
    {
      toast.error('RoomId and UserName is Required');

      return;
    }

    // redirect

    navigate(`/editor/${roomId}`,{
      state:{
        userName
      }
    })
  }
  const handleInputEnter=(e)=>{

    // console.log('event',e.code);  for testing purpose


    if(e.code === 'Enter')
      {
        joinRoom();
      }



  }


  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img src="m.png" alt="codesync logo" className="logoImg"/>
        <h4 className="mainLabel">Paste Invitation Room Id</h4>
        <div className="inputGroup">
          <input type="text" className="inputBox" placeholder="ROOM ID" value={roomId} onChange={(e)=>setRoomId(e.target.value) } />
          <input type="text" className="inputBox" placeholder="USERNAME" value={userName} onChange={(e)=>setUserName(e.target.value)} onKeyUp={handleInputEnter} />
          <button className="btn joinBtn" onClick={joinRoom}>Join</button>
          <span className="createInfo">
            If you don't have an invitation Link then create &nbsp;
            <a onClick={createRoomId} href=" " className="createNewbtn">
              new Room
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>Build by <a href=" ">Mohit Kumawat</a></h4>
      </footer>
    </div>
  );
};

export default Home;
