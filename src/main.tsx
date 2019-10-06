import renderer, { tsx } from '@dojo/framework/core/vdom';
import App from './app';

const r = renderer(() => <App />);
r.mount();
