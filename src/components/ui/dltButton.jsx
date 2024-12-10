import React from 'react'
import button from '../../assets/dltButton.png'

const dltButton = ({handler}) => {
  return (
    <button onClick={handler}>
      <img src={button} />
    </button>
  )
}

export default dltButton