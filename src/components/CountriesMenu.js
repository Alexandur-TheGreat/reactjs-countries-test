import { useState, useEffect } from "react";
import axios from 'axios';
import Country from "./Country";

const baseURL = "https://restcountries.com/v3.1/all";

export default function CountriesMenu() {

    const [countries, setCountries] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [countriesFiltered, setCountriesFiltered] = useState([]);

    useEffect(() => {
        const countriesList = async () => {
            axios
                .get(baseURL)
                .then((response) => {
                    console.log("Response below");
                    console.log(response);
                    setCountries(response.data);
                    setCountriesFiltered(response.data);
                })
                .catch(error => {
                    console.log("This is the error: ", error)
                })

        }
        countriesList()
    }, [])

    const regions = [
        { name: "Africa" }, { name: "Americas" }, { name: "Asia" }, { name: "Europe" }, { name: "Ocenia" }];

    async function searchCountry() {
        try {
            const res = await fetch(
                `https://restcountries.com/v3.1/name/${searchText}`
            );
            const data = await res.json();
            setCountriesFiltered(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function filterByRegion(searchRegion) {
        try {
            // const res = await fetch(
            //     `https://restcountries.com/v3.1/region/${region}`
            // );
            // const data = await res.json();
            // setCountries(data);
            console.log("Original table",countries)

            const filteredData = countries.filter(
                (x) => x.region == searchRegion
              );

              console.log("Region searched",filteredData)
              setCountries(filteredData);
              

        } catch (error) {
            console.error(error);
        }
    }

    // const filterByRegion = (region, searchParams) => {
    //     return countries.filter(({ name, region }) => {
    //             const testString = `${author}${title}`.toLowerCase();
    //           let authorName = author.toLowerCase();
    //       let bookTitle = title.toLowerCase();
    //             return testString.includes('m') && (authorName.startsWith('m') || bookTitle.startsWith('m'));
    //           })
    //   }

    function handleSearchCountry(e) {
        console.log("MASUK HERE");
        e.preventDefault();
        searchCountry();
    }


    return (<>
        {!countries ? (<h1>Laoding...</h1>) :
            (
                <section className="container mx-auto p-8">

                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
                        <form
                            onSubmit={handleSearchCountry}
                            autoComplete="off"
                            className="max-w-4xl md:flex-1"
                        >
                            <input
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Search for a country"
                                required
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="py-3 px-4 text-gray-600 placeholder-gray-600 w-full shadow rounded outline-none transition-all duration-200"
                            />
                        </form>

                        <form>
                            <select
                                name="filter-by-region"
                                id="filter-by-region"
                                className="w-52 py-3 px-4 outline-none shadow rounded text-gray-600"
                                value={regions.name}
                                onChange={(e) => filterByRegion(e.target.value)}
                            >
                                {regions.map((region, index) => (
                                    <option key={index} value={region.name}>
                                        {region.name}
                                    </option>
                                ))}
                            </select>
                        </form>
                    </div>

                    <div className="background-color:whitesmoke grid grid -cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                        {countries.length>0 && countries.map((country) => (
                            <Country key={country.name.common}{...country} />
                        ))}
                    </div>
                </section>
            )}
    </>
    );
}
