"use client";

import Link from "next/link";
import Header from "@/components/Header/Header";
import css from "./page.module.css";



export default function AddPet() {

return(
    <section>
    <Header variant="default" />
      <img
        src="add-pet.png"
        className={css.imageContainer} >
        </img>
         <div className={css.titleContainer}>
           <h1 className={css.title}>Add my pet /<span className={css.partTitle}>Personal details</span></h1>
           <div className={css.infoFields}>
            <input
              type="text"
              className={css.infoInput}
              value="title"
              />

              <input
              type="text"
              className={css.infoInput}
              value="Pet’s Name"
              />
              <input
              type="date"
              className={css.infoInput}
              />
              

              
           </div>
         </div> 
         </section>
)
}
