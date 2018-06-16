import { render } from 'inferno';
import App from './App';
import './index.css';
import 'tachyons/css/tachyons.css';

const appElement = document.getElementById('container');
render(<App />, appElement);

// render will call hydrate when needed
// if (appElement.hasChildNodes()) {
//   hydrate(<App />, appElement);
// } else {
//     render(<App />, appElement);
// }
