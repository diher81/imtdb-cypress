/**
 *  MOVIES UI
 *
 *  These tests will verify that:
 *  - we can navigate to the IMTDb home page
 *  - all mandatory elements are present on the home page
 *  - we can navigate to the movie overview page
 *  - all mandatory elements are present on the movie overview page
 *  - All movie titles are displayed on this overview page
 *
 **/
describe('Movies UI', () => {

    it('Navigate to the IMTDb home page and check if all elements are present', () => {
        cy.visit('localhost');
        cy.get('h2').contains("Movies");
        cy.get('h3').contains("Coming soon:");
        cy.get('.logo').should('be.visible');
        cy.get('.header-menu').contains("Sign Up");
        cy.get('.header-menu').contains("Login");
    })

    it('Clicking the \'List all movies\'-button should list all movies', () => {
        cy.get('button').click();
        cy.get('h2').contains("All Movies");

        //For now, since this is a POC, the fixture file only contains 3 movie titles.
        cy.fixture('allMovieTitles.json').then((titles) => {
            for (let title in titles) {
                cy.get('.movies > ul').contains(titles[title]);
            }
        });
    })
})
