import { Component } from 'inferno';
import { Link } from 'inferno-router';
import { createElement } from 'inferno-create-element';
import format from 'date-fns/format';
import Title from './Title';

const posts = require.context('!./post-loader!./_posts', false, /.md$/, 'lazy');

const styles = {
    title: 'max-w-md mx-auto text-4xl px-3 lh-title mb-5 text-black',
    h2: 'max-w-md mx-auto mb-4 px-3 text-grey-darkest',
    date: 'max-w-md mx-auto block text-sm mb-2 px-3 text-grey-dark hover:text-black font-bold trans uppercase',
    p: 'max-w-md mx-auto mb-4 px-3 leading-normal text-grey-darkest',
    pre: 'code-block whitespace-pre-wrap',
    //pre: 'mb-4 border-t border-b bg-grey-lightest',
    //code: 'max-w-md mx-auto block p-3',
    blockquote: 'max-w-md mx-auto mb-4 pl-2 pr-3 border-l-8 border-blue',
};

const codeStyles = {
    'hljs-addition':          'text-green-dark',
    'hljs-attr':              '',
    'hljs-attribute':         'font-bold',
    'hljs-built_in':          'text-green-dark',
    'hljs-builtin-name':      '',
    'hljs-bullet':            'text-green-dark',
    'hljs-class':             '',
    'hljs-code':              'text-green-dark',
    'hljs-comment':           'text-grey-dark',
    'hljs-deletion':          'text-red-dark',
    'hljs-doctag':            'font-bold',
    'hljs-emphasis':          'italic',
    'hljs-formula':           '',
    'hljs-function':          '',
    'hljs-keyword':           'font-bold',
    'hljs-link':              'text-pink-dark',
    'hljs-literal':           'text-green-light',
    'hljs-meta':              'text-teal-darkest',
    'hljs-meta-keyword':      'font-bold',
    'hljs-meta-string':       'text-teal',
    'hljs-name':              'font-bold',
    'hljs-number':            'text-red-dark',
    'hljs-params':            '',
    'hljs-quote':             'text-red-dark',
    'hljs-regexp':            'text-pink-dark',
    'hljs-section':           'text-red-dark font-bold',
    'hljs-selector-attr':     'text-pink-dark',
    'hljs-selector-class':    'text-red-dark',
    'hljs-selector-id':       'text-red-dark',
    'hljs-selector-pseudo':   'text-pink-dark',
    'hljs-selector-tag':      'font-bold',
    'hljs-string':            'text-red-dark',
    'hljs-strong':            'font-bold',
    'hljs-subst':             'text-grey-darkest',
    'hljs-symbol':            'text-pink-dark',
    'hljs-tag':               '',
    'hljs-template-tag':      'text-red-dark',
    'hljs-template-variable': 'text-pink-dark',
    'hljs-title':             'text-red-dark font-bold',
    'hljs-type':              'text-red-dark',
    'hljs-variable':          'text-pink-dark',
};

function h(tag, attr, children) {
    var style = (attr.className in codeStyles) ? codeStyles[attr.className] : styles[tag];

    if (style !== undefined) {
        attr.className = style;
    }

    return createElement(tag, attr, children);
}

function render(nodes, short) {
    function e(n) { return Array.isArray(n) ? h(n[0], n[1], n.length < 3 ? undefined : n[2].map(e)) : n; }

    if (short) {
        nodes = nodes.slice(0, Math.min(4, nodes.length));
    }

    return nodes.map(e);
}

class Post extends Component {
    static all = posts
        .keys()
        .map(v => v.slice(2, -3))
        .sort((a, b) => {
            var aDraft = a.startsWith('draft');
            var bDraft = b.startsWith('draft');

            if (aDraft ^ bDraft) {
                return aDraft ? -1 : 1;
            } else {
                return a.localeCompare(b);
            }
        });

    static recent = Post.all.slice(0, Math.min(5, Post.all.length));

    static preload(toLoad) {
        if (!Array.isArray(toLoad)) {
            toLoad = [toLoad];
        }

        return Promise.all(toLoad.map(post => posts(`./${post}.md`)));
    }

    _hasUnmounted = false;

    state = {
        post: false,
    };

    constructor(props) {
        super(props);

        this.props.stub = this.props.stub || this.props.match.params.stub;
    }

    componentDidMount() {
        var stub = this.props.stub;
        posts(`./${stub}.md`).then(post => {
            if (!this.hasUnmounted) {
                this.setState({ post: post });
            }
        });
    }

    componentWillUnmount() {
        this._hasUnmounted = true;
    }

    render({ stub, short }) {
        if (this.state.post) {
            var post = this.state.post;
            var header = post.header;
            var stubMatch = stub.match(/(\d+-\d+-\d+)-.+/) || [];

            var date = header.date || stubMatch[1] || Date.now();
            var title = header.title || 'Untitled';

            return (
                    <article id={stub}>
                    { short || <Title title={title} /> }
                    <time class={styles.date} datetime={date}>{format(date, 'MMMM DD, YYYY')}</time>
                    <h1 class={styles.title}><Link to={'/posts/' + stub} className="inherit no-underline">{title}</Link></h1>
                    {render(post.content, short)}
                </article>
            );
        } else {
            return (
                    <div><p>Loading</p></div>
            );
        }
    }
}

export default Post;
