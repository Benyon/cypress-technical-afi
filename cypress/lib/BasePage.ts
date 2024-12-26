abstract class BasePage {
  /**
   * Navigate directly to this page.
   */
  abstract visit(endpoint?: string): this;
  
  /**
   * Click accept on any cookie popup shown.
   */
  acceptCookies(): this {
    cy.get('#onetrust-accept-btn-handler', { timeout: 15_000 }).click();
    return this;
  }
}

export default BasePage;