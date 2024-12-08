import React from 'react'
import '../../index.css'

function button({text}) {
  return (
    <button className='bg-purple-700 rounded-full shadow-lg text-white items-center justify-center p-3'>
        <p className='text-white mx-2'>{text}</p>
    </button>
  )
}

export default button