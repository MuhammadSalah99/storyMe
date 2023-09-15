'use client'

export default function ElementManeger() {

    return (
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

    )
}

