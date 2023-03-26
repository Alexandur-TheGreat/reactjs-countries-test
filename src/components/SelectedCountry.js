import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { Layout } from 'antd';

const { Header } = Layout;

export default function SelectedCountry() {
    const [country, setCountry] = useState([]);
    const [currencies, setCurrencies] = useState('');
    const [languages, setLanguages] = useState('');

    const { name } = useParams();
    useEffect(() => {
        const getSingleCountry = async () => {
            axios
                .get(`https://restcountries.com/v3.1/name/${name}`)
                .then((response) => {
                    console.log("Response below");
                    console.log(response);
                    setCountry(response.data);
                    setCurrencies(
                        Object.values(response.data[0].currencies)
                            .map((currency) => currency.name)
                            .join(', ')
                    );
                    setLanguages(
                        Object.values(response.data[0].languages)
                            .map((language) => language)
                            .join(', ')
                    );
                })
                .catch(error => {
                    console.log("This is the error: ", error)
                })
        };
        getSingleCountry();
    }, [name]);

    useEffect(() => {
        document.title = `Countries | ${name}`;
    }, [name]);

    return (
        <>
            <Layout>
                <Header className="header">
                    <Link
                        to="/"
                        className="inline-block mt-2 bg-white  px-6 rounded shadow text-gray-700 transition-all duration-200"
                        style={{ lineHeight: "48px" }}
                    >
                        Back
                    </Link>
                    <section className="p-8 md:py-0 max-w-7xl mx-auto">
                        {country.map((item) => (
                            <div
                                key={item.population}
                                className="grid grid-cols-1 gap-8 md:grid-cols-2 md:place-items-center"
                            >
                                <article>
                                    <img src={item.flags.svg} alt={item.name.common} />
                                </article>

                                <article>
                                    <h1 className="mb-8 font-bold text-gray-900 text-4xl lg:text-6xl">
                                        {item.name.official}
                                    </h1>

                                    <ul className="flex flex-col items-start justify-start text-slate-700">
                                        <li style={{ lineHeight: "35px" }}>Native Name: {item.capital[0]}</li>
                                        <li style={{ lineHeight: "35px" }}>Population: {item.population.toLocaleString()}</li>
                                        <li style={{ lineHeight: "35px" }}>Region: {item.region}</li>
                                        <li style={{ lineHeight: "35px" }}>Subregion: {item.subregion}</li>
                                        <li style={{ lineHeight: "35px" }}>Capital: {item.capital[0]}</li>

                                        <li style={{ lineHeight: "35px" }}>Top Level Domain: {item.tld}</li>
                                        <li style={{ lineHeight: "35px" }}>Currencies: {currencies}</li>
                                        <li style={{ lineHeight: "35px" }}>Languages:  {languages}</li>
                                    </ul>

                                    {item.borders && (
                                        <>
                                            <h3 className="text-gray-900 font-bold text-lg mb-2">
                                                Borders:
                                            </h3>
                                            <ul className="flex flex-wrap items-start justify-start gap-2">
                                                {item.borders.map((border, index) => (
                                                    <li
                                                        key={index}
                                                        className="bg-white p-2 rounded text-xs tracking-wide shadow text-gray-700"
                                                    >
                                                        {border}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </article>
                            </div>
                        ))}
                    </section>
                </Header>
            </Layout>
        </>
    );
}