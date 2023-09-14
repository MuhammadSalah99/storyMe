'use client'

import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import Slider from './slider/Slider';
import {
    getDocs,
    collection,
} from "firebase/firestore";
import { database } from '../../firebase';
import { slideshows } from './dashboard/slidermaker/interfaces/slideshow';

export default function Home() {
    const [slideShows, setSlideShows] = useState<slideshows[]>([])
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




    return (
        slideShows.map((slideshow) => (

            <Slider key={slideshow.id} slides={slideshow.data.slides} />
        ))
    )
}
