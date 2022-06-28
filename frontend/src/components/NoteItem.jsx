import React from 'react'
import { useSelector } from 'react-redux'

const NoteItem = ({note}) => {
  const {user}=useSelector((state)=>state.auth)
    return (
    <div className="note" style={{
        backgroundColor:'rgba(0,0,0,0.7)',
        color:'#fff',
    }}>
        <h4>Note from <span>{user.name}</span></h4>
        <p>{note.text}</p>
        <div className="note-date">
            {new Date(note.createdAt).toLocaleString('en-US')}
        </div>
    </div>


  )
}

export default NoteItem