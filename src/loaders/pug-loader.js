const pug = require('pug');
const loaderUtils = require("loader-utils");

module.exports = function(source) {
  const options = Object.assign({
    compileDebug: this.debug || false,
    doctype: 'html',
    filename: this.resourcePath,
  }, loaderUtils.getOptions(this));


  const template = pug.compile(source, options);

  const html = template(options.data);

  return html;
};
