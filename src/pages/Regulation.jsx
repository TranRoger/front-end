import React, { useState } from 'react'
import General from './Regulation/General'
import Medicine from './Regulation/Medicine'
import Disease from './Regulation/Disease'

const Regulation = () => {
    const [page, setPage] = useState('general')

    return (
        <div className='flex flex-col flex-1 max-h-full overflow-auto'>
            <div className='grid grid-cols-3 h-16 w-full divide-x-2 divide-black border border-black'>
                <button id='general' className='button xs:text-[10px]' onClick={(e) => setPage(e.target.id)} >Quy định chung</button>
                <button id='medicine' className='button xs:text-[10px]' onClick={(e) => setPage(e.target.id)} >Thuốc</button>
                <button id='disease' className='button xs:text-[10px]'onClick={(e) => setPage(e.target.id)} >Bệnh</button>
            </div>

            {page === 'general' && <General />}
            {page === 'medicine' && <Medicine />}
            {page === 'disease' && <Disease />}
        </div>
    )
}

export default Regulation