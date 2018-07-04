import { version, Component } from 'inferno';
import { BrowserRouter, Route, Switch, Link } from 'inferno-router';
import './registerServiceWorker';
import Logo from './logo';
import Post from './Post';

const NotFound = () => (
  <div>
    <Title title="404 Not found"/>
    <h2>Page not found</h2>
  </div>
);

const Home = () => (
  <div>
    <p class="f4 lh-copy">
    Hello Ben.
    </p>
        <Post stub='./2018-03-14-test.md' short />
  </div>
);

const About = () => (
  <div>
    <Title title="About me"/>
    <h2 class="b">About</h2>
  </div>
);

class Header extends Component {
    render() {
        return (
            <header>
            <Logo width="80" height="80" />
            <h1>{`Welcome to Inferno ${version}`}</h1>
            <h2>Tagling goes here</h2>
            </header>
        );
    }
}

class Footer extends Component {
    render() {
        return (
                <footer>
                <p>This is my footer</p>
                </footer>
        );
    }
}

class Title extends Component {
  constructor(props) {
    super(props)
    this.title = props.title;
  }
  componentDidMount() {
    document.title = this.title;
  }
}

class Body extends Component {
    render() {
        return (
    <section className="App">
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>

    <Link to="/2018-03-14-test">Testing</Link>

    <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/about" component={About}/>

    <Route component={NotFound}/>
    </Switch>
    </section>
        );
    }
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
        <Header />
        <Body />
        <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
