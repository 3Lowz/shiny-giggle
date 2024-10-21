import { Filter } from '../components/Weather.filters'

export type WeatherAtom = [string, number]

// React-Redux state
export type WeatherApp = {
    filters: Property,
    city: string,
    info: {
        [key: string]: WeatherAtom[]
    }
}

export type TemperatureMetrics = '°C' | '°F'
export type HumidityMetrics = '%'
export type PrecipitationMetrics = 'mm'
export type WindMetrics = 'km/h' | 'm/s'

export type WeatherInfo = {
    latitude: number,
    longitude: number,
    generationtime_ms: number,
    utc_offset_seconds: number,
    timezone: string,               // Could be a defined type
    timezone_abbreviation: string,  // Also
    elevation: number,
    hourly_units: {
        time: string,               // Also
        temperature_2m: TemperatureMetrics
        relative_humidity_2m: HumidityMetrics,
        precipitation: PrecipitationMetrics,
        wind_speed_10m: WindMetrics
    },
    hourly: {
        time: string[],
        temperature_2m?: number[],
        relative_humidity_2m?: number[],
        precipitation: number[],
        wind_speed_10m: number[]
    }
}

export type ResultType<E = Error, T> = [Error?, T?]

interface Repository<T> {
    getById(K: any): T
    getList(): T[]
}

interface WeatherRepository extends Repository<WeatherInfo> {
    // List<Article> read();
    getByCity(city: string): WeatherInfo
}

interface WeatherService {
    async getByCity(city: string): Promise<ResultType<Error, WeatherInfo>>
    async getByCoords(lat: number, lng: number): Promise<ResultType<Error, WeatherInfo>>
}