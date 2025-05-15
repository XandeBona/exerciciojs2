//Cria uma lista vazia para ser consultada pelo storage
let listaDeUsuarios = [];

//Funcao para adicionar os dados na tabela
function adicionarUsuarioTabela(userNameValue, userEmailValue, userPasswordValue) {
    //Cria uma nova linha na tabela
    const linhaNova = document.createElement('tr');
    //Cria uma nova coluna (nome)
    const userTable = document.createElement('td');
    userTable.innerText = userNameValue;
    //Cria uma nova coluna (email)
    const emailTable = document.createElement('td');
    emailTable.innerText = userEmailValue;
    //Cria uma nova coluna (senha)
    const passwordTable = document.createElement('td');
    passwordTable.innerText = userPasswordValue;
    //Variável para adicionar os dados na tabela do html
    const listaUsuarios = document.getElementById("tabela_usuarios");

    //Utiliza a variável criada à cima para adicionar os dados às novas linhas da tabela
    listaUsuarios.appendChild(linhaNova);
    listaUsuarios.appendChild(userTable);
    listaUsuarios.appendChild(emailTable);
    listaUsuarios.appendChild(passwordTable);
}

//Funcao para obter os dados nos inputs
function salvarUsuario() {
    //Obtém o nome do usuario informado no input
    const userName = document.getElementById("user_name");
    const userNameValue = userName.value;
    //Obtém o email do usuario informado no input
    const userEmail = document.getElementById("user_email");
    const userEmailValue = userEmail.value;
    //Obtém a senha do usuario informada no input
    const userPassword = document.getElementById("user_password");
    const userPasswordValue = userPassword.value;

    //Chama a funcao para adicionar os dados na tela
    adicionarUsuarioTabela(userNameValue, userEmailValue, userPasswordValue);

    //Storage
    listaDeUsuarios.push([userNameValue, userEmailValue, userPasswordValue]);
    localStorage.setItem("tabela_usuarios", JSON.stringify(listaDeUsuarios));
}

//Funcao para armazenar dados no browser
function carregarUsuarios() {
    const storage = JSON.parse(localStorage.getItem("tabela_usuarios"));
    listaDeUsuarios = storage ? storage : [];
    for (let usuario of listaDeUsuarios) {
        adicionarUsuarioTabela(usuario[0], usuario[1], usuario[2]);
    }
}

function gerenciarEventos() {
    carregarUsuarios();
    const botaoEnviar = document.getElementById("user_button");
    botaoEnviar.addEventListener("click", salvarUsuario);
}

window.addEventListener("load", gerenciarEventos);