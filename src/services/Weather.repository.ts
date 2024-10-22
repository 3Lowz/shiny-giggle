import { WeatherData, ResultType } from "./Weather";
import WeatherService from "./Weather.service";

class WeatherRepository {

    private service: WeatherService

    constructor(service: WeatherService) {
        this.service = service
    }

    async getByCity(city: string): Promise<ResultType<Error, WeatherData>> {
        console.log(`Fetching weather for city: `, city)
        return await this.service.getByCity(city)
    }

}

export default WeatherRepository