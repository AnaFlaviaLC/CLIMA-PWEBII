import React,{Fragment, useState, useEffect} from "react";
import axios from "axios";
import './App.css';
//import main from "./components/Main";


function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  
 // if( weather >= 31 ){
    //return(
      //<div className="calor"></div>
    //)
  //}else if(weather<=27) {
    //return(
      //<div className="frio"></div>
    //)
  //}
 
  let getWeather = async (lat, long) =>{
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat:lat,
        lon: long,
        appid: 'f7af51fbd3fcc5080343cad062e2b158',
        lang: 'pt',
        units: 'metric'
 
      }
    });
    console.log(res.data);
    setWeather(res.data);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position)=>{
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    }) 
  }, []);

  if (location == false){
    return(
      <Fragment>
        Você precisa habilitar a sua localização.
      </Fragment>
    )
  } else if (weather == false){
    return(
      <Fragment>
        Carregando o clima...
      </Fragment>
    )
  } else{ 
  return (

  
    <div className="conteiner">
    
      <div className="main">
        <h2>{weather['name']}</h2>
        <h1>{weather['main']['temp']}°</h1>
      </div>
      <hr/>
      
      <div className="second">
        <ul>
          <li><ion-icon name="partly-sunny-outline"></ion-icon>  Máxima:{weather['main']['temp_max']}°|</li>
          <li><ion-icon name="cloudy-night-outline"></ion-icon>  Mínima:{weather['main']['temp_min']}°|</li>
          <li><ion-icon name="swap-horizontal-outline"></ion-icon>  Pressão: {weather['main']['pressure']} hpa|</li>
          <li><ion-icon name="water-outline"></ion-icon>  Umidade: {weather['main']['humidity']}%</li>
        </ul>
      </div>
      
      <h3>{weather['weather'][0]['description']}</h3>
    </div>
    
  );
}

}

export default App;
