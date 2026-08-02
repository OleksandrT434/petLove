'use client'

import SearchInput from "../Searsh/SearchInput";
import css from "./PetsFilters.module.css";
import {PetsApi} from "@/lib/api/clientApi"
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import LocationSearch from "../LocationAutocomplete/LocationAutocomplete";


export default function PetsFilters() {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
        setGender(sex),
        setType(species)
      } catch (error) {
        console.error(error)
      }
    }
    loadFilters()
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value){
      params.set(key, value);
    } else{
      params.delete(key)
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`)
    }

  return (
    <section className={css.filters}>
      <SearchInput basePath="/find-pet" />

      <div className={css.row}>
          <select
              className={css.select}
              onChange={(e) =>
               handleFilterChange("category", e.target.value)}>
               <option value="">Category</option>
               {categories.map((category) => (
              <option
                  key={category}
                  value={category}>
                  {category}
              </option>
             ))}
           </select>

        <select className={css.select}
           onChange={(e) =>
            handleFilterChange("sex", e.target.value)
                }>
          <option value="">By gender</option>
          {gender.map(gender => (
               <option 
                key={gender}
                value={gender}>
                  {gender}
                </option>    
          ))}
        </select>
        <select className={css.select}
                onChange={(e) =>
                  handleFilterChange("species", e.target.value)}>
                   <option value="">By type</option>
           {type.map(species => (
               <option 
                key={species}
                value={species}>
                  {species}
                </option>    
          ))}
        </select>
        <LocationSearch />
       </div>
    </section>
  );
}