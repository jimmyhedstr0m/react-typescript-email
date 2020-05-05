var sass = require('node-sass');
var fs = require('fs');

const out = './src/css/main.css';

sass.render({
  file: './src/css/scss/main.scss',
  outputStyle: 'expanded',
  outFile: out,
  sourceMap: false,
}, function (error, result) {
  if (!error) {
    fs.writeFile(out, result.css, function (err) {
      if (err) {
        console.error('failed to write to css file', err);
      }
    });
  }
});
