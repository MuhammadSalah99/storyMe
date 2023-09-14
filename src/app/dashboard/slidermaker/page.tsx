'use client'
import { useEffect, useState } from 'react'
import Link from "next/link"
import { ToastContainer } from 'react-toastify';
import {
    getDocs,
    collection,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { slideshows } from './interfaces/slideshow';
import { database } from '../../../../firebase';

export default function SliderMakerMain() {


    const slidersPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [slideShows, setSlideShows] = useState<slideshows[]>([])

    const indexOfLastSlider = currentPage * slidersPerPage;
    const indexOfFirstSlider = indexOfLastSlider - slidersPerPage;

    const totalPages = Math.ceil(slideShows!.length / slidersPerPage);

    const handlePageChange = (newPage: any) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        getSlideShows();
    }, []);



    const getSlideShows = () => {
        const slideShows = collection(database, "slideshows");
        getDocs(slideShows)
            .then((res) => {
                console.log(res.docs);
                const slidshowsss: any = res.docs.map((doc) => ({
                    data: doc.data(),
                    id: doc.id,
                }));
                console.log(slidshowsss)
                setSlideShows(slidshowsss);
            })
            .catch((err) => console.log(err.message));
    };


    const currentSliders = slideShows!.slice(indexOfFirstSlider, indexOfLastSlider);

    const deleteSlider = async (id: any) => {
        const slideshowRef = doc(database, "slideshows", id);
        await deleteDoc(slideshowRef);
        getSlideShows()
    }
    return (
        <div className="flex flex-col w-full h-screen px-12 pt-4">
            <ToastContainer />
            <div>
                <h1 className="text-2xl text-white">Slideshow Maker</h1>
                <p className="text-white">Your place to manage your Sliders and publish them</p>
                <Link href="slidermaker/create" className="w-[170px] block text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-3">Make a Slider</Link>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs  uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Number Of Slides
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date Published
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentSliders.map((slider, i) => (
                            i % 2 === 0 ? (
                                <tr className=" border-b border-gray-700 bg-gray-900" key={i}>

                                    <td className="px-6 py-4">{slider.data.id}</td>
                                    <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                                        {slider.data.title}
                                    </th>
                                    <td className="px-6 py-4 pl-20">{slider.data.slides.length}</td>
                                    <td className="px-6 py-4">{slider.data.date}</td>
                                    <td className="px-6 py-4">
                                        <Link href="slidemaker/edit" className="mr-4 font-medium  text-blue-500 hover:underline">
                                            Edit
                                        </Link>
                                        <a href="#" onClick={() => deleteSlider(slider.id)} className="font-medium text-blue-500 hover:underline">
                                            Delete
                                        </a>
                                    </td>
                                </tr>
                            ) : (
                                <tr className="border-b bg-gray-800 border-gray-700" key={i}>
                                    <td className="px-6 py-4">{slider.data.id}</td>
                                    <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                                        {slider.data.title}
                                    </th>
                                    <td className="px-6 py-4 pl-20">{slider.data.slides.length}</td>
                                    <td className="px-6 py-4">{slider.data.date}</td>
                                    <td className="px-6 py-4">
                                        <Link href="slidemaker/edit" className=" mr-4 font-medium  text-blue-500 hover:underline">
                                            Edit
                                        </Link>
                                        <a href="#" onClick={() => deleteSlider(slider.id)} className="font-medium text-blue-500 hover:underline">
                                            Delete
                                        </a>

                                    </td>

                                </tr>
                            )
                        ))}

                    </tbody>
                </table>
                <ul className="flex items-center justify-center space-x-2 h-10 py-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index}>
                            <button
                                className={`${currentPage === index + 1
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-300 text-gray-700'
                                    } px-3 py-1 rounded-full focus:outline-none`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div >
    )
}
