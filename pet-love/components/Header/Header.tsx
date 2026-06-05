"use client";

import { useState } from "react";

import BurgerMenu from "../BurgerMenu/burgerMenu";
import Navigation from "../Navigation/Navigation";


export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header> 
            <Navigation />
            <BurgerMenu />
        </header>
    )
}