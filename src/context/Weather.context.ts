import { createContext } from 'react';
import WeatherService from '../services/Weather.service';

export const WeatherContext: React.Context<WeatherService> = createContext({} as WeatherService);
