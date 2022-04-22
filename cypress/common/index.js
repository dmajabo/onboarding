let SUPER_ADMIN_USER       = "mogmog@gmail.com";
let SUPER_ADMIN_PASSWORD   = "Password123$";
let TEST_ADMIN            = 'mogmog+admin@gmail.com';
let TEST_USERNAME         = 'mogmog+test@gmail.com';
let TESTUSER_PASSWORD     = "Password123$";

const login = () => {
    cy.visit('http://localhost:3000');

    cy.get('#getStarted').click();
    cy.get('#username').type(TEST_ADMIN);
    cy.get('#password').type(SUPER_ADMIN_PASSWORD);
    cy.get('#login').click();

}
const createUserAndLogin = () => {
    cy.visit('http://localhost:3000');
    cy.wait(1000);
    cy.get('#getStarted', { timeout: 10000 }).click();

    cy.get('#username').type(SUPER_ADMIN_USER);
    cy.get('#password').type(SUPER_ADMIN_PASSWORD);

    cy.get('#login').click();

    cy.wait(2000);

    cy.get('#addAccount', { timeout: 10000 }).should('be.visible').click();
    cy.get('.test-AccountCard').eq(0);
    cy.get('#testAccountUserShowDialog').click();
    cy.get('#createUser').click();
    cy.get('input[placeholder="Email"]').type(TEST_ADMIN);
    cy.get('input[placeholder="First Name"]').type('TEST');
    cy.get('input[placeholder="Family Name"]').type('SURNAME');
    cy.get('input[placeholder="Phone Number"]').type('00123456789');
    cy.get('#testAdminCheckbox').click();
    cy.get('#testAddUserMutation').click();
    cy.get('#testCloseAddDialog').click();
    cy.get('#testUserMenu').click();
    cy.get('#testSignOut').click();

    //repalce with wait for
    cy.wait(2000);

    cy.visit('http://localhost:3000');

    cy.get('#getStarted', { timeout: 10000 }).click();
    cy.get('#username').type(TEST_ADMIN);
    cy.get('#password').type(SUPER_ADMIN_PASSWORD);
    cy.get('#login').click();

    cy.wait(1001);

    cy.get('input[placeholder="Enter your password here"]', { timeout: 10000 }).type(TESTUSER_PASSWORD);
    cy.get('#testChangePassword').click();
    cy.get('#testAgreeAccountTerms').click();
    cy.get('#testAgreeUserTerms').click();
   // cy.get('#testAgreeOnboarding').click();
}


export {
    createUserAndLogin,
    login,
    SUPER_ADMIN_USER,
    SUPER_ADMIN_PASSWORD,
    TEST_ADMIN,
    TEST_USERNAME,
    TESTUSER_PASSWORD
};
