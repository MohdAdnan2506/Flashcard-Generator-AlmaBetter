// Importing necessary dependencies
import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import card_logo from './Images/LOGO.png';
import { MdDelete } from 'react-icons/md';
import { deleteGroup, } from '../../Redux/Actions/Index';




// import useSelector and accessing data from reducer
const MyFlashCards = () => {
  const flashCard = useSelector((state) => state.flashcardReducers.cards);
  // useNavigate to navigate the page 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // when number of cards >=6 , then "show more" button will appear
  const [ShowCards, setShowCards] = useState(6);
  const ShowMore = () => {
    setShowCards(flashCard.length);
  }
  //  this function is using for (Show less) button. when we click on show less button this function will set the initial value of useState 6 
  const ShowLess = () => {
    setShowCards(6);
  }

  return (
    <>
      {flashCard.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-[80vh]'>
          <div className='text-red-600 m-2 font-bold' >
            No Flashcards Available
          </div>
          {/* Button to go to Home Page in case no flashcards available */}
          <Link to='/'>
            <button className='rounded-xl px-4 p-2 m-2 text-center text-white bg-gradient-to-r from-red-500 via-white-550 to-red-600 hover:from-pink-500 hover:to-yellow-500  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium  py-2.5 mr-2 mb-2 '>
              Create a Flashcard
            </button>
          </Link>
        </div>) : (null)
      }


      <div className='flex flex-wrap space-evenly sm:px-8 md:px-8 lg:px-8 xl:px-8 px-2 '>
        {
          flashCard.slice(0, ShowCards).map((elem) => {
            return (
              <div className=" m-2 flex dark:text-white hover:scale-105 overflow-hidden justify-center pt-12 drop-shadow-md" key={elem.id} >

                <img className="w-16 h-16 border-[1px] border-black absolute top-4  rounded-full shadow-lg" src={elem.uploadimage === null ? (card_logo) : (elem.uploadimage)} alt="Image_logo" />

                <div className="bg-white border dark:bg-gray-900 px-4 w-[250px] xl:w-[300px] sm:w-[300px] lg:w-[300px] md:w-[300px] h-64  pt-11 pb-2 rounded-lg dark:border-black ">
                  {/* Delete Button for card */}
                  <MdDelete onClick={() => dispatch(deleteGroup(elem.id))} className='text-3xl absolute top-14 right-2 text-red-600 cursor-pointer' />
                  <div className="flex flex-col items-center ">
                    {/* showing group and description */}
                    <h5 className="mb-2 text-xl font-medium ">{elem.Create_Group}</h5>
                    <span className="font-serif my-2 h-12 overflow-hidden text-center">{elem.description}</span>

                    {/* Number of cards created */}

                    <span className="font-bold my-2"> {Object.keys(elem.term).length} Card(s)</span>

                    <button onClick={() => navigate(`/flashcardsdetails/${elem.id}`)} className="inline-flex mt-1 items-center px-8 sm:px-12 md:px-12 lg:px-12 xl:px-12 py-2 text-center max-w-xs  dark:border-red-500  bg-white rounded-full hover:bg-red-100 font-bold  text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800  text-lg mr-2 mb-2">
                      View Cards
                    </button>
                  </div>
                </div>
              </div>
            )
          }
          )
        }



      </div>
      {/* if total cards  >=6 , it will show SEE ALL button, when all cards displayed, it will alsow show SHOW LESS button */}
      {flashCard.length > 6 ? (
        <div className="flex justify-end mr-10">
          {
            ShowCards === flashCard.length ?
              <button onClick={ShowLess} className="mb-24 font-bold  cursor-pointer w-24 mx-5 text-red-700">  See Less</button>
              : <button onClick={ShowMore} className="mb-24 font-bold  cursor-pointer w-24 mx-5 text-red-700">  See All</button>
          }
        </div>
      ) : (null)}
    </>
  )
}

export default MyFlashCards
