import React from 'react'
import button from '../../assets/printer.png'

const printButton = ({ handler }) => {
  return (
    <button onClick={handler}>
      <img className='w-8' src={button} alt='Print' />
    </button>
  )
}

export default printButton