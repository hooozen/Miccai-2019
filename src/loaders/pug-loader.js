const pug = require('pug');
const loaderUtils = require("loader-utils");

module.exports = function(source) {
  this.cacheable(false);

  const options = Object.assign({
    compileDebug: this.debug || false,
    doctype: 'html',
    filename: this.resourcePath,
  }, loaderUtils.getOptions(this));


  const template = pug.compileClient(source, options);

  return `${template.toString()}; \nmodule.exports = function output() {return template(${JSON.stringify(options.data)})};`;
};
