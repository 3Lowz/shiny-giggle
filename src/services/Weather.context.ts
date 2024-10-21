import { createContext } from 'react';
import { WeatherRepository } from './Weather';

export const WeatherContext: React.Context<WeatherRepository> = createContext({} as WeatherRepository);