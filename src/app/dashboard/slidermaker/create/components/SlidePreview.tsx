'use client'

import { useState } from "react"
export default function SlidePreview() {

    return (
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
                                    <button
                                        type="button"
                                        className="bg-gray-300 text-gray-600 px-2 py-1 rounded"
                                        onClick={() => handlePosition({ top: 40, left: 10, bottom: 'auto', right: 'auto' })}
                                    >
                                        Top Left
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-gray-300 text-gray-600 px-2 py-1 rounded"
                                        onClick={() => handlePosition({ top: 40, right: 10, bottom: 'auto', left: 'auto' })}
                                    >
                                        Top Right
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-gray-300 text-gray-600 px-2 py-1 rounded"
                                        onClick={() => handlePosition({ top: 100, left: 0, right: 'auto', bottom: 'auto' })}
                                    >
                                        Bottom Left
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-gray-300 text-gray-600 px-2 py-1 rounded"
                                        onClick={() => handlePosition({ bottom: 0, right: 0, top: 'auto', left: 'auto' })}
                                    >
                                        Bottom Right
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-gray-300 text-gray-600 px-2 py-1 rounded"
                                        onClick={() => handlePosition({ top: 50, left: 50, bottom: 'auto', right: 'auto' })}
                                    >
                                        Center
                                    </button>
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
                    onClick={() => addH1Element(slideInPreview?.id)}
                    className='relative w-full h-full rounded-2xl bg-center bg-cover duration-1000 transition-all'
                >
                    {slideInPreview?.elements.map((elem, i) => (

                        <div key={i} className="content" dangerouslySetInnerHTML={{ __html: elem }}></div>
                    ))}

                </div>
            </div>
        </>

    )

}
