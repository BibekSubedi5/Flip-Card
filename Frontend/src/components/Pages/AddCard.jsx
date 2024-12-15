import React from 'react'
import Header from '../UI/Header'
import Sidebar from '../UI/Sidebar'

const AddCard = () => {
  return (
    <div className="flex flex-col min-h-screen">
    <Header /> 
    
    <div className="flex flex-1">
      <Sidebar /> 
      <div className=' p-10 w-full h-full'>
        
         <form className='flex flex-col text-black bg-white rounded-xl p-10 m-10 shadow-black shadow-lg'>
           <div className='  flex flex-row gap-10 xs:flex-wrap  p-2 '>
                 <div className='rounded shadow-lg shadow-black p-5 w-full bg-red-300 gap-5 flex flex-col '>
                  <div>
                    <h3 className='ml-4'>Genre</h3>
                    <input
                    type='text'
                    placeholder='Provide genre Here'
                    className='rounded p-3  border-blue-400 border-2 w-full'
                    />
                  </div>
                  <div >
                    <h3 className='ml-4'>First Fact</h3>
                    <input
                    type='text'
                    placeholder='First Fact'
                    className='rounded p-3 border-blue-400 border-2 w-full'
                    />
                  </div> <div>
                    <h3 className='ml-4'>Second Fact</h3>
                    <input
                    type='text'
                    placeholder='Second Fact'
                    className='rounded p-3  border-blue-400 border-2 w-full'
                    />
                  </div>
                  </div>
                 <div className=' w-full rounded shadow-black shadow-lg flex flex-col items-center p-4 gap-2'>
 
                 <div>
                  <h3>
                    FrontImage
                    </h3>
                    <div className='w-36 h-36 bg-blue-400 rounded p-3 items-center flex justify-center'> Upload Image Here</div>
                  </div>
                 <div>
                  <h3>BackImage</h3>
                  <div className='w-36 h-36 bg-blue-400 rounded p-3 items-center flex justify-center'> Upload Image Here</div>                              
                 </div>

                 </div>

           </div>
           <div className='flex flex-1 w-full  items-end p-4 mt-6'> 
            <button className='bg-blue-600 p-2 rounded-lg items-center  ml-auto'>Upload</button>
           </div>
         </form>
        </div> 
    </div>
  </div>
  )
}

export default AddCard