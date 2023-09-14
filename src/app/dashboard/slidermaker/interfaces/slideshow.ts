import { slide } from "./slide"

export interface slideshow {
    id: string,
    title: string,
    slides: slide[]
    date: string
}

export interface slideshows {
    id: string,
    data: slideshow
} 
