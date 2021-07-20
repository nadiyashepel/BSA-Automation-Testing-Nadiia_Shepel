const { BaseElement } = require('./base.element');

class Div extends BaseElement {
  constructor(selector, index) {
    super(selector, index);
  }
  
}

module.exports = { Div };
