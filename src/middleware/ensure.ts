import { create } from '@dojo/framework/core/vdom';
import {
	loadOutdoorTemperature,
} from '../processes/outdoorTempProcesses';
import store from './store';

const middlewareFactory = create({ store });

export const ensure = middlewareFactory(({ middleware: { store } }) => {
	return {
		ensureOutdoorTemperature(): any | undefined {
			const { get, path } = store;
			const outdoorWeatherData = get(path('outdoorWeatherView', 'outdoorWeather'));
			const inProgress = get(path('outdoorWeatherView', 'inProgress'));

			if (!outdoorWeatherData && !inProgress) {
				store.executor(loadOutdoorTemperature)({});
			}

			return outdoorWeatherData;
		}
	};
});
