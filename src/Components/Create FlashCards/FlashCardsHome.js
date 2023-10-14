import React from 'react'
import { Route, Routes, NavLink } from 'react-router-dom'
import Error from '../Error/Error'
import FlashCardsDetails from '../FlashCards/FlashCardsDetails'
import MyFlashCards from '../FlashCards/MyFlashCards'
import CreateFlashCards from './CreateFlashCards'

const FlashCardsHome = () => {
  return (
    <div className=" bg-pink-100 min-h-screen p-1 dark:bg-gray-800">
      <div className='m-auto  w-4/5'>
        <h1 className='font-bold my-5 text-lg dark:text-white '>Create Flashcard</h1>

        <div className='flex ' >
          <div className='m-2 flex items-center w-[140px]' >
            <NavLink to='/'>
              <button className="font-bold dark:text-white rounded-md dark:hover:text-red" >
                Create New Card
              </button>
            </NavLink>
          </div>

          <div className='m-2 flex  items-center w-[150px]' >

            <NavLink to='/myflashcard' >
              <button className="font-bold dark:text-white rounded-md " >
                My Flashcards
              </button>
            </NavLink>
          </div>
        </div>

        <hr className="border bg-black-700 mt-[-10px] border-gray-300" />
        {/* Routes  */}
        <Routes>
          <Route>
            <Route index path='/' element={<CreateFlashCards />} />
            <Route path='/myflashcard' element={<MyFlashCards />} />
            <Route path='/flashcardsdetails/:id' element={<FlashCardsDetails />} />
            <Route path='*' element={<Error />} />
          </Route>
        </Routes>


      </div>
    </div>
  )
}

export default FlashCardsHome
