import React, { useEffect, useState } from 'react'

export default function ListItem({ item, i, index, setIndex, input, setSearchQuery, setSelectedName, setSelectedMovieId, setChangeInputValue, setShowOptions }) {
    const [color, setColor] = useState("#FFFFFF");

    useEffect(()=>{
        if(i === index){
            setColor("#AAAAAA");
            setSelectedName(item.name);  
            setSelectedMovieId(item.id);          
        }else{
            setColor("#FFFFFF");
        }
    },[index, color]);
    return (
        <li className="list-group-item" style={{backgroundColor: color}} id={`item${i}`}
            onPointerMove={(e)=>{                
                setChangeInputValue(false);
                setIndex(i);       
                setSelectedName(item.name);
                setSelectedMovieId(item.id);       
                setColor("#AAAAAA");
            }}             
            onMouseLeave={()=>{
                setColor("#FFFFFF");                
            }}
            onMouseDown={()=>{
                input.current.value = item.name;
                setSearchQuery(item.name); 
                setTimeout(()=>{
                    input.current.focus();
                    setShowOptions(false);
                },100)
            }}>            
            { item.name }
        </li>
    )
}
