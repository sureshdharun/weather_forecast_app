import React, { useEffect ,useRef,useState} from 'react'
import "./Weather.css"
import searchIcon from "../assets/search.png";
import drizzleIcon from "../assets/drizzle.png";
import clearIocn from "../assets/clear.png";
import cloudIcon from '../assets/cloud.png';
import humidityIcon from "../assets/humidity.png";
import snowIcon from "../assets/snow.png";
import wind from "../assets/wind.png";
import rainIcon from "../assets/rain.png"; 


const KEY = '64d0098c97e0496623d6d8980aa6ef07'
const Weather = () => {

    const inputRef = useRef()
    const [weather,setWeather] = useState(false)
    
    // here we assign our icon to API code
    const allIcons = {
        "01d":clearIocn,
        "01n":clearIocn,
        "02d":cloudIcon,
        "02n":cloudIcon,
        "03d":cloudIcon,
        "03n":cloudIcon,
        "04d":drizzleIcon,
        "04n":drizzleIcon,
        "09d":rainIcon,
        "09n":rainIcon,
        "010d":rainIcon,
        "010n":rainIcon,
        "11d":rainIcon,
        "11n":rainIcon,
        "013d":snowIcon,
        "013n":snowIcon
    }

    const search =async (city)=>{
        //  show alert message for entering the city name
        if(city===""){
            alert("Enter City Name")
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${KEY}`
            const response = await fetch(url);
            const data = await response.json();

            //show alert when we enter incorrect city name
            if(!response.ok){
                alert(data.message);
                return
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clearIocn;
            setWeather({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error){
            setWeather(false);
            console.error("Error in fetching data");
        }
    }

    useEffect(()=>{
        search("Tirunelveli");
    },[])

  return (
    <div className="weather">
        <div className="search-bar">
            <input type="text" placeholder='search' ref={inputRef}/>
            <img src={searchIcon} alt="search" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weather?<>
            <img src={weather.icon} alt="clear" className='weather-icon'/>
        <p className='temperature'>{weather.temperature}°c</p>
        <p className='location'>{weather.location}</p>
        <div className='weather-data'>
            <div className="col">
                <img src={humidityIcon} alt="humidity"/>
                <div>
                <p>{weather.humidity}</p>
                <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind} alt="wind"/>
                <div>
                <p>{weather.windSpeed} km/h</p>
                <span>Wind Speed</span>
                </div>
            </div>
        </div>
        </>: <></>
        }
        
    </div>
  )
}

export default Weather