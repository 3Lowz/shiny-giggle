import { City } from "../components/City.select"
import { Filter } from "../components/Weather.filters"
import { WeatherInfo, WeatherData, WeatherValues, ResultType, Coordinates, UnitMeasure } from "./Weather"

class WeatherService {

    private BASEURL: string = `https://api.open-meteo.com/v1/forecast`
    private filters: Filter = {
        'temperature_2m': false,
        'relative_humidity_2m': false,
        'precipitation': false,
        'wind_speed_10m': false,
    }
    private cities: City[] = [
        { name: 'Pordenone', location: [45.9569, 12.6605] },
        { name: 'Milan', location: [45.5921, 9.5734] },
        { name: 'Zurich', location: [47.3667, 8.55] },
        { name: 'Lisboa', location: [38.7167, -9.1333] },
        { name: 'Udin', location: [46.0693, 13.2371] },
    ]
    private city: City = { name: 'Zurich', location: [47.3667, 8.55] }

    async getByCity(cityName: string): Promise<ResultType<Error, WeatherData>> {

        const selectedCity = this.cities.filter((city) => cityName === city.name)[0]
        let selectedFilter = []
        for (let key in this.filters) {
            if (this.filters[key]) {
                selectedFilter.push(key)
            }
        }
        if (!selectedFilter.length) {
            selectedFilter = ['temperature_2m']
        }
        const url = this._buildUrl(selectedCity.location, selectedFilter)
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => res.json())
                .then((data: any) => {
                    if (Reflect.has(data, 'error') && !!data.error) {
                        reject([new Error(data.reason), {}])
                    }
                    else {
                        resolve([undefined, this._transformData(data)])
                    }
                }).catch((err: Error) => {
                    console.log(err)
                    reject([err, {}])
                })
        })
    }

    getByCoords(lat: number, lng: number): Promise<ResultType<Error, WeatherInfo>> {
        return new Promise((resolve, reject) => {
            reject([new Error(`Unimplemented`), null])
        })
    }

    private _buildUrl(position: Coordinates, activeFilters: string[]) {

        const paramsObj = {
            latitude: `${position[0]}`,
            longitude: `${position[1]}`,
            hourly: activeFilters.join(','),
            timezone: 'Europe/Berlin',
            forecast_days: `3`,
        }
        const searchParams = new URLSearchParams(paramsObj);
        return `${this.BASEURL}?${searchParams.toString()}`
    }

    /**
     * 
     * @param data 
     * @returns 
     */
    private _transformData(data: WeatherInfo): WeatherData {
        const measures = Object.keys(data.hourly).filter((key) => key !== 'time') as WeatherValues[]
        const measuresUnits = data.hourly_units
        let res = {} as WeatherData
        // Initializing the WeatherData object keys and unitMeasure
        measures.map((measure: string) => {
            // @ts-ignore   
            res[measure] = {
                // @ts-ignore   
                unitMeasure: measuresUnits[measure],
                values: []
            }
        })
        data.hourly.time.map((datetime, i) => {
            measures.forEach((measure) => {
                // @ts-ignore
                if (!!data.hourly[measure][i]) {
                    // @ts-ignore   
                    res[measure].values.push([datetime, data.hourly[measure][i]])
                } else {
                    // @ts-ignore
                    res[measure].values.push([datetime, -1])  // Not found data handling
                }
            })
        })
        return res as WeatherData
    }

    /**
     * Getters and Setters
     */
    getFilters() {
        return this.filters
    }
    setFilter(filters: Filter) {
        this.filters = filters
    }
    getCities() {
        return this.cities
    }
    setCity(city: City) {
        console.log(`setting city:`, city.name)
        this.city = city
    }
    getCity() {
        return this.city
    }

}

export default WeatherService