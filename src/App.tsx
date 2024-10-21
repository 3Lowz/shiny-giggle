import React, { useEffect, useState } from 'react';
import WheaterFilters from './components/Weather.filters';

import WeatherRepository from './services/Weather.repository';
import { WeatherInfo, ResultType } from './services/Weather';

import './App.css';
import CitySelect from './components/City.select';

function App() {

  const [output, setOutput] = useState({})
  const [err, setError] = useState('')
  // const [handled, setHandled] = useState(false)

  useEffect(() => {
    WeatherRepository.getByCity('test').then((data: ResultType<Error, WeatherInfo>) => {
      setOutput(data)
    }).catch((err: Error) => {
      // @ts-ignore
      setError(err[0].message)
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <CitySelect />
        <WheaterFilters />
      </header>
      <div>
        {JSON.stringify(output)}
        <br />
        {err}
      </div>
    </div>
  );
}

export default App;
