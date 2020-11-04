/**
 *  USERS API
 *
 *  This test will verify that it is possible to obtain a user token
 *  and to use it in other calls.
 *
 **/

const USER = Cypress.env('username');
const PASSWORD = Cypress.env('password')
const ID = Cypress.env('id');

let token;

/**
 * In this before step, I send a POST request to fetch an authorization token
 * for a user with regular user rights. With this token, other REST endpoints
 * from the api can be addressed.
 */
before(function fetchToken() {
    cy.request(
        'POST',
        'v1/proxy/tokens/',
        {
            id: ID,
            username: USER,
            password: PASSWORD,
        })
        .its('body')
        .then((res) => {
            token = res.access_token;
        })
})

/**
 * The main purpose of this simple test is to verify that the obtained Bearer token
 * in the before method can be used to send requests to endpoints that require
 * a token obtained by a user with normal user rights, no admin rights.
 */
describe('User API', () => {
    it('Send a GET request to retrieve a users userId', () => {
        cy.request({
            url: 'v1/proxy/users/'.concat(USER),
            auth: {
                bearer: token,
            },
        })
            .then((resp) => {
                expect(resp.status).to.eq(200);
                expect(resp.body.username).include(USER);
                expect(resp.body.role).include('user');
                expect(resp.body.id).equal(ID);
                expect(resp.body.active).to.be.true;
            })
    })
})