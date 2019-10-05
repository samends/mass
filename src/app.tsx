import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';

const factory = create({ icache });

export default factory(function App() {
    return (
        <div>
            <h1>This is the grand tempurature converting project!</h1>
        </div>
    );
});