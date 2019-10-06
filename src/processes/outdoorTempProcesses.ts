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

const loadOutdoorTemperatureCommand = createCommand<{zipcode: string}>(async ({ at, get, path, payload, state }) => {
    const { zipcode } = payload;
    const outdoorWeatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=${API_KEY}`, {
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
