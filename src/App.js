import getWeatherData from './Services/weatherService';
import './App.css';
import Forcast from './components/Forcast';
import Inputs from './components/Inputs';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import TimeandLocation from './components/TimeandLocation';
//import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons'; 
import getFormattedWeatherData from './Services/weatherService';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

const [query, setQuery] = useState({q: 'london'})
const [units, setUnits] = useState('metric')
const [weather, setWeather] = useState(null)




useEffect(() => {
  const fetchWeather = async () => {
    await getFormattedWeatherData({...query, units}).then(data => {
      setWeather(data);
    });
    
  };
  
  fetchWeather();
}, [query, units]);

const formatBackground = () => {
  if (!weather) return "from-cyan-700 to-blue-700";
  const threshold = units === "metric" ? 20 : 60;
  if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

  return "from-yellow-700 to-orange-700";
}

  return (
    
    <div 
    className= {`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>
      
 
    {weather && (
      <div>
      <TimeandLocation weather={weather} />
      <TemperatureAndDetails weather={weather}/>

      <Forcast title='hourly Forcast' items={weather.hourly}/>
      <Forcast title='daily Forcast' items={weather.daily}/>
      </div>

    )}


     

    </div>
  );
}

export default App;
