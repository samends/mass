import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import { State } from './interfaces';

const createCommand = createCommandFactory<State>();

const getOutdoorTemperatureCommand = createCommand(({ at, get, path, payload, state }) => {
    return [];
});

export const login = createProcess('login', [ getOutdoorTemperatureCommand ]);
