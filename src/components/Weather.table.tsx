import React from 'react'
import { WeatherData } from '../services/Weather'
import WeatherList from './Weather.list'
import ChartRef from './Chart'

export type DataTable = {
    data: WeatherData
}

const WeatherTable = (props: DataTable): React.ReactElement => {

    let lists: React.ReactElement[] = []
    let charts: React.ReactElement[] = []
    for (let key in props.data) {
        lists.push(<WeatherList name={key} key={key} unitMeasure={props.data[key].unitMeasure} values={props.data[key].values} />)
        charts.push(<ChartRef name={key} key={key} unitMeasure={props.data[key].unitMeasure} values={props.data[key].values} />)
    }

    return (<>
        {/* {lists.map((list) => {
            return list
        })} */}
        {charts.map((chart) => {
            return chart
        })}
    </>)
}

export default WeatherTable