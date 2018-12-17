/// <reference types="Cypress" />

context('Homepage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/en');
  });
  
  describe('header', () => {
    it('has the right title', () => {
      cy.get('#site-header')
        .should('contain', 'UniJobs.it');
    });
  });
  
  describe('navigation bar', () => {
    it('has a homepage link', () => {
      cy.get('.main-navbar')
        .find('.navbar-nav:nth-child(1) a[href="/en"]');
    });

    it('has an about link', () => {
      cy.get('.main-navbar')
        .find('.navbar-nav:nth-child(1) a[href="/en/about"]');
      cy.get('.main-navbar')
        .find('.navbar-nav:nth-child(1) a[href="/en/about"]').click();
    });

    it('loads the About Us page', () => {
      cy.contains('About Us').click();
      cy.url().should('contain', '/about');
    });

    it('has a language selector', () => {
      cy.get('.main-navbar')
        .find('.language-selector');
    });

    it('changes the url when a different language is clicked', () => {
      cy.get('.main-navbar').as('mainNavbar')
        .find('.language-selector > a.dropdown-toggle')
        .click();
      cy.get('@mainNavbar').find('.language-selector')
        .find('[href="/it"]').as('linko')
        .click();
      cy.get('@linko').click({force:true});
      // FIXME: This test does not actually work as expected
      cy.url().should('contain', '/it');
    });
  });
});