import React, { useEffect, useState } from 'react'
import axiosInstance from '../helperFunctions/axiosHelper';

export default function LostMessageContainer() {
  const [correctTitle, setCorrectTitle] = useState("");

  useEffect(()=>{    
      axiosInstance.get("/correctTitle").then((res) => {
        setCorrectTitle(res.data);
      });    
  },[]);
  return (     
    <div className='bg-success text-center h1 rounded text-white' id="lost">
        The correct movie is: <br/>
        <i>{correctTitle}</i>
    </div>
  )
}
