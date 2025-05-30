//Cria uma lista vazia para ser consultada pelo storage
let listaDeUsuarios = [];

//Funcao para adicionar os dados na tabela
function adicionarUsuarioTabela(nome, email, password) {
    //Cria novos elementos para a tabela, linha e colunas
    const newLine = document.createElement('tr');
    const nameTable = document.createElement('td');
    const emailTable = document.createElement('td');
    const passwordTable = document.createElement('td');
    //Cria checkbox na tabela
    const checkboxTable = document.createElement('td');
    const checkboxTableInput = document.createElement('input');
    checkboxTableInput.setAttribute('type', 'checkbox');
    checkboxTableInput.setAttribute('class', 'checkbox_remove');

    //Informa os valores para as colunas
    nameTable.innerText = nome;
    emailTable.innerText = email;
    passwordTable.innerText = password;

    //Vincula as colunas com a nova linha
    newLine.appendChild(nameTable);
    newLine.appendChild(emailTable);
    newLine.appendChild(passwordTable);
    newLine.appendChild(checkboxTable);

    //Variável para adicionar os dados na tabela do html
    const userList = document.getElementById("tabela_usuarios");

    //Utiliza a variável criada à cima para adicionar os dados à nova linha da tabela
    userList.appendChild(newLine);
    checkboxTable.appendChild(checkboxTableInput);
}

//Funcao para obter os dados nos inputs
function salvarUsuario() {
    //Obtém o nome do usuario, email e senha informados nos input
    const userName = document.getElementById("user_name");
    const userEmail = document.getElementById("user_email");
    const userPassword = document.getElementById("user_password");

    //Cria novo objeto com valores de nome, email e senha
    const novoUsuario = {
        nome: userName.value,
        email: userEmail.value,
        password: userPassword.value,
    }

    //Chama a funcao para adicionar os dados na tela
    adicionarUsuarioTabela(novoUsuario.nome, novoUsuario.email, novoUsuario.password);

    //Storage
    listaDeUsuarios.push(novoUsuario);
    localStorage.setItem("tabela_usuarios", JSON.stringify(listaDeUsuarios));
}

//Funcao para remover usuários
function removerUsuario() {
    // Obtem todas as linhas da tabela
    const tabela = document.getElementById("tabela_usuarios");
    const linhas = tabela.getElementsByTagName("tr");

    // Nova lista para armazenar apenas os usuários que não foram marcados
    const novaLista = [];

    // Array temporário para armazenar as linhas que devem ser removidas
    const linhasParaRemover = [];

    // Percorre as linhas da tabela
    for (let i = 0; i < linhas.length; i++) {
        const linha = linhas[i];
        const checkbox = linha.querySelector("input[type='checkbox']");

        // Se checkbox estiver marcado, marca para remover da lista
        if (checkbox && checkbox.checked) {
            linhasParaRemover.push(linha);
        } else {
            // Se não estiver marcado, o usuário continuará na lista
            const colunas = linha.getElementsByTagName("td");
            if (colunas.length >= 3) {
                const nome = colunas[0].innerText;
                const email = colunas[1].innerText;
                const password = colunas[2].innerText;

                novaLista.push({ nome, email, password });
            }
        }
    }

    // Remove as linhas da tabela
    for (let linha of linhasParaRemover) {
        tabela.removeChild(linha);
    }

    // Atualiza a lista global e o localStorage
    listaDeUsuarios = novaLista;
    localStorage.setItem("tabela_usuarios", JSON.stringify(listaDeUsuarios));
}

//Funcao para validar se o checkbox está true
function checkboxRemove() {
    const checkbox = document.getElementById("checkbox_remove");
    checkbox.addEventListener('change', removerUsuario);
}

//Funcao para armazenar dados no browser
function carregarUsuarios() {
    const storage = JSON.parse(localStorage.getItem("tabela_usuarios"));
    listaDeUsuarios = storage ? storage : [];
    for (let usuario of listaDeUsuarios) {
        nome = usuario.nome;
        email = usuario.email;
        password = usuario.password;
        adicionarUsuarioTabela(nome, email, password);
    }
}

function gerenciarEventos() {
    carregarUsuarios();
    const botaoEnviar = document.getElementById("user_button");
    botaoEnviar.addEventListener("click", salvarUsuario);
    const botaoRemover = document.getElementById("delete_button");
    botaoRemover.addEventListener("click", removerUsuario);
}

window.addEventListener("load", gerenciarEventos);