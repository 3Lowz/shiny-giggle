import React, { useContext } from 'react'
import { WeatherContext } from '../context/Weather.context'
import { Coordinates } from '../services/Weather'
import CityOption from './City.option'

export type City = {
    name: string,
    location: Coordinates
}

const CitySelect = (): React.ReactElement => {

    const service = useContext(WeatherContext)

    const fixedCities: City[] = service.getCities()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const city = fixedCities.filter((city) => city.name === e.target.value)
        service.setCity(city[0])
    }

    return (<div>
        {/* @ts-ignore */}
        <select name="city" onChange={handleChange} defaultValue='Zurich'>
            {fixedCities.map((city, i) => {
                return <CityOption name={city.name} key={i} />
            })}
        </select>
    </div>)
}

export default CitySelect
