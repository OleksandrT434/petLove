'use client'

import { IoHeart } from "react-icons/io5";
import css from "./page.module.css";
import { FaUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";



export default function Home() {
    return (
        <div className={css.container}>
            <div className={css.header}>
            <h1 className={css.title}>
               petl<IoHeart className={css.heart} />ve
            </h1>
            <FaUserCircle className={css.userIcon} />
           <button className={css.menuButton}>
               <RxHamburgerMenu className={css.menuIcon} />
           </button>
        </div>
        </div>
    )
}
