import React from 'react'
import Info from './components/info';
import Form from './components/form';
import Weather from './components/weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const API_KEY = "f667bf810181fe247c55c59eb263b1fd";

class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    sunrise: undefined,
    sunset: undefined,
    pressure: undefined,
    error: undefined
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    var city = e.target.elements.city.value;
    
    if(city) {
      const api_url = await
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      const data = await api_url.json();

      var sunset = data.sys.sunset;
      var date = new Date();
      date.setTime(sunset * 1000);
      var sunset_date = date.getHours(sunset) + ":" + date.getMinutes(sunset);

      var sunrise = data.sys.sunrise;
      date.setTime(sunrise * 1000);
      var sunrise_date = date.getHours(sunrise) + ":" + date.getMinutes(sunrise);

      this.setState({
        temp: Math.round(data.main.temp),
        city: data.name,
        sunrise: sunrise_date,
        sunset: sunset_date,
        pressure: Math.round((data.main.pressure)*0.75),
        error: undefined
      });
  } else {
      this.setState({
        temp: undefined,
        city: undefined,
        sunrise: undefined,
        sunset: undefined,
        pressure: undefined,
        error: "Введите название города"
      });

  }
  };

  render() {
    return (
      <div className="wrapper">
        <div className="main">
        <div className="container">
          <div className="row">
              <div className="col-sm-5 info">
              <Info />
              </div>
              <div className="col-sm-7 form">
                <Form weatherMethod={this.gettingWeather} />
                <Weather 
                  temp = {this.state.temp}
                  city = {this.state.city}
                  sunrise = {this.state.sunrise}
                  sunset = {this.state.sunset}
                  pressure = {this.state.pressure}
                  error = {this.state.error}
                />
              </div>
            </div>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
