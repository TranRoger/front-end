import React from 'react'
import button from '../../assets/printer.png'

const printButton = ({ handler, className }) => {
  return (
    <button onClick={handler} className={className}>
      <img className='w-8' src={button} alt='Print' />
    </button>
  )
}

export default printButton