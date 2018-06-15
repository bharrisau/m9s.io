import { version, Component, createPortal } from 'inferno';
import { BrowserRouter, Route, Switch, Link } from 'inferno-router';
import './registerServiceWorker';
import Logo from './logo';
import './App.css';
import format from 'date-fns/format';
import * as matter from 'gray-matter';
import { createElement } from 'inferno-create-element';

const remark = require('remark');
const reactRenderer = require('remark-react');


const postsContext = require.context('!markdown-with-front-matter-loader!./_posts', false, /.md$/);
const posts = require.context('!raw-loader!./_posts', false, /.md$/);
const blogs = postsContext.keys().reduce((memo, fileName) => memo.set(fileName.match(/.\/([^.]+).*/)[1], postsContext(fileName)), new Map())

//const blogIndex = (blogs) => () => <ul>{[...blogs.keys()].map(path => <li key={path}><Link to={'/'+path}>{blogs.get(path).title || path}</Link></li>)}</ul>;
const blogWrapper = ({ __content }) => () => <div><Link to='/'>« Back to blog</Link><hr /><div className='markdown-body' dangerouslySetInnerHTML={{__html: __content}}></div></div>;

function Post(props) {
    var stub = props.stub;
    var match = stub.match(/.\/(\d+-\d+-\d+)-([^.]+).*/);
    var date = match[1];
    var short = match[2];
    var post = matter(posts(stub));
	  return (
       <article id={stub}>
            <time datetime={date}>{format(date, 'MMM DD, YYYY')}</time>
            <h1>{post.data.title}</h1>
            {remark().use(reactRenderer, { createElement: createElement}).processSync(post.content).contents}
        </article>
    );
}

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
    <Post stub={posts.keys()[0]} />
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
            <div>
            <Logo width="80" height="80" />
            <h1>{`Welcome to Inferno ${version}`}</h1>
            </div>
        );
    }
}

class Footer extends Component {
    render() {
        return (
                <div>
                <p>This is my footer</p>
                </div>
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

const headerDiv = document.getElementById('top');
const footerDiv = document.getElementById('foot');

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>

          <Link to="/2018-03-14-test">Testing</Link>
          {createPortal(<Header/>, headerDiv)}
          {createPortal(<Footer/>, footerDiv)}

          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>

            <Route path="/2018-03-14-test" component={blogWrapper(blogs.get("2018-03-14-test"))}/>

            <Route component={NotFound}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
