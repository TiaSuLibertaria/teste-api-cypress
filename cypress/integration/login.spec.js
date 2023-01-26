import { faker } from '@faker-js/faker';

describe('Login', () => {
  it('Deve fazer login com sucesso', () => {
    const nome = faker.name.fullName();
    const email = faker.internet.email();
    const senha = faker.internet.password();
    const adm = 'false';
    cy.cadastrarUsuario(nome, email, senha, adm).then((response) => {
      cy.request({
        method: 'POST',
        url: '/login',
        body: {
          email: email,
          password: senha,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Login realizado com sucesso');
        cy.log(response.body.authorization);
      });
    });
  });
});
