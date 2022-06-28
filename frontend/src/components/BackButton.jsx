import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowCircleLeft} from 'react-icons/fa'
const BackButton = ({url}) => {
  return (
    <Link to={url} className='btn btn-reverse btn-back'>
        <FaArrowCircleLeft/>Back
    </Link>
  )
}

export default BackButton