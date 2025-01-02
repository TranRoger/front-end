import React from 'react'
import button from '../../assets/editButton.png'

const editButton = ({handler, className}) => {
  return (
    <button className={className} onClick={handler}>
      <img src={button} alt='Edit' />
    </button>
  )
}

export default editButton