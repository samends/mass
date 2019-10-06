import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import store from './middleware/store';
import { ensure } from './middleware/ensure';

const factory = create({ store, icache, ensure });

export default factory(function App({ middleware: { store: { get, path }, icache, ensure }}) {
    const outdoorTemperature = ensure.ensureOutdoorTemperature();
    if (outdoorTemperature) {
        return (
            <div>
                <h1>This is the grand tempurature converting project!</h1>
                <h2>The current temperature at lat of {outdoorTemperature.latitude.toString()} and long of {outdoorTemperature.longitude.toString()} is: </h2>
                <p>Summary: {outdoorTemperature.currently.summary}</p>
                <p>Temperature: {outdoorTemperature.currently.temperature.toString()}</p>
            </div>
            
        );
    } else {
        return (
            <div> Loading... </div>
        )
    }
});