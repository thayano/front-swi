window.onload = function verificaUser() {
    if(!sessionStorage.getItem("userLogin")){
      sessionStorage.clear();
      window.location = "./index.html";
    }
}

var infoUser = JSON.parse(sessionStorage.getItem("userLogin"))
var element = document.getElementById('painelCompanies');
var incluiDiv = '';

async function reqCompanies() {
    let reqCompanies = await fetch("http://179.124.9.84:7200/companies/", {
        method: "GET",
        headers: {
            Authorization:"token " + infoUser.token,
            Accept: "application/json",
            "Content-type": "application/json",
        },
    });
    let resCompanies = await reqCompanies.json();

    for (comp of resCompanies){
        incluiDiv += `<div class="col-6 col-md-4 col-xl-3 col-xxl-3" >
        <div class="app-card app-card-doc shadow-sm h-100 rounded-3" style="background-color: white;">
            <div class="app-card-thumb-holder d-flex  justify-content-between p-3">
                <div>
                    <span class="icon-holder">
                        <i class="fas fa-file-alt text-file"></i>
                    </span>
                    <span class="badge bg-success">Novo</span>
                     <a class="app-card-link-mask" href="#file-link"></a>
                </div>
                 <div class="app-card-actions">
                    <div class="dropdown">
                        <div class="dropdown-toggle no-toggle-arrow" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-three-dots-vertical" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                 <path fill-rule="evenodd" d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                            </svg>
                        </div><!--//dropdown-toggle-->
                        <ul class="dropdown-menu">
    
                            <li>
                                <a data-bs-toggle="modal" data-bs-target="#editarCompanies" class="dropdown-item" onclick="editarUser(this.id)" href="#" id="${comp.id}">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil me-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                    </svg>Editar
                                </a>
                            </li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li>
                                <a class="dropdown-item" href="#" id="${comp.id}" onclick="excluirCompanies(this.id)">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash me-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>Excluir
                                </a>
                            </li>
                        </ul>
                    </div><!--//dropdown-->
                </div>
            </div>
            <div class="app-card-body p-3 has-card-actions">
                <h4 class="app-doc-title truncate mb-0"><a href="#file-link">${comp.name}</a></h4>
                <div class="app-doc-meta mt-3">
                    <ul class="list-unstyled mb-0" style="font-size:12px ;">
                         <li><span class="text-muted">Empresa:</span> ${comp.name}</li>
                        <li><span class="text-muted">ID:</span> ${comp.id} </li>
                    </ul>
                </div><!--//app-doc-meta-->
                <!--//app-card-actions-->	
            </div><!--//app-card-body-->
        </div><!--//app-card-->
        </div><!--//col-->`

        element.innerHTML = incluiDiv;

    }
}
reqCompanies()



async function excluirCompanies(id) {
    Swal.fire({
        title: 'Excluir Empresa?',
        text: "Vocẽ tem certeza que deseja excluir esta empresa?!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText:'Cancelar',
        confirmButtonText: 'Sim, excluir!'
    }).then((result) => {
        if(result.isConfirmed) {
            confirExcluir(id)
        }
    })
}

async function confirExcluir(id){
    let deleteCompanies = await fetch("http://179.124.9.84:7200/companies/"+id+"/", {
        method: "DELETE",
        headers: {
            Authorization:"token " + infoUser.token,
            Accept: "application/json",
            "Content-type": "application/json",
        },
    });
    console.log(deleteCompanies)
    if(deleteCompanies.status < 300){
        Swal.fire(
            'Excluído!',
            'Empresa excluida com sucesso.',
            'success'
        ).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            } else {
                window.location.reload();
            }
        })
    }
    else{
        Swal.fire("Erro!", "Ocorreu um erro ao exluir empresa. " +resCompaniesDelete.message, "error");
    }
}
async function editarUser(id) {
    var nome = document.getElementById("nome");
    var email = document.getElementById("email");
    let idUser = document.getElementById('idUser');

    let reqUser = await fetch("http://179.124.9.84:7200/users/"+id+"/", {
        method: "GET",
        headers: {
            Authorization:"token " + infoUser.token,
            Accept: "application/json",
            "Content-type": "application/json",
        },
    });
    let resUser = await reqUser.json(); 

    if(reqUser.status < 300){
        nome.value = resUser.name;
        email.value = resUser.email;
        idUser.value = resUser.id
    }
}

async function setProfile() {
    let profile = document.getElementById("profile");
    var opt0 = document.createElement("option");
    opt0.value = "0";
    opt0.text = "Escolha...";
    profile.add(opt0, profile.options[0]);

    let reqProfile = await fetch("http://179.124.9.84:7200/profile/", {
        method: "GET",
        headers: {
            Authorization:"token " + infoUser.token,
            Accept: "application/json",
            "Content-type": "application/json",
        },
    });
    var profileSelect = document.getElementById("profile");
    let resProfile = await reqProfile.json();
    var count = 0;
    for(profile of resProfile){
        count++;
        var opt0 = document.createElement("option");
        opt0.value =`${profile.id}`;
        opt0.id=`${profile.id}`;
        opt0.text = `${profile.profile}`;
        profileSelect.add(opt0, profileSelect.options[count]);
    }
    // console.log(resProfile)
}

function validarUsuario(){
    let dadosUser = {}
    let name = document.getElementById('nome').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password');
    let idUser = document.getElementById('idUser').value;
    var profileSelect = document.getElementById("profile");
    
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
        mensagemErro.innerHTML="Nome";
        dadosUser.nome = nome.value;
    }

    var validarEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if(!validarEmail.test(email)){
        document.getElementById("email").classList.add("erroInput");
        let mensagemErro = document.getElementById("erroEmail");
        mensagemErro.classList.add("erro");
        mensagemErro.innerHTML="Email Inválido *"
        document.getElementById('email').focus();
        console.log("ok")
        return null;
    }else{
        document.getElementById("email").classList.remove("erroInput");
        let mensagemErro = document.getElementById("erroEmail");
        mensagemErro.classList.remove("erro");
        mensagemErro.innerHTML="Email";
        console.log(email)
        dadosUser.email = email;
        console.log(dadosUser.email)
    }

    let itensSelecionados = Array.from(profileSelect.options)
        .filter(option => option.selected)
        .map(option => option.value);

    if(itensSelecionados[0] != 0){
        dadosUser.profile = itensSelecionados[0];
    }

    if(password.value != '' && password.value.length < 3 ){
        password.classList.add("erroInput");
        let mensagemErro = document.getElementById("erroPassword");
        mensagemErro.classList.add("erro");
        mensagemErro.innerHTML="Defina uma senha com mais de 3 caracteres e no maxino 12."
        return null;
    }
    else if(password.value != '' && password.value >= 3){
        dadosUser.password = password.value;
    }

    console.log(dadosUser)
    editarUserSalvar(dadosUser, idUser)
}

async function editarUserSalvar(dadosUser, id) {
    console.log(infoUser)
    let reqUser = await fetch("http://179.124.9.84:7200/users/"+id+"/", {
        method: "PUT",
        headers: {
            Authorization:"token " + infoUser.token,
            Accept: "application/json",
            "Content-type": "application/json",
        },
        body: JSON.stringify(dadosUser)
    });
    let resUser = await reqUser.json(); 

    if(reqUser.status < 300){
        Swal.fire(
            'Pronto!',
            'Usuário alterado com sucesso.',
            'success'
        )
    }else{
        Swal.fire(
            'Erro!',
            'Falha ao alterar usuário.'+resUser.message,
            'error'
        )
    }
}
var salvar = document.getElementById('salvar');
salvar.addEventListener('click', validarUsuario);