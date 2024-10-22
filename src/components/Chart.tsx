// @ts-nocheck
import React, { ElementRef, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { UnitMeasure, WeatherAtom } from '../services/Weather'

export type ChartData = {
    name: string,
    unitMeasure: UnitMeasure,
    values: WeatherAtom[]
}

export const ChartRef: React.FC<ChartData> = (props: ChartData): React.ReactElement => {

    let ref = useRef<ElementRef<any>>(null)
    const data: WeatherAtom[] = props.values ?? []

    const buildChart = (data: WeatherAtom[]) => {
        const width = 700,
            height = 500,
            margin = 35

        // Defining the x-scale
        const x = d3.scaleTime(d3.extent(data, d => new Date(d[0])), [margin, width - margin])

        // Defining the y-scale
        const y = d3.scaleLinear([
            d3.min(data, d => 0),
            d3.max(data, d => d[1] * 1.3) // Hacking max to display nice line
        ], [height - margin, margin])

        // Defining the chart line
        const linePath = d3.line()
            .x(d => x(new Date(d[0])))
            .y(d => y(d[1]))

        // Creating the main chart
        const chart = d3.select(ref)
            .attr("width", width)
            .attr("height", height)

        // Cleaning existing drawed data
        chart.selectAll('g')
            .remove()
        chart.selectAll('path')
            .remove()

        // Drawing x-axis
        chart.append("g")
            .attr('fill', 'darkgray')
            .attr("transform", `translate(0, ${height - margin})`)
            .call(d3.axisBottom(x).ticks(width / 70).tickSizeOuter(0))

        // Drawing y-axis
        chart.append("g")
            .attr("transform", `translate(${margin}, 0)`)
            .call(d3.axisLeft(y).ticks(height / 40))
            .call(g => g.select(".domain").remove())
            // Creating y-axis lines for ticks
            .call(g => g.selectAll(".tick line").clone()
                .attr("x2", width - margin - margin)
                .attr("stroke-opacity", 0.1))

        // Drawing line-chart
        chart.append("path")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", linePath(data))

    }

    useEffect(() => {
        buildChart(data)
    }, [data])

    return <div className="svg">
        <h3>{props.name} - {props.unitMeasure}</h3>
        <svg className="container" ref={(refer) => ref = refer} width='700' height='500'></svg>
    </div>

}

export default ChartRef