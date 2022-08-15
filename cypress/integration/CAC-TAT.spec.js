/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {  
    beforeEach(function (){
        cy.visit('./src/index.html')
    })  

    it('verifica o título da aplicação', function() {        
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
        cy.get('#firstName').type('Juliana')
        cy.get('#lastName').type('Mesquita')
        cy.get('#email').type('juliana@example.com')
        cy.get('#open-text-area').type(longText, {delay : 0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Juliana')
        cy.get('#lastName').type('Mesquita')
        cy.get('#email').type('juliana@exemplo,com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-númerico', function(){
        cy.get('#phone').type('LoremIpsumissimplydummytextoftheprintingandtypesetting').should('have.value','')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Juliana')
        cy.get('#lastName').type('Mesquita')
        cy.get('#email').type('juliana@exemplo.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Juliana').should('have.value', 'Juliana').clear().should('have.value', '')
        cy.get('#lastName').type('Mesquita').should('have.value', 'Mesquita').clear().should('have.value', '')
        cy.get('#email').type('juliana@exemplo.com').should('have.value', 'juliana@exemplo.com').clear().should('have.value', '')
        cy.get('#phone').type('21979931700').should('have.value','21979931700').clear().should('have.value', '')
    })

  })

