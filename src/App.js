import { useState } from 'react'




function App() {
  const [city, setCity] = useState("")

  const [weatherForecast, setWeatherForecast] = useState(null)

  const handleChange = (event) => {
    console.log("alterou", event.target.value)
    setCity(event.target.value)
  }

  const handleSearch = () => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=4dedf75c81384f53860142837220411&q=${city}&lang=pt`)
      .then((response) => {
        if (response.status == 200) {
          return response.json()
        }
      })
      .then((data) => {
        console.log(data)
        setWeatherForecast(data)
      })
  }

  return (
    <div>
  
      <nav className="navbar navbar-expadn-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand text-white" href="weatherforecast">
          PREVISÃO DO TEMPO
        </a>
  
      </nav>

      <main className="container">
        <div className="p-5 mb-5 bg-light rounded-3">
          <h1>Previsão do tempo atual</h1>
          <p>
            Digite o nome da cidade:
          </p>

          <div className="row mb-4">
            <div className="col-md-6">
              <input onChange={handleChange} placeholder='Ex: Brasilia, Rio de Janeiro, São Paulo' className="form-control" value={city} />
            </div>

          </div>
          <button onClick={handleSearch} className="btn btn-primary">Pesquisar</button>

          {
            weatherForecast ? (
              <div>
                <div className='mt-4 d-flex align-items-center'>
                  <div>
                    <img src={weatherForecast.current.condition.icon} />
                  </div>
                  <div>
                  <h3>Clima: {weatherForecast.current.condition.text} </h3>
                  <p className='lead'>
                    Temperatura: {weatherForecast.current.temp_c}
                  </p>
                  <p className='lead'>
                    Sensação: {weatherForecast.current.feelslike_c}
                  </p>

                  </div>
                </div>
              </div>
            ) : null

          }

        </div>
      </main>



    </div>
  );
}

export default App;
