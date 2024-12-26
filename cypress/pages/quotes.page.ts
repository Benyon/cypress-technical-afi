import BasePage from '../lib/BasePage';

class QuotesPage extends BasePage {
  private ANIMAL_RADIO_BUTTONS = 'app-radio-button[name="riskType"] span'
  private CONTINUE_BUTTON = '[data-test="btn-continue"] > [data-test="btn-app-button"]';
  private ANIMAL_NAME_FIELD = '[data-test="input-riskName"]';
  private ACCEPT_PRE_EXISTING_CONDITONS_BUTTON = '[data-test="label-existingConditionsNotCovered-true"]';
  private DECLINE_PRE_EXISTING_CONDITIONS_BUTTON = '[data-test="label-existingConditionsNotCovered-false"]';
  private VISIT_OUR_WEBSITE_BUTTON = '[data-test="no-cover-available-single-risk-button"]';

  /**
   * Visits the quotes base page.
   * @returns this - Returns the page object instance for chaining.
   */
  visit(): this {
    cy.log('Visiting page: Quotes');
    const url = new URL(Cypress.config('baseUrl'));
    url.hostname = url.hostname.replace('www', 'quote');
    url.pathname = '/pet/risk-type';
    cy.visit(url.toString(), { onBeforeLoad: (win) => { win.sessionStorage.clear()} });
    return this;
  }

  /**
   * Clicks the continue button if it is visible, do nothing if not.
   * @returns this - Returns the page object instance for chaining.
   */
  clickContinueIfShown(): this {
    cy.ifVisible('app-session-timed-out-layout button', ($element) => {
      cy.wrap($element).click();
    });
    return this;
  }

  /**
   * Selects an animal radio button and verifies it is checked.
   * @param animal - The animal type to select (e.g. "Dog", "Cat")
   * @returns this - Returns the page object instance for chaining.
   */
  selectAnimal(animal: string) {
    cy.log(`Selecting animal: ${animal}`);
    cy.get(this.ANIMAL_RADIO_BUTTONS)
      .contains(animal)
      .click()
      .parentsUntil('[data-test^="label-riskType"]')
      .get('input')
      .should('be.checked');
    return this;
  }

  /**
   * Enters and validates the animal name in the input field.
   * @param animalName - The name of the animal to enter
   * @returns this - Returns the page object instance for chaining.
   */
  enterAnimalName(animalName: string) {
    cy.log('Entering animal name');
    cy.get(this.ANIMAL_NAME_FIELD)
      .type(animalName)
      .blur()
      .parent()
      .should('have.class', 'valid')
    return this;
  }
  
  /**
    * Selects whether to accept or decline pre-existing conditions and verifies the selection.
    * @param option - Either 'Accept' or 'Decline' for pre-existing conditions
    * @returns this - Returns the page object instance for chaining.
    */
  selectExistingConditions(option: 'Accept' | 'Decline') {
    const optionToElement: Record<typeof option, string> = {
      Accept: this.ACCEPT_PRE_EXISTING_CONDITONS_BUTTON,
      Decline: this.DECLINE_PRE_EXISTING_CONDITIONS_BUTTON
    };
    cy.get(optionToElement[option])
      .click()
      .get('input')
      .should('be.checked');
    return this;
  }

  /**
   * Clicks the continue button to proceed to the next stage.
   * @returns this - Returns the page object instance for chaining.
   */
  continueToNextStage() {
    cy.log('Continuing to next stage.');
    cy.get(this.CONTINUE_BUTTON)
      .should('not.be.disabled')
      .click();
    return this;
  }

  /**
   * Clicks the visit our website button that changes when selecting 'I do not accept, I need cover for pre-existing conditions'.
   * @returns void - The user would not be on the quotes page after clicking this, start a new page object chain.
   */
  clickVisitOurWebsite() {
    cy.log('Continue back to the base page by the continue button.')
    cy.get(this.VISIT_OUR_WEBSITE_BUTTON)
      .should('not.be.disabled')
      .click();
  }
}

export const quotesPage = new QuotesPage();