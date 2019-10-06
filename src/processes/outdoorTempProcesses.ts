import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import { State } from '../interfaces';
import { replace } from "@dojo/framework/stores/state/operations";
import { fetch } from '../util/fetch';
import { API_KEY } from '../api_key';

const createCommand = createCommandFactory<State>();

const startOutdoorTemperatureCommand = createCommand(({ at, get, path, payload, state }) => {
    return [
        replace(path('outdoorWeatherView', 'inProgress'), true)
    ];
});

const loadOutdoorTemperatureCommand = createCommand(async ({ at, get, path, payload, state }) => {
    console.log('making request');
    const outdoorWeatherData = await fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${API_KEY}/37.8267,-122.4233`, {
        method: 'GET'
    });
    return [
        replace(path('outdoorWeatherView', 'outdoorWeather'), outdoorWeatherData)
    ];
});

const loadedOutdoorTemperatureCommand = createCommand(({ at, get, path, payload, state }) => {
    return [
        replace(path('outdoorWeatherView', 'inProgress'), false)
    ];
});

export const loadOutdoorTemperature = createProcess('get outdoor temperature', [ startOutdoorTemperatureCommand, loadOutdoorTemperatureCommand, loadedOutdoorTemperatureCommand ]);
