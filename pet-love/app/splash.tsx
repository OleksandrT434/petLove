'use client'

import {useState, useEffect} from 'react'
import Image from 'next/image'
import css from './splash.module.css'
import CircleProgress from '../components/CircleProgress'
import { IoHeart } from "react-icons/io5";


export default function Splash() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                let step = Math.round(Math.random() * 10 + 5);
                
                if (prev > 80) {
                 step = 100 - prev}
                 const nextStep = prev + step

                        if (nextStep >= 100) {
                        clearInterval(interval)
                        return 100
                     }
                return nextStep
            })
        }, 200)
        return () => clearInterval(interval)
    }
    , [])

    return (
        <div className={css.splashContainer}>
            <picture className={css.pictureWrapper}>
                <source media="(min-width: 1280px)" srcSet="/splash-desktop.jpg" />
                <source media="(min-width: 768px)"  srcSet="/splash-tablet.jpg" />
                <Image 
                   src="/splash-dog.jpg" 
                   alt="PetLove Logo" 
                   fill 
                   className={css.dogImage}
                   priority
                /> 
                </picture>
        <div className={css.overlay}>
    <h1 className={`${css.logo} ${progress === 0 ? css.visible : css.hidden}`}>
         <span>petl</span>
         <IoHeart className={css.heart} />
         <span>ve</span>
    </h1>
    <div className={`${css.circle} ${progress > 0 ? css.visible : css.hidden}`}>
    <CircleProgress progress={progress} />
</div>
    </div>
</div>
    )
}

