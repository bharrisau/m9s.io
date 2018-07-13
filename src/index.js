import { render } from 'inferno';
import App from './App';
import './normalise.css';
import './index.css';

const appElement = document.getElementById('container');
App.preload().then(() => {
    render(<App />, appElement);
});

// render will call hydrate when needed
// if (appElement.hasChildNodes()) {
//   hydrate(<App />, appElement);
// } else {
//     render(<App />, appElement);
// }
