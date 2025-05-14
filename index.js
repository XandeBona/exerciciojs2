let listaUsuarios = [];

function adicionarUsuarioTabela(userNameValue, userEmailValue, userPasswordValue) {
    const linhaNova = document.createElement('tr');
    const userTable = document.createElement('td');
    userTable.innerText = userNameValue;
    const emailTable = document.createElement('td');
    emailTable.innerText = userEmailValue;
    const passwordTable = document.createElement('td');
    passwordTable.innerText = userPasswordValue;
    const listaUsuarios = document.getElementById("table_form");
    listaUsuarios.appendChild(linhaNova);
    listaUsuarios.appendChild(userTable);
    listaUsuarios.appendChild(emailTable);
    listaUsuarios.appendChild(passwordTable);


}

function salvarUsuario() {
    console.log("Botao funcionando")
    const userName = document.getElementById("user_name");
    const userNameValue = userName.value;
    const userEmail = document.getElementById("user_email");
    const userEmailValue = userEmail.value;
    const userPassword = document.getElementById("user_password");
    const userPasswordValue = userPassword.value;
    console.log(userNameValue)
    console.log(userEmailValue)
    console.log(userPasswordValue)
    adicionarUsuarioTabela(userNameValue, userEmailValue, userPasswordValue);
}

function gerenciarEventos() {
    const botaoEnviar = document.getElementById("user_button");
    botaoEnviar.addEventListener("click", salvarUsuario);
}

window.addEventListener("load", gerenciarEventos);