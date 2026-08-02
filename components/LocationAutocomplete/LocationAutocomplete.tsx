"use client"
import { useState, useEffect } from "react";
import { PetsApi } from "@/lib/api/clientApi";
import { City } from "@/types/pets";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import css from "./LocationAutocomplete.module.css";

export default function LocationSearch() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState("");
    const [cities, setCities] = useState<City[]>([]); 
    const [selectedCity, setSelectedCity] = useState<City | null>(null);

    useEffect(() => {
        const loadCities = async () => {
            if(selectedCity) return;
            if (search.length < 3) {
            setCities([]);
            return;
            }
            try {
                const response = await PetsApi.searchCities(search);
                setCities(response);
            }
            catch (error) {
                console.error("Error fetching cities:", error);
            }
        };
            loadCities();
           }, [search, selectedCity]);
     const handleCitySelect = (city: City) => {

        const params = new URLSearchParams(searchParams);

        setSelectedCity(city);
        setSearch("");
        setCities([]);
        params.set("locationId", city._id);
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
        }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCity(null);
    setSearch(e.target.value);
};

    return (
        <section className={css.wrapper}>
            <input
                type="text"
                value={selectedCity ? selectedCity.cityEn : search}
                onChange={handleChange}
                placeholder="Location"
                className={css.input}
            />
            {search.length >= 3 && cities.length > 0 && (
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