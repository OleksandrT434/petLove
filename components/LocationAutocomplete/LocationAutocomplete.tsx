"use client"
import { useState, useEffect } from "react";
import { PetsApi } from "@/lib/api/clientApi";
import { City } from "@/types/pets";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function LocationSearch() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [keyword, setKeyword] = useState("");
    const [cities, setCities] = useState<City[]>([]); 

    useEffect(() => {
        const loadCities = async () => {
            try {
                const response = await PetsApi.searchCities(keyword);
                setCities(response);
            }
            catch (error) {
                console.error("Error fetching cities:", error);
            }
        };

        if (keyword.length >= 3) {
            loadCities();
            } else {
          }
    }
, [keyword]);
     const handleCitySelect = (city: City) => {

        const params = new URLSearchParams(searchParams);

        params.set("locationId", city._id);
        setCities([]);
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
        }

    return (
        <section>
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search for a city..."
            />
            {keyword.length >= 3 && cities.length > 0 && (
                <ul>
                   {cities.map(city => (
                    <li key={city._id}
                        onClick={() => handleCitySelect(city)}>
                        {city.cityEn}, {city.stateEn}
                    </li>
                     ))}
                </ul>
                )}
        </section>
    );
}