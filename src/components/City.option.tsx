import React from 'react'

export type City = {
    name: string,
}

const CityOption = (props: City): React.ReactElement => {
    return (<option id={props.name}>
        {props.name}
    </option>)
}

export default CityOption
