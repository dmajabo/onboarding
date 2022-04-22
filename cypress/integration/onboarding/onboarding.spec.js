/* eslint-disable no-undef */
import cleardown from '../../cleardown'
import onboardingAccount from '../../common/onboarding-account'
import {createUserAndLogin, login} from '../../common'

describe('onboarding', () => {

    before(() => {
        cy.clearCookies();

        const quick = false;

        if (quick) {
            login();
        } else {
            cy.exec('node cypress/cleardown.js')
            createUserAndLogin();
        }

    });

    after(() => {
        //return cleardown();
    });

    it('should complete onboarding', () => {

        cy.get('#testAgreeOnboarding').click();

        onboardingAccount.fillInValidAddress();

        //Account
        cy.get('#businessType').type('Man{enter}');
        cy.get('#buildingType').type('Sing{enter}');
        cy.get('#buildingSiteAttributes').type('Nea{enter}');
        cy.get('#testOnboardingFormsNext').click();

        //tenancy
        cy.get('#numberOfTenants').type('1');
        cy.get('#testOnboardingFormsNext').click();

        //occupants
        cy.get('#occupants').type('1');
        cy.get('#testOnboardingFormsNext').click();

        //meter
        cy.get('#supplier').type('Day{enter}') //pick one with only one match
        cy.get('#ownerType').type('Indiv{enter}');
        cy.get('#testOnboardingFormsNext').click();

        //supply points and meters
        cy.get('#testEAN').type('12345');
        cy.get('#testDescription').type('TEST');
        cy.get('#testHeadMeter').type('123');
        cy.get('#testMaxKWH').type('1234');
        cy.get('#testHistoricalMax').type('5678');
        cy.get('#testAddSupplyPoint').click();

        cy.get('#testMeterTable').should('contain.text', "TEST")
        cy.get('#testMeterTable').should('contain.text', "12345")

        cy.get('#testMeterTable .testExpandMeterTable').click();

        cy.get('#testMeterNumberInput').type('123Meter');
        cy.get('#testMeterDescriptionInput').type('123Description');
        cy.get('#testAddMeter').click();

        cy.get('#testMeterTable').should('contain.text', "123Meter")
        cy.get('#testMeterTable').should('contain.text', "123Description")

        cy.get('#testOnboardingFormsNext').click();

        //forward looking

        cy.get('#consumptionTrend').type('Up{enter}');
        cy.get('#electrification').type('Yes{enter}');

        cy.get('#testOnboardingFormsNext').click();

        //assets
        cy.get('#testAssetType').type('Solar Plant{enter}');

        cy.get('.MuiButton-root').contains('Add').click();

        cy.get('#selectMeter').type('123Description{downarrow}{enter}');

        //add solar plant
        cy.get('#name').type('TESTSOLARPLANT');
        cy.get('#number').type('12');
        cy.get('#capacity').type('1000');
        cy.get('.addAsset').click();

        //
    })

});
