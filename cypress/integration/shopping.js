/// <reference types="cypress" />


describe("Test globale funzionamento", () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('la categoria smartphone esiste', () => {
        cy.findByTestId('smartphone').should('exist')
    });

    it('aggiungo un prodotto al carrello e verifico che il conto sia corretto, poi lo cancello', () => {
        cy.findByTestId('smartphone').should('exist');
        cy.findByTestId('smartphone').click();
        cy.url().should('contain', 'shop/smartphone');
        cy.findByTestId('prodotto-1').should('exist');
        cy.findByTestId('item-count').should('contain', '0');
        cy.findByTestId('pulsante-1').click();
        cy.findByTestId('item-count').should('contain', '1');
        cy.visit('/checkout');
        cy.findByTestId('svuota').click();
        cy.findByTestId('item-count').should('contain', '0');
    });

    it('controllo il funzionamento del carrello da loggato', () => {
        cy.visit('/login');
        cy.get('input[name=email]').first().should('exist').type('ok@ok.it');
        cy.get('input[name=password]').first().should('exist').type('123456');
        cy.findByTestId('login-button').should('exist').click();
        cy.findByTestId('smartphone').should('exist');
        cy.findByTestId('smartphone').click();
        cy.url().should('contain', 'shop/smartphone');
        cy.findByTestId('prodotto-1').should('exist');
        cy.findByTestId('item-count').should('contain', '0');
        cy.findByTestId('pulsante-1').click();
        cy.findByTestId('item-count').should('contain', '1');
        cy.visit('/checkout');
        cy.findByTestId('svuota').click();
        cy.findByTestId('item-count').should('contain', '0');
        cy.findByText(/logout/i).click();
        cy.findByText(/logout/i).should('not.exist');
        cy.findByText(/login/i).should('exist');
    })

})