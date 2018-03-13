import { version, Component } from 'inferno';
import { BrowserRouter, Route, Switch, Link } from 'inferno-router';
import './registerServiceWorker';
import Logo from './logo';
import './App.css';

const NotFound = () => (
  <div>
    <Title title="404 Not found"/>
    <h2>Page not found</h2>
  </div>
);

const Home = () => (
 <p className="App-intro">
   Hello Ben.
 </p>
);

const About = () => (
  <div>
    <Title title="About me"/>
    <h2>About</h2>
  </div>
);

class Title extends Component {
  constructor(props) {
    super(props)
    this.title = props.title;
  }
  componentDidMount() {
    document.title = this.title;
  }
}

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

          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
