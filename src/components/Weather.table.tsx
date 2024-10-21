import React from 'react'
import { WeatherData } from '../services/Weather'
import WeatherList from './Weather.list'

export type DataTable = {
    data: WeatherData
}

const WeatherTable = (props: DataTable): React.ReactElement => {

    // const service = useContext(WeatherContext)
    let lists = []
    for (let key in props.data) {
        // @ts-ignore
        lists.push(<WeatherList name={key} key={key} unitMeasure={props.data[key].unitMeasure} values={props.data[key].values} />)
    }

    return (<>
        {lists.map((list) => {
            return list
        })}
    </>)
}

export default WeatherTable