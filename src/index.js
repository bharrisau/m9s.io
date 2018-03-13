import { render, hydrate } from 'inferno';
import App from './App';
import './index.css';

const appElement = document.getElementById('app');
if (appElement.hasChildNodes()) {
  console.log("Hydrating");
  hydrate(<App />, appElement);
} else {
  console.log("Rendering");
  render(<App />, appElement);
}
