// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/**
* Remove movie from mongo db
*
* Since there is no REST call to delete movies from the database, I'm
* making a connection to the MongoDb and delete the movie that was
* created in these automated test, using a Mongo query.
*/
Cypress.Commands.add("deleteMovieFromDb", () => {
    cy.task("db:queryDeleteFromVideoDb", {
        collectionName: "movies",
        options: {title: "Test Automation, The Movie"}
    });
})

