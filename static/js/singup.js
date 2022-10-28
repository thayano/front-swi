window.onload = function verificaUser() {
    if(!sessionStorage.getItem("userLogin")){
      sessionStorage.clear();
      window.location = "./index.html";
    }
  }
  
  let user = JSON.parse(sessionStorage.getItem("userLogin"))
  var profileSelect = document.getElementById("profile");

    var opt0 = document.createElement("option");
    opt0.value = "0";
    opt0.text = "Escolha...";
    profile.add(opt0, profile.options[0]);

    var opt1 = document.createElement("option");
    opt1.value = "adm";
    opt1.text = "Administrador";
    profile.add(opt1, profile.options[1]);

    var opt2 = document.createElement("option");
    opt2.value = "sup";
    opt2.text = "Supervisor";
    profile.add(opt2, profile.options[2]);

    var opt3 = document.createElement("option");
    opt3.value = "ope";
    opt3.text = "Operador";
    profile.add(opt3, profile.options[3]);

    var opt4 = document.createElement("option");
    opt4.value = "mast";
    opt4.text = "Master";
    profile.add(opt4, profile.options[4]);

function validarUsuario(){
    let name = document.getElementById('nome').value;
    let email = document.getElementById('email').value;
    let cpf = document.getElementById('cpf').value;
    let password = document.getElementById('password').value;
    let profile = '';

    var regName = /^[a-zA-Z]+( [a-zA-Z]+)+$/;
    if(!regName.test(name)){
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
    if(!validarEmail.test(email)){
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

    var validarCpf = /^[0-9.-]*$/;
    if(!validarCpf.test(cpf)){
        document.getElementById("cpf").classList.add("erroInput");
        let mensagemErro = document.getElementById("erroCpf");
        mensagemErro.classList.add("erro");
        mensagemErro.innerHTML="CPF Inválido *"
        document.getElementById('cpf').focus();
        return null;
    }else{
        document.getElementById("cpf").classList.remove("erroInput");
        let mensagemErro = document.getElementById("erroCpf");
        mensagemErro.classList.remove("erro");
        mensagemErro.innerHTML="CPF"
    }
    
    if(profileSelect.selectedIndex != 0){
      switch(profileSelect.selectedIndex) {
        case 1:
          erroCargo()
          profile = 'Administrador';
          break;
        case 2:
          erroCargo()
          profile = 'Supervisor';
          break;
        case 3:
          erroCargo()
          profile = 'Operador';
          break;
        case 4:
          erroCargo()
          profile = 'Master';
          break;
        default:
      }
    }
    else{
      document.getElementById("profile").classList.add("erroInput");
      let mensagemErro = document.getElementById("erroProfile");
      mensagemErro.classList.add("erro");
      mensagemErro.innerHTML="Escolha um Cargo *"
      return null;
    }
    
    function erroCargo(){
      document.getElementById("profile").classList.remove("erroInput");
      let mensagemErro = document.getElementById("erroProfile");
      mensagemErro.classList.remove("erro");
      mensagemErro.innerHTML="Cargo"
    }

    if(password == '' || password == null){
      document.getElementById("password").classList.add("erroInput");
      let mensagemErro = document.getElementById("erroPassword");
      mensagemErro.classList.add("erro");
      mensagemErro.innerHTML="Defina uma senha *"
      return null;
    }
    else if( password.length < 3 || password.length >=12){
      document.getElementById("password").classList.add("erroInput");
      let mensagemErro = document.getElementById("erroPassword");
      mensagemErro.classList.add("erro");
      mensagemErro.innerHTML="Defina uma senha com mais de 3 caracteres e no maxino 12."
      return null;
    }
    else{
      let infoUser = {
        nome:name,
        email:email,
        cpf: cpf,
        profile:profile,
        password:password
    }
    reqUser(infoUser)
    }
}

async function reqUser(dadosUser) {
    let reqUser = await fetch("http://179.124.9.84:7200/users/create_user/", {
      method: "POST",
      headers: {
        Authorization:"token " + user.token,
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(dadosUser),
    });
    let response = await reqUser.json();
    if(reqUser.status < 300){
      Swal.fire(
        'Pronto!',
        'Usuário criado com sucesso.',
        'success'
      )
    }
    else{
      Swal.fire(
        'Erro!',
        'Ocorreu um erro ao criar usuário.'+response.message,
        'error'
      )
    }
    console.log(response)
  }
var salvar = document.getElementById('salvar');
salvar.addEventListener('click', validarUsuario);
