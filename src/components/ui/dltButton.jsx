import React from 'react'
import button from '../../assets/dltButton.png'

const dltButton = ({handler}) => {
  return (
    <button onClick={handler}>
      <img src={button} alt='Delete' />
    </button>
  )
}

export default dltButton