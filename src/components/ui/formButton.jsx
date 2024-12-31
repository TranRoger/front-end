import React from 'react'
import button from '../../assets/form.png'

const formButton = ({handler}) => {
  return (
    <button onClick={handler}>
      <img src={button} alt='Edit' />
    </button>
  )
}

export default formButton;