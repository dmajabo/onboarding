const SUPER_ADMIN_USER       = "mogmog@gmail.com"
const SUPER_ADMIN_PASSWORD   = "Password123$"

const TEST_ADMIN            = 'mogmog+admin@gmail.com';
const TEST_USERNAME         = 'mogmog+test@gmail.com';
const TESTUSER_PASSWORD     = "Password123$"

const login = (username) => {
    cy.visit('/login');
    cy.wait(1500);
   // cy.get('#getStarted').click();

    cy.get('#username').type(username);
    cy.get('#password').type(SUPER_ADMIN_PASSWORD);

    cy.get('#login').click();

    cy.wait(1000);
}

describe('account creation', () => {

    before(() => {
         cy.clearCookies();
         cy.exec('node cypress/cleardown.js')
    });

    // after(() => {
    //     cy.clearCookies();
    //     return cleardown();
    // });

    it('should login superadmin', () => {
        login(SUPER_ADMIN_USER);
        cy.url().should('include', '/admin/accounts')
    })

    it('should create a new account', () => {

        cy.get('.test-AccountCard').should('have.length', 0)

        cy.get('#addAccount').click();

        cy.get('.test-AccountCard').should('have.length', 1)
    })

    it('should create a second account', () => {

        cy.get('.test-AccountCard').should('have.length', 1)

        cy.get('#addAccount').click();

        cy.get('.test-AccountCard').should('have.length', 2)
    })

    it('should delete the second account', () => {

        cy.get('.test-AccountCard').eq(1).get('#deleteAccount').click();

        cy.get('.test-AccountCard').should('have.length', 1)
    })

    it('should rename the account', () => {
        const card= cy.get('.test-AccountCard').eq(0)

        card.find('[contenteditable]').type('TEST').blur();

        //go to another page and back to force reload
         cy.get('#testLinkAudit').click();
         cy.get('#testLinkAdministration').click();

         cy.get('.test-AccountCard').eq(0)
           .find('[contenteditable]')
           .should('have.text', 'New AccountTEST')

    })

    it('should create a new admin user', () => {
        cy.get('.test-AccountCard').eq(0)
        cy.get('#testAccountUserShowDialog').click();

        cy.get('#createUser').click();

        cy.get('input[placeholder="Email"]').type(TEST_ADMIN);

        cy.get('input[placeholder="First Name"]').type('TEST');
        cy.get('input[placeholder="Family Name"]').type('SURNAME');
        cy.get('input[placeholder="Phone Number"]').type('00123456789');

         cy.get('#testAdminCheckbox').click();

         cy.get('#testAddUserMutation').click();

         cy.get('#testUserTable').should('contain.text', TEST_ADMIN)

        cy.get('#testCloseAddDialog').click();

    })

    it('should create a new user', () => {
        cy.get('.test-AccountCard').eq(0)
        cy.get('#testAccountUserShowDialog').click();

        cy.get('#createUser').click();

        cy.get('input[placeholder="Email"]').type(TEST_USERNAME);

        cy.get('input[placeholder="First Name"]').type('TEST');
        cy.get('input[placeholder="Family Name"]').type('SURNAME');
        cy.get('input[placeholder="Phone Number"]').type('00123456789');

        cy.get('#testAddUserMutation').click();
        //
        cy.get('#testUserTable').should('contain.text', TEST_USERNAME)

    })

    it('should login account admin', () => {
        login(TEST_ADMIN);
        cy.url().should('include', '/login')

        cy.get('input[placeholder="Enter your password here"]').type(TESTUSER_PASSWORD);

        cy.get('#testChangePassword').click();

        cy.url().should('include', '/terms')

        cy.get('h3').should('contain.text', 'Account Terms and Conditions')

        cy.get('#testAgreeAccountTerms').click();

        cy.get('h3').should('contain.text', 'User Terms and Conditions')

        cy.get('#testAgreeUserTerms').click();

        cy.get('#testAgreeOnboarding').click();

    })

    it('should login account user', () => {

        login(TEST_USERNAME);

        cy.url().should('include', '/login')

        cy.get('input[placeholder="Enter your password here"]').type(TESTUSER_PASSWORD);

        cy.get('#testChangePassword').click();

        cy.url().should('include', '/terms')

        cy.get('h3').should('contain.text', 'User Terms and Conditions')

        //should redirect to /terms if they haven't clicked the terms accept
        cy.visit('/dashboard');
        cy.location('pathname').should('eq', '/terms')

        cy.get('#testAgreeUserTerms').click();
        //now it should go to dashboard
        cy.location('pathname').should('eq', '/dashboard')

    })

    it('should create new devices', () => {
        login(SUPER_ADMIN_USER);
        cy.get('#addAccount').click();
        cy.get('#testAccountDevices').click();

        cy.get('#deviceId').type('TESTDEVICEID');
        cy.get('#deviceName').type('TESTDEVICENAME');
        cy.get('#deviceAssetType').type('Sol{enter}');

        cy.get('#deviceType').type('Met{enter}');
        cy.get('#deviceAdd').click();

        cy.get('#testDevicesTable').should('contain.text', 'TESTDEVICEID');
        cy.get('#testDevicesTable').should('contain.text', 'TESTDEVICENAME');
    })

    //depends on previous test
    it('should delete a device', () => {

        cy.get('#testDevicesTable').get('.testDelete').eq(0).click();

        cy.get('#testDevicesTable').should('not.contain.text', 'TESTDEVICEID');
    })

});
