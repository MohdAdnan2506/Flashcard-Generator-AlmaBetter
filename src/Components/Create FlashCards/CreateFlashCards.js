// Importing necessaryt modules,dependencies and icons
import React, { useRef } from 'react';
import { Form, Field, Formik, ErrorMessage, FieldArray } from 'formik';
import { MdUploadFile, MdDelete } from 'react-icons/md';
import { BsPlus } from 'react-icons/bs';
import { TiDeleteOutline } from 'react-icons/ti';
import { TbEdit } from 'react-icons/tb';
import { signUpSchema } from '../../schemas';
import { useDispatch } from 'react-redux'
import { createGroup } from '../../Redux/Actions/Index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const CreateFlashCards = () => {

  // Image validation    
  const IMG_FORMAT = ["image/jpeg", "image/jpg", "image/png"];

  // import useDispatch for dispatch actions
  const dispatch = useDispatch();


  const inputRef = useRef([]);
  inputRef.current = [];

  //  Function to focus on edit button when clicked
  const addRefs = (el) => {
    if (el && !inputRef.current.includes(el)) {
      inputRef.current.push(el);
    }
  }
  // Error message when image is unsupported or size is very large 
  const imgError = (val) => {
    toast.warn(val, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <div>
      {/* Toaster for Card Creation */}
      <ToastContainer />

      <Formik initialValues={{
        Create_Group: "",
        uploadimage: null,
        description: "",
        term: [{
          Enter_Term: "",
          Enter_Definition: "",
          term_uploadimage: '',
        }],
      }}

        validationSchema={signUpSchema}
        onSubmit={(values, { resetForm }) => {
          // reset form on creation of a flashcard, for new Card
          resetForm({ values: "" });

          // dispatch action ( createGroup )
          dispatch(createGroup(values));

          // Toaster notification on creation of FlashCard
          toast.success('Flashcard Created Successfully!', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }}>
        {({ values, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <div className='bg-white dark:bg-gray-900 p-6 my-4 drop-shadow-lg rounded-xl'>
              <div className="flex flex-wrap">
                <div className=" w-96 px-3">
                  {/* Input field for Group Name  */}
                  <label className=" tracking-wide text-gray-500 dark:text-white font-bold italic"
                    htmlFor="Create_Group" >
                    Create a Group*
                  </label>
                  <Field className="appearance-none block w-full my-2 bg-gray-200 text-black-700 border border-black-200 rounded py-2 px-4 leading-tight focus:border-gray-500"
                    id="Create_Group"
                    name='Create_Group'
                    type="text"
                    placeholder="Enter Group Name" />
                  {/* Error message when InValid Input.. i.e-> Characters less or more than accepted */}
                  <ErrorMessage
                    className='text-red-600'
                    component="span"
                    name='Create_Group' />
                </div>
                <div>
                  {/* Image upload button */}
                  {
                    values.uploadimage ? (<div className='flex '> <img className='h-16 mt-2' src={values.uploadimage} alt="" /> <TiDeleteOutline className='text-3xl text-red-600' onClick={() => setFieldValue("uploadimage", '')} /> </div>) :
                      (<label htmlFor='uploadimage'
                        className="w-44 h-[38px]  cursor-pointer px-3 mx-3 mt-8 py-1 bg-gray-200 border-gray-200 flex  items-center justify-center  rounded" >
                        <MdUploadFile className=" text-[2em] text-blue-700" />
                        <span
                          className='text-blue-700 italic font-bold p-2'>
                          Select Image
                        </span>
                      </label>)
                  }
                  <input
                    onChange={(event) => {
                      //  Image Validation
                      if (event.target.files[0]
                        && !IMG_FORMAT.includes(event.target.files[0].type)) {
                        imgError('unsupported file format')
                      }
                      else if (event.target.files[0].size > 1024 * 1024 * 10) {
                        imgError('image size is very large')
                      } else if (event.target.files[0].size <= 1024 * 1024 * 10) {
                        const file = event.target.files[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                          setFieldValue("uploadimage", reader.result);
                        }
                      }
                    }}
                    className='hidden' name='uploadimage' id='uploadimage' type="file" />
                </div>
                <div className="w-full my-2 px-3">
                  <label className=" tracking-wide  text-gray-500 dark:text-white font-bold italic "
                    htmlFor="description">
                    Add Description
                  </label>
                  {/* Input field for description */}
                  <Field
                    as="textarea"
                    id="description"
                    name='description'
                    rows="3"
                    className="block my-2 p-2.5 w-3/4 text-md text-gray-700 rounded border-gray-200  focus:border-gray-500 bg-gray-200  "
                    placeholder="Add Description for your Card.">
                  </Field>
                  <ErrorMessage
                    // Error message..
                    className='text-red-600'
                    component="span"
                    name='description' />
                </div>
              </div>
            </div>
            <FieldArray
              name="term"
              render={(arrayHelpers) => (
                <div className='bg-white dark:bg-gray-900 p-6 my-4 drop-shadow-lg rounded-xl'>
                  {
                    values.term.map((term, index) => (
                      <div key={index} className='my-5 flex flex-wrap' >
                        <div className="flex items-center justify-center h-7 w-7 my-1 rounded-full text-white bg-red-600 ">{index + 1}</div>
                        <div className=" w-[310px] px-3">
                          <label
                            className=" tracking-wide text-gray-500 dark:text-white italic font-bold"
                            htmlFor={`term.${index}.Enter_Term`}>
                            Enter Term*
                          </label>

                          <input
                            ref={addRefs}
                            className="appearance-none block w-full my-2 text-gray-700 bg-gray-200 border border-gray-200 rounded py-2 px-4 leading-tight focus:border-gray-500"
                            name={`term.${index}.Enter_Term`}
                            id={`term.${index}.Enter_Term`}
                            value={term.Enter_Term}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            placeholder="Enter Term Name" />
                          {/* Error message.. */}
                          <ErrorMessage
                            className='text-red-600'
                            component="span"
                            name={`term.${index}.Enter_Term`} />
                        </div>
                        <div className=" w-[410px] px-3">
                          <label className=" tracking-wide text-gray-500 dark:text-white font-bold italic "
                            htmlFor={`term.${index}.Enter_Definition`}>
                            Enter Definition*
                          </label>
                          {/* Input field for Adding Term Definition */}
                          <Field className="appearance-none block w-full my-2 bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:border-gray-500"
                            id={`term.${index}.Enter_Definition`}
                            name={`term.${index}.Enter_Definition`}
                            value={term.Enter_Definition}
                            type="text"
                            placeholder="Enter Term Definition" />

                          <ErrorMessage
                            className='text-red-600'
                            component="span"
                            name={`term.${index}.Enter_Definition`} />
                        </div>
                        <div className='flex'>
                          {/* Image Uploading Button with delete option */}
                          {
                            term.term_uploadimage ? ((<div className='flex  '> <img className='h-18 w-36 m-2 mt-0   max-w-[15rem]' src={term.term_uploadimage} alt="" /> <TiDeleteOutline className='text-2xl text-red-600' onClick={() => setFieldValue(`term.${index}.term_uploadimage`, '')} /> </div>)) :
                              (<label htmlFor={`term.${index}.term_uploadimage`} className="w-44 h-[38px] cursor-pointer px-3 mx-3 mt-8 py-1 bg-gray-200 border-gray-200 flex items-center justify-center rounded" >
                                <span className='text-blue-700 font-bold italic'>Select Image</span>
                              </label>)
                          }

                          <ErrorMessage
                            className='text-red-600'
                            component="span"
                            name={`term.${index}.term_uploadimage`} />

                          {/* Upload Image*/}
                          <input
                            onChange={(event) => {
                              //  Image Validation
                              if (event.target.files[0]
                                && !IMG_FORMAT.includes(event.target.files[0].type)) {
                                imgError('Unsupported File Format')
                              }
                              else if (event.target.files[0].size > 1024 * 1024 * 10) {
                                imgError('Image size exceeded')
                              } else if (event.target.files[0].size <= 1024 * 1024 * 10) {
                                const file = event.target.files[0];
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = () => {
                                  setFieldValue(`term.${index}.term_uploadimage`, reader.result);

                                }
                              }
                            }
                            }
                            className='hidden'
                            id={`term.${index}.term_uploadimage`}
                            name={`term.${index}.term_uploadimage`}
                            type="file" />
                          <div>
                            {/* Delete button to delete a term with a condition:-
                            You can"t delete the term if only 1 term is present */}
                            {
                              values.term.length <= 1 ? "" :
                                <MdDelete className='text-[1.8em] text-red-600 m-2 cursor-pointer hover:text-red-500' onClick={() => arrayHelpers.remove(index)} />
                            }
                            {/* Edit Term button */}
                            <TbEdit className='text-[1.8em] text-blue-700 m-2 cursor-pointer hover:text-blue-900'
                              onClick={() => { inputRef.current[index].focus() }} />
                          </div>
                        </div>
                      </div>
                    ))
                  }
                  {/*Button to Add more terms */}
                  <div onClick={() => arrayHelpers.insert(values.term.length + 1, {
                    Enter_Term: "",
                    Enter_Definition: "",
                    term_uploadimage: '',
                  })} className="my-5 cursor-pointer w-24 mx-5 text-blue-700">
                    <BsPlus className='inline-block' /> Add More</div>
                </div>
              )} />

            {/* Create Button */}
            <div className="h-28 flex  items-center justify-center">
              <button type='submit'
                className="bg-gradient-to-r from-red-500 via-white-550 to-red-600 rounded-xl hover:from-pink-500 hover:to-yellow-500 font-bold py-2 px-14 rounded text-white dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 text-center ">
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreateFlashCards