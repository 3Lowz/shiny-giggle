import React from 'react'
import CityOption from './City.option'

const CitySelect = (): React.ReactElement => {

    const fixedCities = [
        { name: 'Pordenone', location: [45.9569, 12.6605] },
        { name: 'Milan', location: [45.5921, 9.5734] },
        { name: 'Zurich', location: [47.3667, 8.55] },
        { name: 'Lisboa', location: [38.7167, -9.1333] },
        { name: 'Udin', location: [46.0693, 13.2371] },
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`build here: `, e.target.value)
    }

    return (<div>
        {/* @ts-ignore */}
        <select name="city" onChange={handleChange}>
            {fixedCities.map((city, i) => {
                return <CityOption name={city.name} key={i} />
            })}
        </select>
    </div>)
}

export default CitySelect

/**
 * 
 * 
 * 
 * PN: 45.9569, 12.6605
 * UD: 46.0693, 13.2371
 * MI: 45.5921, 9.5734
 * ZU: 47.3667, 8.55
 * PT: 38.7167, -9.1333
 */