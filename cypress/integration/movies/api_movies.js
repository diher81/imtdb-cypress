/**
 *  MOVIES API
 *
 *  This test will verify that it is possible to add a new movie to the mongoDB
 *  using the REST endpoint.
 *  To clean up after the test is finished, the new movie will be deleted using a direct
 *  call to the database.
 *
 **/
describe('Movies API', () => {

    let newMovie;

    /**
     * Fetch new movie data from fixture file
     */
    before(function () {
        cy.fixture('newMovies').then(function (data) {
            newMovie = data;
        })
    })

    /**
     * This test will fail for now because the REST endpoint is not yet implemented.
     */
    it('test the REST endpoint to add a new movie to the list', () => {
        cy.request({
            url: newMovie.url,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                "imdb": newMovie.imdb,
                "title": newMovie.title,
                "type": newMovie.type,
                "description": newMovie.description,
                "year": newMovie.year
            },
            failOnStatusCode: false
        })
            .then((resp) => {
                expect(resp.status).to.eq(200)
                expect(resp.statusText).to.equal("Your movie query is correct")
            });
    })

    /**
     * the new movie will be deleted using a direct call to the database.
     */
    after(function () {
        cy.deleteMovieFromDb();
    })
})