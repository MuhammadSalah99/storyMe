'use client'
import { useState, useEffect } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import { slide } from '../dashboard/slidermaker/interfaces/slide';

interface SlidesProps {
    slides: slide[]
}
const Slider: React.FC<SlidesProps> = ({ slides }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoSlideInterval, setAutoSlideInterval] = useState<number | null>(null);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
        resetAutoSlide();
    };

    const resetAutoSlide = () => {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
        const intervalId = setInterval(nextSlide, slides[currentIndex].duration);
        setAutoSlideInterval(intervalId);
    };

    useEffect(() => {
        resetAutoSlide();
        return () => {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
            }
        };
    }, [currentIndex]);


    return (
        <div className='max-w-[1400px] h-[600px] w-full m-auto py-16 px-4 relative group'>
            <div
                style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
                className='relative w-full h-full rounded-2xl bg-center bg-cover duration-1000 transition-all'
            >

            {slides[currentIndex].elements.map((elem) => (
               <div dangerouslySetInnerHTML={{__html: elem}}></div>
               ))}

            </div>
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
            <div className='flex top-4 justify-center py-2'>
                {slides.map((_, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className='text-2xl cursor-pointer'
                    >
                        <RxDotFilled />
                    </div>
                ))}
            </div>
        </div>

    )

}
export default Slider
