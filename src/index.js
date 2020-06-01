const MarkdownIt = require('markdown-it');
const MarkdownItCodepen = require('markdown-it-codepen');
const githubMarkdownCss = require('github-markdown-css');
const fs = require('fs');

export function convertMarkdownToArticle(uri) {

    const md = new MarkdownIt();

    md.use(codepenPlugin);

    const file = fs.readFileSync('./test/test.md');

    fs.writeFileSync('./test/test.html', md.render(file.toString()));

}
