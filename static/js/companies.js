window.onload = function verificaUser() {
    let user = JSON.parse(sessionStorage.getItem("userLogin"))
    if(!sessionStorage.getItem("userLogin")){
      sessionStorage.clear();
      window.location = "./index.html";
    }else if(user.empresa != 1){
        window.location = "./404.html";
    }
  }
let user = JSON.parse(sessionStorage.getItem("userLogin"))

function validarCompanhia(){
    let name = document.getElementById('nome').value;

    var regName = /^[a-zA-Z]+$/;
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
    let dados = {
        name: name
    }
    reqCompanies(dados)
}

async function reqCompanies(name) {
    let reqCompanies = await fetch("http://179.124.9.84:7200/companies/", {
        method: "POST",
        headers: {
            Authorization:"token " + user.token,
            Accept: "application/json",
            "Content-type": "application/json",
        },
        body: JSON.stringify(name)
    });
    let response = await reqCompanies.json();
    if(reqCompanies.status < 300){
        Swal.fire(
            'SUCESSO!',
            'Companhia criada com sucesso.',
            'success'
          )
    }
    else{
        swal("Erro!", "Ocorreu um erro ao criar companhia. " +response.message, "error");
    }
    console.log(response)
  }

var salvar = document.getElementById('salvar');
salvar.addEventListener('click', validarCompanhia); //);
