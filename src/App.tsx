import React, { useEffect, useState } from 'react'

import WheaterFilters from './components/Weather.filters'
import CitySelect from './components/City.select'
import WeatherTable from './components/Weather.table'

import { WeatherContext } from './context/Weather.context'

import WeatherService from './services/Weather.service'
import WeatherRepository from './services/Weather.repository'
import { WeatherInfo, ResultType } from './services/Weather'

import './App.css'

const AppService = new WeatherService()

function App() {

  const [data, setData] = useState({})
  const [err, setError] = useState('')
  const repository = new WeatherRepository(AppService)

  // useEffect(() => {
  //   repository.getByCity('test').then((data: ResultType<Error, WeatherInfo>) => {
  //     setOutput(data)
  //   }).catch((err: Error) => {
  //     // @ts-ignore
  //     setError(err[0].message)
  //   })
  // }, [])

  const handleClick = (e: any) => {
    const city = AppService.getCity().name
    const filters = AppService.getFilters()
    console.log(city)
    console.log(filters)
    repository.getByCity(city).then(([err, data]: ResultType<Error, WeatherInfo>) => {
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
          {JSON.stringify(data)}
          <br />
          {err}
        </div>
        <div>
          <WeatherTable />
        </div>
      </WeatherContext.Provider>
    </div>
  )
}

export default App
