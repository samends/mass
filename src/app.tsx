import { create, tsx } from '@dojo/framework/core/vdom';
import store from './middleware/store';
import TextInput from '@dojo/widgets/text-input';
import Button from '@dojo/widgets/button';
import { loadOutdoorTemperature } from './processes/outdoorTempProcesses';

const factory = create({ store });

export default factory(function App({ middleware: { store }}) {
    const { get, path } = store;
    const outdoorTemperature = get(path('outdoorWeatherView', 'outdoorWeather'));
    let zipcodeValue = '97227';
    if (outdoorTemperature) {
        console.log('outdoorTemp', outdoorTemperature);
        return (
            <div key="app">
                <h1>This is the grand temperature converting project!</h1>
                <h2>The current temperature at lat of {outdoorTemperature.coord.lat.toString()} and long of {outdoorTemperature.coord.lon.toString()} is: </h2>
                <p>Summary: {outdoorTemperature.main.temp.toString()}</p>
                <p>Temperature: {outdoorTemperature.weather[0].main.toString()}</p>
            </div>
            
        );
    } else {
        return (
            <div>
                <p>What's your zip?</p>
                <TextInput
                    label="Zipcode"
                    maxLength="5"
                    name="zipcode"
                    value="97227"
                    onChange={(value: string) => {
                        zipcodeValue = value;
                    }}
                />
                <Button onClick={() => {
                    store.executor(loadOutdoorTemperature)({ zipcode: zipcodeValue })
                }}> Submit </Button>
            </div>
        )
    }
});