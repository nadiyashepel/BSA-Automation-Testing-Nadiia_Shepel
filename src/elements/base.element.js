class BaseElement {
  constructor(selector, index) {
    this.selector = selector;
    this.index = index;
  }

  async waitForVisible(element, timeout = 5000) {
    await element.waitForDisplayed({
      timeout,
      timeoutMsg: `Element isn't displayed. Selector: ${this.selector}`,
    });
  }

  async getText() {

    let element;
    if (this.index) {
      element = (await $$(this.selector))[this.index];
    } else {
      element = await $(this.selector);
    }
    await this.waitForVisible(element);
    return element.getText();

  }

}

module.exports = { BaseElement };
