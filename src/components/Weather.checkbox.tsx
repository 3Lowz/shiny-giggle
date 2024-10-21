import React, { ChangeEventHandler } from 'react'

export type WeatherPropertyCheckbox = {
    name: string,
    value: boolean,
    onChange: ChangeEventHandler<HTMLInputElement>
}

const WeatherCheckbox = (props: WeatherPropertyCheckbox): React.ReactElement => {

    return (<div>
        <label htmlFor={props.name}>{props.name}</label>
        <input type="checkbox" name={props.name} id={props.name} onChange={props.onChange} checked={props.value} />
    </div>)
}

export default WeatherCheckbox