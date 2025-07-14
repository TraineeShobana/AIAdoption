class CartPage {
  constructor(page) {
    this.page = page;
    this.cartList = '.cart_list';
    this.cartItem = '.cart_item';
    this.cartTitle = '.title';
  }

  async assertOnCartPage() {
    await expect(this.page.locator(this.cartTitle)).toHaveText('Your Cart');
    await expect(this.page.locator(this.cartList)).toBeVisible();
  }

  async getCartItems() {
    return await this.page.locator(this.cartItem).allTextContents();
  }
}

module.exports = { CartPage }; 