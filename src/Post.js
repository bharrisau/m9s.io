import { createElement } from 'inferno-create-element';
import 'highlight.js/styles/default.css';
import format from 'date-fns/format';

const posts = require.context('!./post-loader!./_posts', false, /.md$/);

const styles = {
    title: 'f2 lh-title',
    date: 'f6',
    p: 'f5 lh-copy',
};

function h(tag, attr, children) {
    var style = styles[tag];

    if (style) {
        attr.className = style;
    }

    console.log(tag, attr, children);
    return createElement(tag, attr, children);
}

function render(nodes, short) {
    function e(n) { return Array.isArray(n) ? h(n[0], n[1], n.length < 3 ? undefined : n[2].map(e)) : n; }

    if (short) {
        nodes = nodes.slice(0, 6);
    }

    return nodes.map(e);
}

function Post({ stub, short }) {
    var post = posts(stub);
    var header = post.header;
    var stubMatch = stub.match(/.\/((\d+-\d+-\d+)-[^.]+).*/);

    var id = stubMatch[1];
    var date = header.date || stubMatch[2];

    return (
            <article id={id}>
            <time class={styles.date} datetime={date}>{format(date, 'MMM DD, YYYY')}</time>
            <h1 class={styles.title}>{header.title || 'Untitled'}</h1>
            {render(post.content, short)}
        </article>
    );
    return render(posts(stub), short);
}

export default Post;
