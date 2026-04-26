'use client'

import {useState, useEffect} from 'react'
import Image from 'next/image'
import css from './splash.module.css'
import CircleProgress from './components/CircleProgress'

export default function Splash() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return prev + 10
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
                /> 
                </picture>
        <div className={css.overlay}>
    <h1 className={`${css.logo} ${progress === 0 ? css.visible : css.hidden}`}>
        PetLove
    </h1>
    <div className={`${css.circle} ${progress > 0 ? css.visible : css.hidden}`}>
    <CircleProgress progress={progress} />
</div>
    </div>
</div>
    )
}

