import React from 'react'

export default function CastHint({ cast }) {
    return (
        <span className="badge bg-success mb-1 text-wrap hint-badge" >
            <div className='d-flex flex-column' >
                <div>
                    Actor: {cast.name}
                </div>
                <div className='word-wrap'>
                    Character: {cast.character}
                </div>
            </div>
        </span>
    )
}
