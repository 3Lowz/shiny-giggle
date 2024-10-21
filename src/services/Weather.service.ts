import { WeatherInfo, ResultType } from "./Weather"

class WeatherService {

    private BASEURL: string = `https://api.open-meteo.com/v1/forecast?latitude=45.9569&longitude=12.6605&hourly=temperature_2m,precipitation,weather_code,wind_speed_10m&timezone=Europe%2FBerlin&forecast_days=3`

    async getByCity(city: string): Promise<ResultType<Error, WeatherInfo>> {
        return new Promise((resolve, reject) => {
            reject(new Error(`my error`))
        })
    }

    static getByCoords(lat: number, lng: number): Promise<ResultType<Error, WeatherInfo>> {
        return new Promise((resolve, reject) => {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=45.9569&longitude=12.6605&hourly=temperature_2m,precipitation,weather_code,wind_speed_10m&timezone=Europe%2FBerlin&forecast_days=3`
            fetch(url)
                .then(res => res.json())
                .then((data: any) => {
                    if (Reflect.has(data, 'error') && !!data.error) {
                        reject([new Error(data.reason), {}])
                    }
                    else {
                        resolve([undefined, data])
                    }
                }).catch((err: Error) => {
                    console.log(err)
                    reject([err, {}])
                })
        })
    }

}

export default WeatherService