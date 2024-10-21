import React from 'react'
import { UnitMeasure, WeatherAtom } from '../services/Weather'

export type WeatherList = {
    name: string,
    unitMeasure: UnitMeasure,
    values: WeatherAtom[]
}

const WeatherList = (props: WeatherList): React.ReactElement => {

    return (<>
        <ul>
            <li>{props.name} - {props.unitMeasure}</li>
            {props.values.map((entry: WeatherAtom) => {
                return <li>{entry[0]} : <strong>{entry[1]}</strong></li>
            })}
        </ul>
    </>)
}

export default WeatherList