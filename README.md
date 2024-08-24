
# Teste para Estágio dti digital
Sistema que permite a criação e exclusão de lembretes.

# Como utilizar 

### Back-end
Para iniciar o servidor basta instalar as dependencias dentro do diretório `'backend'` com comando `npm install` e então `node server.js` para iniciar o servidor.

### Front-end
Para iniciar o Front-end instale as dependencias com `npm install` e então inicie com `npm start`.

Para acessar a página web use o link `http://localhost:3000`

# Tecnologias usadas
### Back-end

Utilizei o framework `Express` para construção do servidor e o `Prisma` para o gerenciamento do banco de dados.

O banco de dados utilizado é uma versão free do `Cloud MongoDB`.

O Back-end irá operar na porta `3001`.

### Front-end
Foi utilizado `React` para criação do Front-end e `Axios` para as solicitações com a API.

A pagina web está operando na porta `3000`

# Premissas Assumidas

As regras foram bem descritas pelo teste, assumi que o proprio dia não pode ser registrado e que deveria ser possivel editar um lembrete, o que foi feito de forma simples, copiando os dados do lembrete que vai ser editado para os inputs correspondentes e excluindo o original.

# Exemplo
Este é um exemplo da exibição da página
<div align="center">
    <img src=print.png alt="exemplo" height=400> 
</div>
