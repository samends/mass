import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import store from './middleware/store';
import { ensure } from './middleware/ensure';

const factory = create({ store, icache, ensure });

export default factory(function App({ middleware: { store: { get, path }, icache, ensure }}) {
    const outdoorTemperature = ensure.ensureOutdoorTemperature();
    if (outdoorTemperature) {
        console.log('outdoorTemp', outdoorTemperature);
        return (
            <div key="app">
                <h1>This is the grand tempurature converting project!</h1>
                <h2>The current temperature at lat of {outdoorTemperature.coord.lat.toString()} and long of {outdoorTemperature.coord.lon.toString()} is: </h2>
                <p>Summary: {outdoorTemperature.main.temp.toString()}</p>
                <p>Temperature: {outdoorTemperature.weather[0].main.toString()}</p>
            </div>
            
        );
    } else {
        return (
            <div key="loading"> Loading... </div>
        )
    }
});