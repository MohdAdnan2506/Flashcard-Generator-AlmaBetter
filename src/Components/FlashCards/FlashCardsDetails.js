// Import necessary dependencies/modules 
import React, { useState, useEffect } from 'react';
import { IoIosArrowForward, IoMdArrowRoundBack } from 'react-icons/io';
import { TfiBackRight } from 'react-icons/tfi';
import { BsCloudDownload, BsPrinter } from 'react-icons/bs';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import ShareModal from './ShareModal';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import default_img from "./Images/default_img.jpg";


const FlashCardsDetails = () => {

  // using useState for adding active class
  const [active, setActive] = useState(0);
  //  it's a function to reassign value to active 
  const handleClick = (event) => {
    setActive(event);
  }

  const { id } = useParams();

  // accessing data from reducer
  const { cards } = useSelector((state) => state.flashcardReducers);

  // finding card selected by the user
  const carddata = cards.find((cards) => cards.id === id);



  // useState hook for setting default image, description and uploaded image by user. 
  const [TermImg, setTermImg] = useState(default_img);
  // use useState hook to set cards image of term_uploadimage
  const [TermDescription, setTermDescription] = useState("");

  useEffect(() => {
    setTermDescription(carddata.term[0].Enter_Definition)
    // rendering image uploaded by user, default image will be shown in case no imahe is uploaded by user..
    setTermImg(carddata.term[0].term_uploadimage ? (carddata.term[0].term_uploadimage) : (default_img))
  }, [carddata])

  // Setting image and definition on click on next and previous button

  const setCard = (NewIndex) => {
    setTermDescription(carddata.term[NewIndex].Enter_Definition);
    setTermImg(carddata.term[NewIndex].term_uploadimage ? (carddata.term[NewIndex].term_uploadimage) : (default_img))
  }
  //Next Button
  const nextCard = () => {
    const isLastCard = active === carddata.term.length - 1;
    const NewIndex = isLastCard ? 0 : active + 1;
    setActive(NewIndex);
    setCard(NewIndex);
  }
  // Previous BUtton
  const prevCard = () => {
    const isFirstSlide = active === 0;
    const NewIndex = isFirstSlide ? carddata.term.length - 1 : active - 1;
    setActive(NewIndex);
    setCard(NewIndex);
  }


  function displayTermDetails(item, index) {
    setTermImg(item.term_uploadimage ? (item.term_uploadimage)
      : (default_img));
    setTermDescription(item.Enter_Definition);
    handleClick(index);
  }
  // useNavigate for navigation
  const navigate = useNavigate();
  // useState for share modal which will be visible when clicked on SHARE CARD
  const [visible, setVisible] = useState(false);
  const closeModal = () => { setVisible(false) }

  return (
    <>
      <div className="pt-3 mx-1 my-2 rounded-lg dark:text-white dark:bg-gray-900">
        <span className='flex'>
          <IoMdArrowRoundBack onClick={() => navigate(-1)} className='text-2xl m-1 cursor-pointer hover:text-red-600 ' />
          <span className='font-bold text-xl px-3 dark:text-orange-400'>
            {/* Group Name */}
            {carddata.Create_Group}
          </span>
        </span>
        <div className="pl-11 my-2 pr-4">
          {/* Description  */}
          {carddata.description}
        </div>
        <div className="flex flex-wrap">
          <div className="bg-white dark:bg-gray-800 overflow-auto w-52 drop-shadow-md rounded-lg py-1 h-[340px] my-3 mx-2 px-2">
            <h1 className="font-bold m-2 dark:text-orange-400">Flashcards</h1>
            <hr />
            {/* Displaying Terms */}
            {carddata.term.map((item, index) => {
              return (
                <div key={index}
                  onClick={() => displayTermDetails(item, index)}
                  className="p-3 font-medium cursor-pointer ">
                  <div className={active === index ? "activeTerm" : undefined} >
                    <IoIosArrowForward className=' icon hidden mr-1' />
                    {item.Enter_Term}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Displaying term Image and Description */}
          <div className="w-[625px] mx-1" id='forPrint'>
            <div className=" flex flex-wrap py-11 px-5 p-3 drop-shadow-md my-3 bg-white dark:bg-gray-800 rounded-lg ">
              <div className=" pr-2 m-1 h-[280px] flex justify-center items-center w-[200px] sm:w-[280px] md:w-[320px] lg:w-[320px] xl:w-[220px]  overflow-hidden">
                <img src={TermImg} alt="" className='rounded-lg max-h-[286px] max-w-[290px] cursor-pointer' />
              </div>

              <div className=" p-3 w-[240px] sm:w-[320px] md:w-[320px] lg:w-[320px] xl:w-[340px] mx-2 italic ">
                {TermDescription}
              </div>
            </div>
            {/* Button to Navigate between cards */}
            <div className="flex justify-center items-center">
              <MdNavigateBefore onClick={prevCard} className='text-5xl cursor-pointer dark:text-white dark:hover:text-blue-400 hover:text-blue-400  ' />
              <span className='ml-5'>{active + 1}/</span>
              <span className='mr-5'>{carddata.term.length}</span>
              <MdNavigateNext onClick={nextCard} className='text-5xl cursor-pointer dark:text-white dark:hover:text-blue-400 hover:text-blue-400 ' />
            </div>
          </div>

          {/* button for  print, download, share */}
          <div className=" w-[200px] my-3 mr-3 rounded-lg h-48">
            <div onClick={() => { window.print() }} className="bg-white dark:bg-gray-800 flex cursor-pointer my-4 mx-1 drop-shadow-md rounded-lg w-[200px] p-2 h-10"><BsPrinter className='text-2xl mx-5' />Print Card</div>
            <div onClick={() => { window.print() }} className="bg-white dark:bg-gray-800 flex cursor-pointer my-4 mx-1 drop-shadow-md rounded-lg w-[200px] p-2 h-10"><BsCloudDownload className='text-2xl mx-5' />Download Card</div>
            <div onClick={() => setVisible(true)} className="bg-white dark:bg-gray-800 flex cursor-pointer mb-4 mx-1 drop-shadow-md  rounded-lg w-[200px] p-2 h-10"><TfiBackRight className='text-2xl mx-5 ' />Share Card</div>
          </div>
        </div>
      </div>

      <ShareModal onClose={closeModal} visible={visible} />

    </>
  )
}

export default FlashCardsDetails
