import { useState, useEffect } from "react";
import axios from 'axios';
import Country from "./Country";
import { Table, Switch,Input } from 'antd';

const baseURL = "https://restcountries.com/v3.1/all";

export default function CountriesMenu() {

    const [countries, setCountries] = useState([]);
    const [countriesFiltered, setCountriesFiltered] = useState([]);
    const [switchChecked, setSwitchChecked] = useState(true);
    const [searchRegion, setSearchRegion] = useState("");
    const [searchText, setSearchText] = useState("null");

    const columns = [
        {
            title: "Image",
            dataIndex: "svg",  // this is the value that is parsed from the DB / server side
            render: (text, record) => {
                return (
                    <div>
                        <img src={record.flags.svg} />
                    </div>
                );
            },
            width: '20%'
        },
        {
            title: 'Population',
            dataIndex: 'population',
            render: (text, record) => {
                return (
                    <div>
                        {record.population.toLocaleString()}
                    </div>
                );
            },
        },
        {
            title: 'Region',
            dataIndex: 'region',
            filters: [
                {
                    text: 'Africa',
                    value: 'Africa',
                },
                {
                    text: 'Americas',
                    value: 'Americas',
                },
                {
                    text: 'Asia',
                    value: 'Asia',
                },
                {
                    text: 'Europe',
                    value: 'Europe',
                },
                {
                    text: 'Ocenia',
                    value: 'Ocenia',
                },
            ],
            filteredValue: [searchRegion],
            onFilter: (value, record) => {
                return String(record.region).toLowerCase().includes(value.toLowerCase());
            },
        },
        {
            title: 'Capital',
            dataIndex: 'capital',
        },
        {
            title: 'Country Name',
            dataIndex: 'name',
            render: (text, record) => {
                return (
                    <div>
                        {record.name.common}
                    </div>
                );
            },
            filteredValue: [searchText],
            onFilter: (value, record) => {console.log("Record",record.name.common)
            console.log("Record 2 " ,value)
                return record.name.common.includes(value);
            },
        },
        {
            title: 'Currency',
            dataIndex: 'currency',
            render: (text, record) => {
                return (
                    <div>
                        {Object.values(record.currencies)
                            .map((currency) => currency.name)
                            .join(', ')}
                    </div>
                );
            },

        },
    ];

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

    async function filterByRegion(searchRegion) {
        try {
            setSearchRegion(searchRegion);
        } catch (error) {
            console.error(error);
        }
    }

    const onChangeSwitch = (checked) => {
        console.log(`switch to ${checked}`);
        setSwitchChecked(checked);
    };

    const onTableChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (<>
        {!switchChecked ? (
            <section className="container mx-auto p-8">
                <Switch checkedChildren="Card" unCheckedChildren="Table" onChange={onChangeSwitch} defaultChecked />

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
                    <h1>Table View</h1>
                        <Input.Search
                            placeholder="Search for a country"
                            onSearch={(value)=>{
                                setSearchText(value)
                            }}
                            className="py-3 px-4 text-gray-600 placeholder-gray-600 w-full shadow rounded outline-none transition-all duration-200"
                        />
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
                <Table columns={columns} dataSource={countries} onChange={onTableChange} />
            </section>


        )

            :
            (

                <section className="container mx-auto p-8">
                    <Switch checkedChildren="Card" unCheckedChildren="Table" onChange={onChangeSwitch} defaultChecked className="background-color:black" />
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
                        <h1>Card View</h1>
                        <form
                            autoComplete="off"
                            className="max-w-4xl md:flex-1"
                        >
                            {/* <input
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Search for a country"
                                required
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="py-3 px-4 text-gray-600 placeholder-gray-600 w-full shadow rounded outline-none transition-all duration-200"
                            /> */}
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
                        {countries.length > 0 && countries.map((country) => (
                            <Country key={country.name.common}{...country} />
                        ))}
                    </div>
                </section>
            )}
    </>
    );
}
