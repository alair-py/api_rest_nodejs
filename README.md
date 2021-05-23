# API REST NODE.JS
API REST em Node.js utilizando Sequelize com MySQL,
consumo da API com Axios e tokens de acesso com JWT.
Várias outras funcionalidades, autenticação de usuários, encriptação de senhas com hash (bcryptjs) e outros mais.


## EndPoits de CRUD
### GET /games
Retorna todos jogos armazenados no banco de dados.
#### Parâmetros
Não recebe parâmetros.
#### Respostas
200 - OK! Exemplo:
```
 {
    "jogos": [
        {
            "id": 1,
            "titulo": "The Sims 10",
            "ano": 2022,
            "preco": 75,
            "createdAt": "2021-05-17T18:14:25.000Z",
            "updatedAt": "2021-05-22T12:08:52.000Z"
        }
     ]
  }
```

### GET /game
Retorna jogo especifico baseado no ID passado.
#### Parâmetros
Necessário parâmetro ID.
#### Respostas
200 - OK! Exemplo:
```
{
    "jogos": {
        "id": 2,
        "titulo": "Skyrim",
        "ano": 2013,
        "preco": 29,
        "createdAt": "2021-05-17T18:30:30.000Z",
        "updatedAt": "2021-05-17T18:30:30.000Z"
    }
}
```
404 - Não encontrado. Motivos: "ID não existe no banco de dados."  
400 - Requisição inválida. Motivos: "ID inválido, somente números aceitos."  

### POST /game
Cadastra novo jogo no banco de dados.
#### Parâmetros
Necessário parâmetros "titulo", "ano", "preco".
Exemplo:
```
{
    "titulo": "novo jogo",
    "ano": 2010,
    "preco": 29.90
}
```
#### Respostas
200 - OK!  
400 - Requisição inválida. Motivos: "Titulo vazio; Ano e/ou Preço não é um número."  
401 - Não autorizado. Motivos: "Token inválido."  


### DELETE /game
Deleta jogo especifico baseado no ID passado.
#### Parâmetros
Necessário parâmetro ID.
#### Respostas
200 - OK!  
400 - Requisição inválida. Motivos: "ID não é um número ou ID é undefined."  
401 - Não autorizado. Motivos: "Token inválido."  


### PUT /game
Edita jogo especifico baseado no ID passado.
#### Parâmetros
Necessário parâmetro ID.
#### Respostas
200 - OK!  
400 - Requisição inválida. Motivos: "ID não é um número ou ID é undefined."  
401 - Não autorizado. Motivos: "Token inválido."  


## EndPoints de Usuários
### POST /user
Criação de novo usuário no banco de dados.
#### Parâmetros
Necessário parâmetro "email" e "password".
#### Respostas
201 - Usuário Criado. 
401 - Não autorizado. Motivos: "Token inválido (somente um usuário com TOKEN pode criar outro usuário."  
409 - Conflito. Motivos: "Email já cadastrado no banco de dados."  


### POST /login
Autenticação de usuários já cadastrados.
#### Paramêtros
Necessário parâmetro "email" e "password".
#### Respostas
200 - OK! (Cria e retorna TOKEN).  
401 - Não autorizado. Motivos: "Email ou Senha inválidos."  
404 - Não encontrado. Motivos: "Email não encontrado."  
500 - Erro interno no servidor. Motivos: "Erro ao gerar TOKEN."  
