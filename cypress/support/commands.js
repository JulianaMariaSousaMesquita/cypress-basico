Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Juliana')
        cy.get('#lastName').type('Mesquita')
        cy.get('#email').type('juliana@example.com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
})