const { JSDOM } = require('jsdom')

const { window } = new JSDOM('<div class="app"></div>', {
  url: 'http://localhost:3000',
})

global.window = window
global.document = window.document
global.createDocumentFragment = window.DocumentFragment

// .hbs files
require.extensions['.hbs'] = function (module) {
  module.exports = () => ''
}
