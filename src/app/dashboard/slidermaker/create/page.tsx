'use client'

import { useState, useEffect } from 'react'
import { storage, database } from '../../../../../firebase'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection } from 'firebase/firestore'
import { slide } from '../interfaces/slide';

export default function CreateSlider() {

    const [sliderTitle, setSliderTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | undefined>();
    const [sliderImages, setSliderImages] = useState<slide[]>([])
    const [slideInPreview, setSlideInPreview] = useState<slide | null>()
    const [errorMessage, setErrorMessage] = useState(false);
    const [elements, setElements] = useState<any>([]);
    const [h1Open, setH1Open] = useState(false)
    const [formData, setFormData] = useState<{
        fontSize: string;
        color: string;
        content: string;
        position?: {
            top?: number;
            left?: number;
            bottom?: number;
            right?: number;
        };
    }>({
        fontSize: '',
        color: '#000000',
        content: '',
        position: {} // You can initialize it with an empty object or omit it altogether
    });

    const [positonButtons, setPositionButtons] = useState<string | null>(null)

    const buttons = ["Top Left", "Top Right", "Bottom Right", "Bottom Left", "Center"]
    const router = useRouter()

    const handleRemoveSlide = (slideRef: any, id: any) => {
        let deleteRef = ref(storage, slideRef);

        const deletePromise = deleteObject(deleteRef).then(() => {
            console.log("done")
            const editedImgs = sliderImages.filter((item: slide) => item.id != id);
            console.log(editedImgs)
            setSliderImages(editedImgs)
            if (sliderImages.length > 0) {
                setSlideInPreview(sliderImages[0])
            }
            else {

                let newImage = { id: (Math.floor(Math.random() * (1999999 - 1000000 + 1)) + 1000000).toString(), image: 'test', ref: `slides/$tes`, duration: '2000', alt: "test", elements: [] }
                setSlideInPreview(newImage);

            }

        }).catch((error) => {
            console.error(error)
        });

        toast.promise(deletePromise, {
            pending: "Please Wait..",
            success: "Your Slide has been deleted",
            error: "Error while deleteing"

        }, { autoClose: 2000 });


    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files?.[0];

        setSelectedImage(file);
        if (file) {
            const imageRef = ref(storage, `slides/${file.name}`)
            const uploadPromise = uploadBytes(imageRef, file).then(() => {
                getDownloadURL(imageRef).then((url) => {
                    let newImage = {
                        id: (Math.floor(Math.random() * 6) + 1).toString(), image: url, ref: `slides/${file.name}`, duration: '2000', alt: "test", elements: ["<h1></h1>"]
                    }

                    console.log(selectedImage)
                    setSliderImages((prevSlides: any) => [...prevSlides, newImage])
                    setSlideInPreview(newImage);
                })
            }).catch((err) => { console.log(err) })

            toast.promise(uploadPromise, {
                pending: "Please Wait..",
                success: "Your Slide has been uploaded",
                error: "Error while uploading your promise"
            }, { autoClose: 2000, });
        }

    };


    const getCurrentDate = () => {
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        return `${year}/${month}/${day}`;
    }

    const handleSlideShowSubmit = () => {

        var today = getCurrentDate();

        if (!sliderTitle) {
            setErrorMessage(true);
        }

        else {
            const slideshowsCol = collection(database, "slideshows");

            const slideShowData = { id: sliderTitle + "-" + (Math.floor(Math.random() * (1999 - 1000 + 1)) + 1000000).toString(), title: sliderTitle, slides: sliderImages, date: today }


            const uploadPromise = addDoc(slideshowsCol, slideShowData)
                .then((res) => {
                    console.log(res)
                })

                .catch((err) => { console.log(err) })

            toast.promise(uploadPromise, {
                pending: "Please Wait..",
                success: "Your Slide has been uploaded",
                error: "Error while uploading your promise"
            }, { autoClose: 2000, });

            router.push("/dashboard/slidermaker")
        }


    }

    const handleOnChangeDuration = (newDuration: any) => {

        setSlideInPreview({ ...slideInPreview!, duration: newDuration });

    }

    const handleOnChangeAlt = (newAlt: any) => {

        setSlideInPreview({ ...slideInPreview!, alt: newAlt });


    }

   

    const handleOnClickDuration = (id: string | undefined, duration: any) => {

        const updatedSlides = sliderImages.map((slide) =>
            slide.id === id ? { ...slide, duration: duration } : slide
        );

        setSliderImages(updatedSlides);
        toast.success("Duration has been changed!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000
        });
    }

    const handleOnClickAlt = (id: string | undefined, alt: any) => {

        const updatedSlides = sliderImages.map((slide) =>
            slide.id === id ? { ...slide, alt: alt } : slide
        );

        setSliderImages(updatedSlides);
        toast.success("Alt has been changed!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000
        });

    }

    const generateElement = () => {
        let h1;
        switch (positonButtons) {
            case "Top Left":

                h1 = `<h1 style='color: ${formData.color}; position: absolute; top: 10px; left: 40px; font-size: ${formData.fontSize}px'>${formData.content}</h1>`;
                break;

            case "Top Right":


                h1 = `<h1 style='color: ${formData.color}; position: absolute; top: 10px; right: 40px; font-size: ${formData.fontSize}px'>${formData.content}</h1>`;
                break;
            case "Bottom Right":

                h1 = `<h1 style='color: ${formData.color}; position: absolute; bottom: 10px; right: 40px; font-size: ${formData.fontSize}px'>${formData.content}</h1>`;
                break;
            case "Bottom Left":

                h1 = `<h1 style='color: ${formData.color}; position: absolute; bottom: 10px; left: 40px; font-size: ${formData.fontSize}px'>${formData.content}</h1>`;
                break;
            case "Center":

                h1 = `<h1 style='color: ${formData.color}; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: ${formData.fontSize}px'>${formData.content}</h1>`;
                break;

            default:
                console.log("no");
                break;

        }

        return h1;
    }



    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
        const h1 =generateElement();
        setElements([...elements, h1]);

        let updatedSlide = { ...slideInPreview!, elements: elements }

        setSlideInPreview(updatedSlide);
        setSliderImages((prevSliderImages) =>
            prevSliderImages.map((slide) =>
                slide.id === slideInPreview?.id ? { ...slide, elements: elements } : slide
            )
        );


        setH1Open(false)

    };



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

    };

    return (

        <div className="flex flex-col w-full h-fit pt-8" >
            <ToastContainer />
            <h1 className="text-white text-2xl font-bold">Create a New Slider</h1>
            <form className='w-1/2 mt-10'>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium  text-white">
                        Slider Title
                    </label>
                    <input
                        type="text"
                        id="email"
                        className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 "
                        placeholder="Slider Title"
                        required
                        value={sliderTitle}
                        onChange={(e) => setSliderTitle(e.target.value)}

                    />
                    {errorMessage ?
                        (
                            <div className="p-4 mt-2 text-sm  rounded-lg bg-gray-800 text-red-400 font-medium" role="alert">
                                Title Cant be empty
                            </div>
                        )
                        : (<></>)}
                    <label htmlFor="email" className="block mb-2 text-sm font-medium  text-white mt-2">
                        Upload your Images
                    </label>

                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-64 border-2  border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-900 border-gray-600 hover:border-gray-500"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                    className="w-8 h-8 mb-4  text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p className="mb-2 text-sm text-gray-400">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs  text-gray-400">
                                    SVG, PNG, JPG or GIF
                                </p>
                            </div>
                            <input
                                id="dropzone-file"
                                accept="image/png, image/gif, image/jpeg"
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                multiple
                            />
                        </label>
                    </div>
                </div>
            </form >

            {sliderImages.length != 0 ? (
                <>
                    <div className='flex w-[98%] justify-between mb-5'>
                        <h2 className='text-white mb-3 text-xl'>Slideshow  Previewer</h2>
                        <button
                            type="button"
                            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none  focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            onClick={() => handleSlideShowSubmit()}
                        >
                            Save Slideshow
                        </button>

                    </div>
                    <div className='relative mb-4'>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={() => setH1Open(!h1Open)}
                        >
                            Add H1
                        </button>

                        {h1Open && (
                            <div className="absolute bottom-10 left-10 bg-white p-4 shadow-md rounded-md">
                                <form onSubmit={handleSubmit} className='relative'>
                                    <span onClick={() => setH1Open(!h1Open)} className='absolute top-[1px] right-1 cursor-pointer'>X</span>
                                    <div className="mb-4">
                                        <label htmlFor="content" className="block text-gray-600 text-sm font-medium">
                                            Content:
                                        </label>
                                        <input
                                            id="content"
                                            name="content"
                                            className="border border-gray-300 rounded px-3 py-2 w-full"
                                            placeholder="Enter content"
                                            value={formData.content}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="fontSize" className="block text-gray-600 text-sm font-medium">
                                            Font Size:
                                        </label>
                                        <input
                                            type="text"
                                            id="fontSize"
                                            name="fontSize"
                                            className="border border-gray-300 rounded px-3 py-2 w-full"
                                            placeholder="Enter font size"
                                            value={formData.fontSize}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="color" className="block text-gray-600 text-sm font-medium">
                                            Color:
                                        </label>
                                        <input
                                            type="color"
                                            id="color"
                                            name="color"
                                            className="border border-gray-300 rounded px-3 py-2 w-full"
                                            value={formData.color}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-600 text-sm font-medium">Position:</label>
                                        <div className="flex space-x-2">
                                            {buttons.map((but) => (
                                                but === positonButtons ? (
                                                    <button
                                                        type="button"
                                                        key={but}
                                                        className="bg-blue-600 text-white px-2 py-1 rounded"
                                                        onClick={() => setPositionButtons(but)}
                                                    >
                                                        {but}
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        key={but}
                                                        className="bg-gray-300 text-gray-600 px-2 py-1 rounded"

                                                        onClick={() => setPositionButtons(but)}
                                                    >
                                                        {but}
                                                    </button>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                    <ul className="flex items-center justify-center space-x-2 h-10 py-4 relative w-[97%]">
                        {sliderImages.map((slide, index: any) => (
                            <li key={index}>
                                <button
                                    className={`${slideInPreview?.id === slide.id || sliderImages.length === 1
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-300 text-gray-800'
                                        } bg-blue-500 text-white px-3 py-1 rounded-full focus:outline-none`}
                                    onClick={() => setSlideInPreview(sliderImages[index])}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <button
                            type="button"
                            className=" absolute right-0 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-xs px-5 py-2.5 text-center mb-3"
                            onClick={() => handleRemoveSlide(slideInPreview?.ref, slideInPreview?.id)}
                        >
                            Remove Slide
                        </button>
                        <div className=" absolute left-0 mb-3 mt-3">
                            <button
                                type="button"
                                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-800  shadow-lg shadow-blue-800/80  rounded-lg text-[9px] font-bold px-1 py-2.5 text-center mr-2 mb-2 w-24 "
                                onClick={() => handleOnClickDuration(slideInPreview?.id, slideInPreview?.duration)}
                            >
                                Change Duration
                            </button>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-lg p-1.5 focus:ring-blue-500 focus:border-blue-500 text-xs w-20 h-7"
                                placeholder="Enter text..."
                                value={slideInPreview?.duration}
                                onChange={(e) => handleOnChangeDuration(e.target.value)}
                            />
                            <button
                                type="button"
                                className="ml-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-800 shadow-lg shadow-blue-800/80  rounded-lg text-[9px] font-bold px-1 py-2.5 text-center mr-2 mb-2 w-24 "
                                onClick={() => handleOnClickAlt(slideInPreview?.id, slideInPreview?.alt)}
                            >
                                Change Alt text
                            </button>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-lg p-1.5 focus:ring-blue-500 focus:border-blue-500 text-xs w-20 h-7"
                                placeholder="Enter text..."
                                value={slideInPreview?.alt}
                                onChange={(e) => handleOnChangeAlt(e.target.value)}
                            />

                        </div>
                    </ul>

                    <div className='w-[97%] h-[400px] bg-gray-800 flex justify-center'>
                        <div
                            style={{ backgroundImage: `url(${slideInPreview?.image})` }}
                            className='relative w-full h-full rounded-2xl bg-center bg-cover duration-1000 transition-all'
                        >
                            {slideInPreview?.elements.map((elem, i) => (

                                <div key={i} className="content" dangerouslySetInnerHTML={{ __html: elem }}></div>
                            ))}

                        </div>
                    </div>
                </>
            ) : (<></>)
            }
            < div className='h-[300px] w-20' ></div >
        </div >
    )


}
