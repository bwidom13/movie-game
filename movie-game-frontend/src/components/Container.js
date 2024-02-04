import React, { useEffect, useState } from 'react';
import { GuessContainer } from './GuessContainer';
import TitleContainer from './TitleContainer';
import RulesModal from './messages/RulesModal';
import axiosInstance from './helperFunctions/axiosHelper';


export default function Container() {

  const [data, setData] = useState([]);
  const [showRules, setShowRules] = useState(false);
  
  useEffect(()=>{
    axiosInstance.get("/movie-titles?like=").then((res)=>{
      setData(res.data);
    })
  },[showRules])
  
  return (
    <div className='d-flex w-100 justify-content-center' style={{ height: "100vh" }}>
      <TitleContainer setShowRules={setShowRules}/>
      <GuessContainer data = {data}/>
      {showRules && <RulesModal setShowRules={setShowRules}/>}
    </div>
  )
}
