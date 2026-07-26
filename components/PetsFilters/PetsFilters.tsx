'use client'

import SearchInput from "../Searsh/SearchInput";
import css from "./PetsFilters.module.css";
import {PetsApi} from "@/lib/api/clientApi"
import { useState, useEffect } from "react";

export default function PetsFilters() {

  const [categories, setCategories] = useState<string[]>([]);
  const [gender, setGender] = useState<string[]>([])
  const [type, setType] = useState<string[]>([])

  useEffect(() => {
    async function loadFilters () {
      try {
        const [categories, species, sex] = await Promise.all([
          PetsApi.getCategories(),
          PetsApi.getSpecies(),
          PetsApi.getSex(),
        ])
        setCategories(categories),
        setGender(gender),
        setType(species)
      } catch (error) {
        console.error(error)
      }
    }
    loadFilters()
  }, []);

  return (
    <section className={css.filters}>
      <SearchInput basePath="/find-pet" />

      <div className={css.row}>
          <select className={css.select}>
            <option value="">Category</option>
            {categories.map(category => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>

        <select>
          <option value="">By gender</option>
          {gender.map(gender => (
               <option 
                key={gender}
                value={gender}>
                </option>    
          ))}
        </select>
        <div className={css.select}>Location</div>
      </div>
    </section>
            );
}