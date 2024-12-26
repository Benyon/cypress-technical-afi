declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to execute callback if element is visible
     * @param selector - The selector to check for visibility
     * @param callback - The callback to execute if element is visible
     * @example
     * cy.ifVisible('.element', () => {
     *   // do something
     * })
     */
    ifVisible(
      selector: string,
      callback: ($element: JQuery<HTMLElement>) => void
    ): Chainable<Element>
  }}