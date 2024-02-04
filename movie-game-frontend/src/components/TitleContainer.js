import { Info } from '@mui/icons-material'
import React from 'react'


export default function TitleContainer({setShowRules}) {
  return (
    <div className='d-flex justify-content-center w-75 align-items-center' style={{position:"absolute", top:"10px"}}>
      <div className="d-flex justify-content-center h1 flex-fill text-center mt-1 align-items-center" style={{ color: "#009933"}}>
        <img src="favicon.ico" style={{width:"36px"}} className='me-2'/> REELDLE
      </div>
      <div className='' style={{cursor:"pointer"}} onClick={()=>{setShowRules(true)}}>
        <Info />
      </div>
    </div>
  )
}
