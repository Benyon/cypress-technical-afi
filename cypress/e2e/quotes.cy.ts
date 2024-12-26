import { quotesPage } from 'cypress/pages/quotes.page'

describe('Quotes', () => {
  beforeEach(() => {
    quotesPage
      .visit()
      .acceptCookies()
      .clickContinueIfShown(); // Sometimes the previous session is cached, even in Cypress? Would need to be investigated.
  })

  it('Start quote journey for dog and complete initial details', () => {
    quotesPage
      .selectAnimal('Dog')
      .continueToNextStage()
      .enterAnimalName('Bruno')
      .continueToNextStage()
      .selectExistingConditions('Decline')
      .clickVisitOurWebsite();

    cy.log('When a user has declined pre-existing conditions, they are expected to be back at the home page.')
    cy.url().should('equal', Cypress.config('baseUrl'));
  });
});
