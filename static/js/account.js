window.onload = function verificaUser() {
    if(!sessionStorage.getItem("userLogin")){
      sessionStorage.clear();
      window.location = "./index.html";
    }
}

let user = JSON.parse(sessionStorage.getItem("userLogin"))
var nome = document.getElementById("nome");
var email = document.getElementById("email");
var cpf = document.getElementById("cpf");
let password = document.getElementById('password');
let inputProfile = document.getElementById("inputProfile");

reqProfile(user.perfil)
getUser(user.id)

async function getUser(id) {
    fetch("http://179.124.9.84:7200/users/" + id + "/", {
      method: "GET",
      headers: {
        Authorization:"token " + user.token,
        Accept: "application/json",
        "Content-type": "application/json",
      },
    }).then(response => response.json())
        .then(data => {
            const resNome = data.name;
            const resCpf = data.cpf;
            const resEmail = data.email;

            nome.value = resNome
            email.value = resEmail
            cpf.value = resCpf
    });
}

async function reqProfile(profile) {
    fetch("http://179.124.9.84:7200/profile/" + profile, {
      method: "GET",
      headers: {
        Authorization:"token " + user.token,
        Accept: "application/json",
        "Content-type": "application/json",
    },
    }).then(response => response.json())
        .then(data => {
            const resString = data.profile;
            inputProfile.value = resString
    });
}

function logout(){
    sessionStorage.removeItem("userLogin");
    // sessionStorage.clear();
    window.location = "./index.html";
}

let alterarEmail = document.getElementById('alterarEmail');
let alterarNome = document.getElementById('alterarNome');
let alterarPassword = document.getElementById('alterarPassword');

alterarPassword.addEventListener('click', function(){password.disabled = false; password.focus()});
alterarEmail.addEventListener('click', function(){email.disabled = false; email.focus()});
alterarNome.addEventListener('click', function(){nome.disabled = false; nome.focus()});

function validarUsuario(){
    let infoUser = {
        nome:'',
        email:'',
        cpf:'',
    }
    var regName = /^[a-zA-Z]+$/;
    // var regName = /^[a-zA-Z]+( [a-zA-Z]+)+$/;
    if(!regName.test(nome.value)){
        document.getElementById("nome").classList.add("erroInput");
        let mensagemErro = document.getElementById("erroNome");
        mensagemErro.classList.add("erro");
        mensagemErro.innerHTML="Nome Inválido *"
        document.getElementById('nome').focus();
        return null;
    }else{
        document.getElementById("nome").classList.remove("erroInput");
        let mensagemErro = document.getElementById("erroNome");
        mensagemErro.classList.remove("erro");
        mensagemErro.innerHTML="Nome"
    }

    var validarEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if(!validarEmail.test(email.value)){
        document.getElementById("email").classList.add("erroInput");
        let mensagemErro = document.getElementById("erroEmail");
        mensagemErro.classList.add("erro");
        mensagemErro.innerHTML="Email Inválido *"
        document.getElementById('email').focus();
        return null;
    }else{
        document.getElementById("email").classList.remove("erroInput");
        let mensagemErro = document.getElementById("erroEmail");
        mensagemErro.classList.remove("erro");
        mensagemErro.innerHTML="Email"
    }
    if(password.value != '' && password.value.length < 3 || password.value.length >=12 ){
        password.classList.add("erroInput");
        let mensagemErro = document.getElementById("erroPassword");
        mensagemErro.classList.add("erro");
        mensagemErro.innerHTML="Defina uma senha com mais de 3 caracteres e no maxino 12."
        return null;
    }
    else if(password.value == '' || password.value == null){
        infoUser.nome = nome.value;
        infoUser.email = email.value;
        infoUser.cpf = cpf.value;
    }
    else{
        infoUser.nome = nome.value;
        infoUser.email = email.value;
        infoUser.cpf = cpf.value;
        infoUser.password = password.value;
    }
    console.log(infoUser)
    editarUser(infoUser)
}

async function editarUser(dadosUser) {
    let reqUser = await fetch("http://179.124.9.84:7200/users/"+ user.id +"/", {
      method: "PUT",
      headers: {
        Authorization:"token " + user.token,
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(dadosUser),
    });
    let response = await reqUser.json();
    if(reqUser.status == 200){
        swal("Sucesso!", "Usuário atualizado.", "error");
    }else{
        swal("Erro!", "Usuário não atualizado. "+response.message, "error");
    }
    console.log(response);
}

var salvar = document.getElementById('salvar');
salvar.addEventListener('click', validarUsuario);