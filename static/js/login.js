

function infoUser() {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let mensagemErro = document.getElementById("erroLogin");
    if (validateEmail(email) == false) {
      mensagemErro.setAttribute("style", "display:block");
      mensagemErro.innerHTML="Email Inválido"
      return null;
    }
    let dadosUser = {
        "email":email,
        "password":password
    }
    reqLogin(dadosUser)
  }


  function validateEmail(email) {
    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    return re.test(email);
  }


async function reqLogin(dadosUser) {
  let reqLogin = await fetch("http://179.124.9.84:7200/users/login/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(dadosUser),
  });
  let response = await reqLogin.json();
  acesso(response, reqLogin);
}


function acesso(resp, status) {
  let erros = {
    naoregister: "User not registered in the system",
    senhaInvalid: "User or password invalid",
  }; 
  let mensagemErro = document.getElementById("erroLogin");
  if (status.status == 200) {
    let user = {
      token: resp.token,
      id:resp.user.id,
      nome:resp.user.name,
      email: resp.user.email,
      perfil:resp.user.profile,
      empresa:resp.user.companies,
      posto:resp.user.post
    }
    sessionStorage.setItem("userLogin", JSON.stringify(user));
    window.location = "./home.html";
  }
    else if(erros.naoregister == resp.message){
    mensagemErro.setAttribute("style", "display:block");
    mensagemErro.innerHTML="Usuario não registrado"
  }
    else if(erros.senhaInvalid == resp.message){
    mensagemErro.setAttribute("style", "display:block");
    mensagemErro.innerHTML="Senha Inválida"
  }
   else {
    console.log(resp.message)
    mensagemErro.setAttribute("style", "display:block");
    mensagemErro.innerHTML="Ocorreu um erro, por favor contate o Administrador do Sistema"
  }
}

var login = document.getElementById('login');
login.addEventListener('click', infoUser);