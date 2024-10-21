import React from 'react'

export type Option = {
    name: string,
}

const CityOption = (props: Option): React.ReactElement => {
    return (<option id={props.name}>
        {props.name}
    </option>)
}

export default CityOption
