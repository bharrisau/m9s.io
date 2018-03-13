import { version, Component } from 'inferno';
import { BrowserRouter, Route, Link } from 'inferno-router';
import './registerServiceWorker';
import Logo from './logo';
import './App.css';

const Home = () => (
 <p className="App-intro">
   Hello Ben.
 </p>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Logo width="80" height="80" />
            <h1>{`Welcome to Inferno ${version}`}</h1>
          </header>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>

          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
