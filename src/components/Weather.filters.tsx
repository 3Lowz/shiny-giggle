import React, { useState, useContext } from 'react'
import { WeatherContext } from '../context/Weather.context'
import WeatherCheckbox from './Weather.checkbox'

export type Filter = { [key: string]: boolean }

const WheaterFilters = (): React.ReactElement => {

    const service = useContext(WeatherContext)

    // Statics due to requirements
    const fixedFilters: Filter = service.getFilters()
    const [filters, setProperties] = useState(fixedFilters)

    const handleChange = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setProperties({
            ...filters,
            [fieldName]: !!e.target.checked,
        });
        service.setFilter({
            ...filters,
            [fieldName]: !!e.target.checked,
        })
    };

    let filterComponents = []
    for (let key in filters) {
        filterComponents.push(<WeatherCheckbox name={key} value={filters[key]} onChange={handleChange(key)} key={key} />)
    }

    return (<div>
        {filterComponents.map((filter) => {
            return filter
        })}
    </div>)
}

export default WheaterFilters