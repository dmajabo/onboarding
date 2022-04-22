const fillInValidAddress = () => {
    cy.get('.testEditAddress').eq(0).click();

    cy.get('#line1').type("TEST Address Line 1");
    cy.get('#line2').type("TEST Address Line 2");
    cy.get('#line3').type("TEST Address Line 3");
    cy.get('#city').type("TEST City");
    cy.get('#postcode').type("TEST123");

    //https://stackoverflow.com/questions/55046835/select-react-select-dropdown-list-option-using-cypress
    cy.get('#country').type('Neth{enter}');

    cy.get('#testSaveAddress').click();
}

export default {fillInValidAddress}
