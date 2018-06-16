import { createElement } from 'inferno-create-element';
import 'highlight.js/styles/default.css';
//import format from 'date-fns/format';

const posts = require.context('!./post-loader!./_posts', false, /.md$/);

//
//const styles = {
//    title: 'f2 lh-title',
//    date: 'f6',
//    p: 'f5 lh-copy',
//};
//
//function toPost({ stub, short }) {
//    this.Compiler = compile;
//
//    function toVNode(node) {
//        var style = styles[node.tagName];
//
//        if (style) {
//            node.properties.class = style;
//        }
//
//        return toH(createElement, node);
//    }
//
//    function compile(node) {
//        var match = stub.match(/.\/(\d+-\d+-\d+)-([^.]+).*/);
//        var date = match[1];
//        var tag = match[2];
//
//        var yamlNode = node.children.find(c => c.type === 'yaml') || {};
//        var header = yaml.safeLoad(yamlNode.value, 'utf8') || {};
//
//        var content = node
//            .children
//            .filter(n => n.type !== 'text')
//            .slice(0, short ? 4 : undefined)
//            .map(toVNode);
//
//	      return (
//                <article id={date + '-' + tag}>
//                <time class={styles.date} datetime={date}>{format(date, 'MMM DD, YYYY')}</time>
//                <h1 class={styles.title}>{header.title || 'Untitled'}</h1>
//                {content}
//            </article>
//        );
//    }
//}

function Post({ stub, short }) {
    return posts(stub).content(createElement);
}

export default Post;
