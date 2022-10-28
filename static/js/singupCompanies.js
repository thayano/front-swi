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
var statusSelect = document.getElementById("status");
var companiesSelect = document.getElementById("companies");

    var opt0 = document.createElement("option");
    opt0.value = "0";
    opt0.text = "Escolha...";
    statusSelect.add(opt0, statusSelect.options[0]);

    var opt1 = document.createElement("option");
    opt1.value = "ati";
    opt1.text = "Ativa";
    statusSelect.add(opt1, statusSelect.options[1]);

    var opt2 = document.createElement("option");
    opt2.value = "ina";
    opt2.text = "Inativa";
    statusSelect.add(opt2, statusSelect.options[2]);

var companies = document.getElementById("companies");
    var opt0 = document.createElement("option");
    opt0.value = "0";
    opt0.text = "Escolha...";
    companies.add(opt0, companies.options[0]);

reqCompanies()

async function reqCompanies() {
    let reqCompanies = await fetch("http://179.124.9.84:7200/companies/", {
        method: "GET",
        headers: {
            Authorization:"token " + user.token,
            Accept: "application/json",
            "Content-type": "application/json",
        }
    });
    let response = await reqCompanies.json();
    let count = 0;
    for (comp of response){
        count++;
        var opt0 = document.createElement("option");
        opt0.value = comp.name;
        opt0.text = comp.name;
        companies.add(opt0, companies.options[count]);
    }
  }

function validarEmpresa(){
    let name = document.getElementById('nome').value;
    let ip = document.getElementById('ip').value;
    let cnpj = document.getElementById('cnpj').value;
    let adress = document.getElementById('adress').value;
    let status = '';
    let companies = '';

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

    var validarIp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if(!validarIp.test(ip)){
        document.getElementById("ip").classList.add("erroInput");
        let mensagemErro = document.getElementById("erroIp");
        mensagemErro.classList.add("erro");
        mensagemErro.innerHTML="Ip Inválido *"
        document.getElementById('ip').focus();
        return null;
    }else{
        document.getElementById("ip").classList.remove("erroInput");
        let mensagemErro = document.getElementById("erroIp");
        mensagemErro.classList.remove("erro");
        mensagemErro.innerHTML="Ip"
    }

    var validarCnpj = /^[0-9.-/]*$/;
    if(!validarCnpj.test(cnpj) || cnpj == ''){
        document.getElementById("cnpj").classList.add("erroInput");
        let mensagemErro = document.getElementById("erroCpf");
        mensagemErro.classList.add("erro");
        mensagemErro.innerHTML="CNPJ Inválido *"
        document.getElementById('cnpj').focus();
        return null;
    }else{
        document.getElementById("cnpj").classList.remove("erroInput");
        let mensagemErro = document.getElementById("erroCnpj");
        mensagemErro.classList.remove("erro");
        mensagemErro.innerHTML="CNPJ"
    }

    if(adress == '' || adress == null){
        document.getElementById("adress").classList.add("erroInput");
        let mensagemErro = document.getElementById("erroAdress");
        mensagemErro.classList.add("erro");
        mensagemErro.innerHTML="Endereço Inválido *"
        document.getElementById('adress').focus();
        return null;
    }else{
        document.getElementById("adress").classList.remove("erroInput");
        let mensagemErro = document.getElementById("erroAdress");
        mensagemErro.classList.remove("erro");
        mensagemErro.innerHTML="Endereço"
    }
    
    if(statusSelect.selectedIndex != 0){
        switch(statusSelect.selectedIndex) {
            case 1:
                erroStatus()
                status = 'Ativa';
                break;
            case 2:
                erroStatus()
                status = 'Inativa';
                break;
            default:
      }
    }
    else{
        document.getElementById("status").classList.add("erroInput");
        let mensagemErro = document.getElementById("erroStatus");
        mensagemErro.classList.add("erro");
        mensagemErro.innerHTML="Defina um Status *"
        return null;
    }
    
    function erroStatus(){
        document.getElementById("status").classList.remove("erroInput");
        let mensagemErro = document.getElementById("erroStatus");
        mensagemErro.classList.remove("erro");
        mensagemErro.innerHTML="Status"
    }

    if(companiesSelect.selectedIndex == 0){
        document.getElementById("companies").classList.add("erroInput");
        let mensagemErro = document.getElementById("erroCompanies");
        mensagemErro.classList.add("erro");
        mensagemErro.innerHTML="Escolha uma companhia *"
        return null;
    }
    else{
        var dadosCompanies = {
        nome:name,
        ip:ip,
        cnpj: cnpj,
        status:status,
        adress:adress,
        companies:companies
        }
    reqCompanies(dadosCompanies)
    }
}
async function reqCompanies(dadosCompanies) {
    let reqCompanies = await fetch("http://179.124.9.84:7200/company/", {
      method: "POST",
      headers: {
        Authorization:"token " + user.token,
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(dadosCompanies),
    });
    let response = await reqCompanies.json();
    if(reqCompanies.status < 300){
      swal("SUCESSO!", "Usuário criado com sucesso.", "success");
    }
    else{
      swal("Erro!", "Ocorreu um erro ao criar usuario. " +response.message, "error");
    }
    console.log(response)
  }

var salvar = document.getElementById('salvar');
salvar.addEventListener('click', validarEmpresa);
