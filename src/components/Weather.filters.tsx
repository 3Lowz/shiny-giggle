import React, { useState } from 'react'
import WeatherCheckbox from './Weather.checkbox'

export type Filter = { [key: string]: boolean }

const WheaterFilters = (): React.ReactElement => {

    // Statics due to requirements
    const fixedFilters: Filter = {
        'temperature_2m': false,
        'relative_humidity_2m': false,
        'precipitation': false,
        'wind_speed_10m': false,
    }
    const [filters, setProperties] = useState(fixedFilters)

    const handleChange = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setProperties({
            ...filters,
            [fieldName]: !!e.target.checked,
        });
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