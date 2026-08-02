"use client"
import { useState, useEffect } from "react";
import { PetsApi } from "@/lib/api/clientApi";
import { City } from "@/types/pets";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import css from "./LocationAutocomplete.module.css";
import { useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

export default function LocationSearch() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [cities, setCities] = useState<City[]>([]); 
    const [selectedCity, setSelectedCity] = useState<City | null>(null);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if(selectedCity) return;
        const loadCities = async () => {    
            if (debouncedSearch.length < 3) {
            setCities([]);
            setIsOpen(false);
            return;
            }
            try {
                const response = await PetsApi.searchCities(debouncedSearch);
                setCities(response);
                setIsOpen(true);
            }
            catch (error) {
                console.error("Error fetching cities:", error);
            }
        };
            loadCities();
           }, [debouncedSearch, selectedCity]);
     const handleCitySelect = (city: City) => {

        const params = new URLSearchParams(searchParams);

        setSelectedCity(city);
        setSearch("");
        setIsOpen(false);
        params.set("locationId", city._id);
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
        }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCity(null);
        setSearch(e.target.value);
        setIsOpen(true);};

       useEffect(() => {
            const timer = setTimeout(() => {
             setDebouncedSearch(search);
            }
            , 500);
            return () => clearTimeout(timer);
        }
         , [search]);
     
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
        , []);
    const handleClear = () => {
       setSearch("");
       setSelectedCity(null);
       setCities([]);
       setIsOpen(false);

       const params = new URLSearchParams(searchParams);

       params.delete("locationId");
       params.set("page", "1");
       router.push(`${pathname}?${params.toString()}`);
     };


    return (
        <section className={css.wrapper}
                 ref={wrapperRef}>
            <input
                type="text"
                value={selectedCity ? selectedCity.cityEn : search}
                onChange={handleChange}
                placeholder="Location"
                className={css.input}
            />

                      {(search || selectedCity) && (
                      <button
                           type="button"
                           className={css.clearButton}
                           onClick={handleClear}>
                           <IoClose />
                      </button>
                       )}

            {isOpen && cities.length > 0 && (
                <div className={css.dropdown}>
                   {cities.map(city => (
                    <div
                        key={city._id}
                        className={css.item}
                        onClick={() => handleCitySelect(city)}>
                        {city.cityEn}, {city.stateEn}
                    </div>
                     ))}
                </div>
                
                )}
        </section>
    );
}