/// <reference types="cypress" />
import {
     faker
} from "@faker-js/faker";
import contrato from '../contracts/usuario.contract'

describe("Testes da Funcionalidade Usuários", () => {
     it("Deve validar contrato de usuários", () => {
          cy.request('usuarios').then(response => {
               return contrato.validateAsync(response.body)
          })
     });

     it("Deve listar usuários cadastrados", () => {
          cy.request({
               method: "GET",
               url: "/usuarios",
          }).then((response) => {
               expect(response.status).to.equal(200);
          });
     });

     it("Deve cadastrar um usuário com sucesso", () => {
          const nomeFaker = faker.name.firstName();
          const emailFaker = faker.internet.email();
          const senhaFaker = faker.internet.password();

          cy.request({
               method: "POST",
               url: "/usuarios",
               body: {
                    nome: nomeFaker,
                    email: emailFaker,
                    password: senhaFaker,
                    administrador: "false",
               },
          }).then((response) => {
               expect(response.body.message).to.equal("Cadastro realizado com sucesso");
          });
     });

     it("Deve validar um usuário com email inválido", () => {
          const nomeFaker = faker.name.firstName();
          // const emailFaker = "joaquim@qa.com"
          const senhaFaker = faker.internet.password();

          cy.request({
               method: "POST",
               url: "/usuarios",
               body: {
                    nome: nomeFaker,
                    email: "joaquim@qa.com",
                    password: senhaFaker,
                    administrador: "false",
               },
               failOnStatusCode: false,
          }).then((response) => {
               expect(response.status).to.equal(400);
               expect(response.body.message).to.equal("Este email já está sendo usado");
          });
     });

     it("Deve editar um usuário previamente cadastrado", () => {
          const nome = faker.name.firstName();
          const email = faker.internet.email();
          const senha = faker.internet.password();
          const adm = "false";
          cy.cadastrarUsuario(nome, email, senha, adm).then((response) => {
               let id = response.body._id;

               cy.request({
                    method: "PUT",
                    url: `/usuarios/${id}`,
                    body: {
                         nome: faker.name.firstName(),
                         email: faker.internet.email(),
                         password: "teste 2",
                         administrador: "false",
                    },
               }).then((response) => {
                    expect(response.body.message).to.equal("Registro alterado com sucesso");
               });
          });
     });

     it("Deve deletar um usuário previamente cadastrado", () => {
          const nome = faker.name.firstName();
          const email = faker.internet.email();
          const senha = faker.internet.password();
          const adm = "false";
          cy.cadastrarUsuario(nome, email, senha, adm).then((response) => {
               let id = response.body._id;
               cy.request({
                    method: "DELETE",
                    url: `/usuarios/${id}`,
               }).then(response => {
                    expect(response.status).to.equal(200);
               });
          });
     });
});