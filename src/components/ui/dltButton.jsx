import React from 'react'
import button from '../../assets/dltButton.png'

const dltButton = ({handler, className}) => {
  return (
    <button className={className} onClick={handler}>
      <img src={button} alt='Delete' />
    </button>
  )
}

export default dltButton