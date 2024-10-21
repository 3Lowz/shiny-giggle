import React, { useEffect, useState } from 'react'

import WheaterFilters from './components/Weather.filters'
import CitySelect from './components/City.select'
import WeatherTable from './components/Weather.table'

import { WeatherContext } from './context/Weather.context'

import WeatherService from './services/Weather.service'
import WeatherRepository from './services/Weather.repository'
import { ResultType, WeatherData } from './services/Weather'

import './App.css'

const AppService = new WeatherService()

function App() {

  const [data, setData] = useState({})
  const [err, setError] = useState('')
  const repository = new WeatherRepository(AppService)

  const handleClick = (e: any) => {
    const city = AppService.getCity().name
    repository.getByCity(city).then(([err, data]: ResultType<Error, WeatherData>) => {
      if (!!err) {
        setError(err.message)
      }
      if (!!data) {
        setData(data)
      }
    }).catch((err: Error) => {
      setError(err.message)
    })
  }


  return (
    <div className="App">
      <WeatherContext.Provider value={AppService}>
        <header className="App-header">
          <CitySelect />
          <WheaterFilters />
          <div>
            <button onClick={handleClick} type="button">Fetch Data</button>
          </div>
        </header>
        <div>
          {err}
          <br />
          <WeatherTable data={data} />
        </div>
      </WeatherContext.Provider>
    </div>
  )
}

export default App
