import React from 'react'
import { Link } from 'react-router-dom'
import img from '../assets/404.avif'

const ErrorPage = () => {
  return (
    <div className='flex flex-1 flex-col items-center place-content-center px-4 space-y-3'>
      <div className="text-black font-bold text-3xl">Trang không tìm thấy :(</div>
      <img src={img} alt="404" className='w-2/6 rounded-lg' />
      <div className="text-black text-lg">Chúng tôi rất tiếc về sự bất tiện này, sự cố này sẽ được khắc phục sớm nhất có thể.</div>
      <Link to='/' className="text-blue-500 hover:underline">Quay lại trang chủ</Link>
    </div>
  )
}

export default ErrorPage