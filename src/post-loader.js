const stringify = require('rehype-stringify');
const remark = require('remark');
const highlight = require('remark-highlight.js');
const frontmatter = require('remark-frontmatter');
const toHAST = require('mdast-util-to-hast');
const cleanRaw = require('hast-util-raw');
const yaml = require('js-yaml');
const toH = require('hast-to-hyperscript');

const styles = {
    title: 'f2 lh-title',
    date: 'f6',
    p: 'f5 lh-copy',
};

function lazy() {
    this.Compiler = compile;

    function h(tag, attr, child) {
        return Array.prototype.slice.call(arguments);
    }

    function compile(node) {
        var yamlNode = node.children.find(c => c.type === 'yaml') || {};
        var header = yaml.safeLoad(yamlNode.value, 'utf8') || {};

        var asHAST = toHAST(node, { allowDangerousHTML: true });
        var cleaned = cleanRaw(asHAST);
        return { header: header, content: toH(h, cleaned)};
    }
}

module.exports = function postLoader(source) {
    this.value = source;
    // this.resourcePath;

    const post = remark()
        .use(highlight)
        .use(frontmatter, ['yaml'])
        .use(lazy)
        .processSync(source).contents;

    const header = JSON.stringify(post.header);
    const content = JSON.stringify(post.content);

    const val = {
        header: post.header,
        content: function(h) {
            function e(n) { return Array.isArray(n) ? h(n[0], n[1], n.length < 3 ? undefined : n[2].map(e)) : n; }
            return e(post.content);
        }
    };

    const json = JSON.stringify(val)
          .replace(/\u2028/g, '\\u2028')
          .replace(/\u2029/g, '\\u2029');

    return `module.exports = { header: ${header}, content: function(h) { function e(n) { return Array.isArray(n) ? h(n[0], n[1], n.length < 3 ? undefined : n[2].map(e)) : n; }; return e(${content})}}`;
};
