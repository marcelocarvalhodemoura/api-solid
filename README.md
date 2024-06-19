# App

Gympass style app

## Requisitos Funcionais

- [X] O usuário deve ser capaz de se cadastrar;
- [X] O usuário deve ser capaz de logar;
- [X] Deve ser capaz de obter o perfil do usuário logado;
- [X] Deve ser capaz de obter o número de check-ins realizado pelo usuário logado;
- [X] O usuário deve ser capaz de obter seu histórico de check-ins;
- [X] O usuário deve ser capaz de buscar academias mais próximas (até 10 km);
- [X] O usuário deve ser capaz de buscar uma academia por nome;
- [X] O usuário deve ser capaz de realizar check-in em uma academia;
- [X] Deve ser possível validar o check-in do usuário;
- [X] Deve ser possível cadastrar uma academia;

## Regra de Negócio ( São os IFs do sistema )

- [X] O usuário não pode se cadastrar com o email duplicado;
- [X] O usuário não pode fazer o check-in em mais de uma academia no mesmo dia;
- [X] O usuário não pode fazer o check-in em uma academia a menos que esteja próximo (100m) dela;
- [X] O check-in só poder ser validade até 20 minutos após a criação;
- [X] O check-in só pode ser validade por administradores;
- [X] A academia só pode ser cadastrada por administradores;


## Requisito não funcionais

- [X] O sistema deve ser desenvolvido em Node.js;
- [X] A senha do usuário precisa ser criptografada;
- [X] O sistema deve ser desenvolvido em inglês;
- [X] Os dados da aplicação deverão ser persistidos em um banco de dados relacional, PostgreSQL;
- [X] Todas listagens de dados precisam ser paginadas com 20 item por página;
- [X] O usuário deverá ser identificado por um token JWT;