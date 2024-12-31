import React from 'react'
import button from '../../assets/invoice.png'

const invoiceButton = ({handler}) => {
  return (
    <button onClick={handler}>
      <img src={button} alt='Edit' />
    </button>
  )
};

export default invoiceButton;