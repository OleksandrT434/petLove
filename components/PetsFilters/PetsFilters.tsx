'use client'

import SearchInput from "../Searsh/SearchInput";
import css from "./PetsFilters.module.css";
import {PetsApi} from "@/lib/api/clientApi"
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import LocationSearch from "../LocationAutocomplete/LocationAutocomplete";
import CustomSelect from "../CustomSelect/CustomSelect";


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
  const handleSortChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (params.get(key ) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  }


  return (
    <section className={css.filters}>
      <div className={css.row}>
                
          <div className={css.searchWrapper}>
              <SearchInput basePath="/find-pet" />
           </div>
            <div className={css.filterItem}>
          <CustomSelect
                 options={categories}
                 value={searchParams.get("category") ?? ""}
                 placeholder="Category"
                 onChange={(value) =>
                  handleFilterChange("category", value)
                }
            /></div>
          <div className={css.filterItem}>
        <CustomSelect
           options={gender}
           value={searchParams.get("sex") ?? ""}
           placeholder="Gender"
           onChange={(value) =>
            handleFilterChange("sex", value)
           }
        /></div>
         <div className={css.filterItem}>
         <CustomSelect
           options={type}
           value={searchParams.get("species") ?? ""}
           placeholder="By type"
            onChange={(value) =>
              handleFilterChange("species", value)
               }
            />
            </div>
        <div className={css.locationWrapper}>
             <LocationSearch />
        </div>
      </div>
           <div className={css.sorting}>
             <button
               type="button"
               className={`${css.sortButton} ${
                 searchParams.get("byPopularity") === "true" ? css.active : ""
               }`}
               onClick={() => handleSortChange("byPopularity", "true")}
             >
               Popular
               {searchParams.get("byPopularity") === "true" && <span>✕</span>}
             </button>
           
             <button
               type="button"
               className={`${css.sortButton} ${
                 searchParams.get("byPopularity") === "false" ? css.active : ""
               }`}
               onClick={() => handleSortChange("byPopularity", "false")}
             >
               Unpopular
               {searchParams.get("byPopularity") === "false" && <span>✕</span>}
             </button>
           
             <button
               type="button"
               className={`${css.sortButton} ${
                 searchParams.get("byPrice") === "true" ? css.active : ""
               }`}
               onClick={() => handleSortChange("byPrice", "true")}
             >
               Cheap
               {searchParams.get("byPrice") === "true" && <span>✕</span>}
             </button>
           
             <button
               type="button"
               className={`${css.sortButton} ${
                 searchParams.get("byPrice") === "false" ? css.active : ""
               }`}
               onClick={() => handleSortChange("byPrice", "false")}
             >
               Expensive
               {searchParams.get("byPrice") === "false" && <span>✕</span>}
             </button>
           </div> 
    </section>
  );
}