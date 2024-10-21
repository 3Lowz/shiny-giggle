import { Filter } from '../components/Weather.filters'

export type WeatherAtom = [string, number]
export type WeatherValues = 'temperature_2m' | 'relative_humidity_2m' | 'precipitation' | 'wind_speed_10m'

export type WeatherData = {
    [key: WeatherValues]: {
        unitMeasure: UnitMeasure,
        values: WeatherAtom[]
    }
}

export type TemperatureMetrics = '°C' | '°F'
export type HumidityMetrics = '%'
export type PrecipitationMetrics = 'mm'
export type WindMetrics = 'km/h' | 'm/s'
export type UnitMeasure = TemperatureMetrics | HumidityMetrics | PrecipitationMetrics | WindMetrics

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
        [key: WeatherValues]: UnitMeasure
    },
    hourly: {
        time: string[],
        [key: WeatherValues]: number[],
    }
}

export type Coordinates = [number, number]

export type ResultType<E = Error, T> = [Error?, T?]

interface Repository<T> {
    getById(K: any): T
    getList(): T[]
}

interface WeatherRepository extends Repository<WeatherInfo> {
    // List<Article> read();
    async getByCity(city: string): WeatherInfo
}

interface WeatherService {
    async getByCity(city: string): Promise<ResultType<Error, WeatherInfo>>
    async getByCoords(lat: number, lng: number): Promise<ResultType<Error, WeatherInfo>>
}