import React, { useContext, useEffect, useState } from 'react'
import { WeatherContext } from '../context/Weather.context'
import WeatherRepository from '../services/Weather.repository'
import { ResultType, WeatherInfo } from '../services/Weather'

type City = {
    city: string
}

const WeatherTable = (): React.ReactElement => {

    // const service = useContext(WeatherContext)

    const city = 'fdasfasd'

    const [data, setData] = useState({} as WeatherInfo)

    return (<>
        {city}
    </>)
}

export default WeatherTable