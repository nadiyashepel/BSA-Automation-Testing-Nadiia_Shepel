const { BaseElement } = require('./base.element');

class Span extends BaseElement {
  constructor(selector, index) {
    super(selector, index);
  }

  async getTextByName(text) {
    let element = await $(this.selector.replace('NAME_TO_REPLACE', text));
    await this.waitForVisible(element);
    return await element.getText();
  }

}

module.exports = { Span };
