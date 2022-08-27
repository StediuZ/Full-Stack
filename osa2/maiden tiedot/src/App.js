import { useState, useEffect } from "react"

import axios from "axios";

const Filter = (props) => {
  return (
    <div>
      find countries:{" "}
      <input value={props.newFilter} onChange={props.handleFilterChange} />
    </div>
  );
};

const CountriesName = (props) => {
  const CountriesFiltered = props.Allcountries.filter(
    (i) =>
      i.name.common.toLowerCase().indexOf(props.newFilter.toLowerCase()) > -1
  );

  if (CountriesFiltered.length > 10) {
    return <p>too many matches</p>;
  } else if (CountriesFiltered.length > 1 && CountriesFiltered.length < 11) {
    return CountriesFiltered.map((i) => (
      <p>
        {i.name.common}
        <button onClick={() => props.setNewFilter(i.name.common)}>show</button>
      </p>
    ));
  } else if (CountriesFiltered.length === 1) {
    return (
      <div>
        <h1>{CountriesFiltered[0].name.common}</h1>

        <p>capital {CountriesFiltered[0].capital[0]}</p>

        <p>area {CountriesFiltered[0].area}</p>

        <h3>Languages</h3>

        <ul>
          {Object.values(CountriesFiltered[0].languages).map((i) => (
            <li>{i}</li>
          ))}
        </ul>
        <img src={CountriesFiltered[0].flags.png} alt="Flag" />
        
      </div>
    );
  } else {
    return <p>no matches</p>;
  }
};

/*const Coord = (props) => {
  //console.log("Coord")
  const url =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    props.city +
    "&limit=5&appid=" +
    props.api
  //console.log(url)
  useEffect(() => {
    axios.get(url).then((response) => {
      const set = response.data
      props.setCoord(set[0])
      console.log("setcoord")
      console.log(set[0])
    })
  },[])
}
const Weather = (props) => {
  console.log("Weather")
  //console.log(props.CoordCountry)
  const lon = props.CoordCountry.lon
  const lat = props.CoordCountry.lat
  //console.log(props.CoordCountry.lat)
  //console.log(props.CoordCountry.lat)
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    props.api
  console.log(url)
  useEffect(() => {
    axios.get(url).then((response) => {
      console.log(response.data)
      props.setWeatherCountry(response.data)
    })
  },[])
}*/
const App = () => {
  const [Allcountries, setAllCountries] = useState([]);
  const [WeatherCountry, setWeatherCountry] = useState([]);
  const [CoordCountry, setCoord] = useState([]);
  useEffect(() => {
    axios

      .get("https://restcountries.com/v3.1/all")

      .then((response) => {
        setAllCountries(response.data);
      });
  },[]);
  const [newFilter, setNewFilter] = useState("");

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };
  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <CountriesName
        CoordCountry={CoordCountry}
        setCoord={setCoord}
        setNewFilter={setNewFilter}
        newFilter={newFilter}
        Allcountries={Allcountries}
        //setWeatherCountry={setWeatherCountry}
      />

      
    </div>
  );
};

export default App;