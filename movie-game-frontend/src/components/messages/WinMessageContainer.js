import React from 'react'

export default function WinMessageContainer({numberOfGuesses}) {
  return (
    <>
      <div className='bg-success text-center text-white h1 rounded text-white' id="success">
          You found the correct movie in {numberOfGuesses} tries!
      </div>
    </>
  )
}
