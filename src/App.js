import { Component } from 'inferno';
import { BrowserRouter, Route, Switch, Link } from 'inferno-router';
import './registerServiceWorker';
import Post from './Post';

const NotFound = () => (
  <div>
    <Title title="404 Not found"/>
    <h2>Page not found</h2>
  </div>
);

const Home = () => (
        <div className="py-8">
        <Post stub='./2018-03-14-test.md' />
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
            <header className="border-t-4 border-blue">
                <div className="px-8 py-4 border-b text-grey-dark hover:text-black trans">
                <h1><Link to="/" className="inherit no-underline">m9s.io</Link></h1>
                </div>
            </header>
        );
    }
}

class Footer extends Component {
    render() {
        return (
                <footer className="py-8 border-t">
                <div className="max-w-md mx-auto">
                </div>
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
    <section className="font-sans">
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
        <Home />
        <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
