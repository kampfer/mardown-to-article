const MarkdownIt = require('markdown-it');
const markdownItCodepen = require('markdown-it-codepen');
const fs = require('fs');
const path = require('path');
const hljs = require('highlight.js');

const nodeModulesPath = path.join(__dirname, '../node_modules');

const githubMarkdownCss = fs.readFileSync(
    path.join(nodeModulesPath, 'github-markdown-css/github-markdown.css')
);

const highlightCss = fs.readFileSync(
    path.join(nodeModulesPath, 'highlight.js/styles/github.css')
);

function generateHtml(title, article) {

    return `
        <!DOCTYPE html>
        <html lang="zh-cn">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>${title}</title>
            <style>
                .markdown-body {
                    box-sizing: border-box;
                    min-width: 200px;
                    max-width: 980px;
                    margin: 0 auto;
                    padding: 45px;
                }
        
                @media (max-width: 767px) {
                    .markdown-body {
                        padding: 15px;
                    }
                }

                .cp_embed_wrapper {
                    margin-bottom: 16px;
                }
            </style>
            <style>${githubMarkdownCss}</style>
            <style>${highlightCss}</style>
        </head>
        <body>
            <article class="article markdown-body">${article}</article>
        </body>
        </html>
    `;

}

const md = new MarkdownIt({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (__) {}
      }
  
      return ''; // use external default escaping
    }
  });
md.use(markdownItCodepen);

module.exports.convertMarkdownToArticle = function (uri) {

    let name = path.basename(uri, '.md'),
        dirname = path.dirname(uri);

    const file = fs.readFileSync(uri);

    let html = generateHtml(name, md.render(file.toString()));

    fs.writeFileSync(path.join(dirname, name + '.html'), html);

}
