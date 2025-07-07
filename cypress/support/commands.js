


Cypress.Commands.add('logarUserAdministrador', userAdmin => {
    cy.visit('http://localhost:5173/public')
    cy.get('.user-modal').click()
    cy.contains('Fazer Login').click()
    cy.get('#email').type(userAdmin.email, {delay: 300})
    cy.get('#password').type(userAdmin.password, {delay: 300})
    cy.get('.button--save').click();
    cy.get('.user-modal').click()
    cy.contains("Dashboard").click()
  })
 /*
Cypress.Commands.add('cadastrarMentorCompleto',  () => {
    cy.visit('http://localhost:5173/public')
    cy.get('.user-modal').click()
    cy.contains('Criar Conta').click()
    cy.get('#name').type(userPadrao.name)
    cy.get('#email').type(userPadrao.email)
    cy.get('#password').type(userPadrao.password)
    cy.get('#description').type(userPadrao.description)

    
    cy.get('#cityId').select(4369);
    cy.get('#specialtyTypeId').select(1);
    cy.get('#specialtyId').select(1);
  })



  Cypress.Commands.add('preencherInformacoesCadastroMentor',  () => {
    cy.visit('http://localhost:5173/public')
    cy.get('.user-modal').click()
    cy.contains('Criar Conta').click()
    cy.get('#name').type(userPadrao.name)
    cy.get('#email').type(userPadrao.email)
    cy.get('#password').type(userPadrao.password)
    cy.get('#description').type(userPadrao.description)

    
    cy.get('#cityId').select(1);
    cy.get('#specialtyTypeId').select(1);
    cy.get('#specialtyId').select(1);







})
*/
 