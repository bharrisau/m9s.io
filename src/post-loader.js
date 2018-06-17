const remark = require('remark');
const highlight = require('remark-highlight.js');
const frontmatter = require('remark-frontmatter');
const toHAST = require('mdast-util-to-hast');
const cleanRaw = require('hast-util-raw');
const yaml = require('js-yaml');
const toH = require('hast-to-hyperscript');

function lazy() {
    this.Compiler = compile;

    function h() {
        return Array.prototype.slice.call(arguments);
    }

    function compile(node) {
        var yamlNode = node.children.find(c => c.type === 'yaml') || {};
        var header = yaml.safeLoad(yamlNode.value, 'utf8') || {};

        var asHAST = toHAST(node, { allowDangerousHTML: true });
        var cleaned = cleanRaw(asHAST);

        return { header: header, content: toH(h, cleaned)[2]};
    }
}

module.exports = function postLoader(source) {
    this.value = source;

    const post = remark()
        .use(highlight)
        .use(frontmatter, ['yaml'])
        .use(lazy)
        .processSync(source).contents;

    const json = JSON.stringify(post)
          .replace(/\u2028/g, '\\u2028')
          .replace(/\u2029/g, '\\u2029');

    return `module.exports = ${json};`;
};
