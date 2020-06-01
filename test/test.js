const { convertMarkdownToArticle } = require('../src/');
const path = require('path');

convertMarkdownToArticle(path.join(__dirname, './test.md'));