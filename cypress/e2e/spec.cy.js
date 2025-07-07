
describe('Usuário Admin', () => {

 /* it('Cadastrar Mentor', () => {
    cy.visit('http://localhost:5173/public')
    cy.fixture('userPadrao').then((userPadrao) => {
    cy.cadastrarMentorCompleto(userPadrao)
    cy.get('#cityId').select("4369");
    })
  })
*/
  it('Logar Administrador', () => {
    cy.visit('http://localhost:5173/public')
    cy.fixture('userAdmin').then((userAdmin) => {
    cy.logarUserAdministrador(userAdmin);
    })
  })


})