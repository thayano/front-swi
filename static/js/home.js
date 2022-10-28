window.onload = function verificaUser() {
  if(!sessionStorage.getItem("userLogin")){
    sessionStorage.clear();
    window.location = "./index.html";
  }
}

let htmlMedicoes =
  `<div style="display: inline-block; padding: 10px;">
    <p><input type="checkbox" id="tensao" value="on"> Chave Aberta</p>
    <p><input type="checkbox" id="corrente" value="on"> Falta de Comunicação</p>
    <p><input type="checkbox" id="fp" value="on"> Chave em Manipulação</p>
    <p><input type="checkbox" id="bateria" value="on"> Bateria</p>
  </div>`;

let htmlAlert =
  `<div style="display: inline-block; padding: 10px;">
    <p><input type="checkbox" id="tensao" value="on"> Falta de Fase</p>
    <p><input type="checkbox" id="corrente" value="on"> Falta de Corrente</p>
    <p><input type="checkbox" id="fp" value="on"> Curto Transitório</p>
    <p><input type="checkbox" id="bateria" value="on"> Bateria</p>
  </div>
  <div style="display: inline-block;">
    <p><input type="checkbox" id="e_ativa" value="on"> Curto Permanente</p>
    <p><input type="checkbox" id="e_reativa" value="on"> Falta de Comunicação</p>
    <p><input type="checkbox" id="e_total" value="on"> Direção da Corrente</p>
    <p><input type="checkbox" id="e_total" value="on"> Oscilação de Tensão</p>
  </div>`;

// document.getElementById('periodoInicial').valueAsDate = new Date();
// document.getElementById('periodoFinal').valueAsDate = new Date();
// var select = document.getElementById("selectRelatorio");
var lista = [];

// function start() {
//   var opt0 = document.createElement("option");
//   opt0.value = "0";
//   opt0.text = "Selecione";
//   select.add(opt0, select.options[0]);

//   var opt2 = document.createElement("option");
//   opt2.value = "3";
//   opt2.text = "Relatórios de Alertas";
//   select.add(opt2, select.options[2]);
//   var value = select.options[select.selectedIndex].value;
// };
// start();
// select.addEventListener("change", selectPeriod);

// function selectPeriod() {
//   let medicoes = document.getElementById('medicoes')
//   if (select.selectedIndex == 1) {
//     medicoes.innerHTML = htmlMedicoes
//   }
//   if (select.selectedIndex == 2) {
//     medicoes.innerHTML = htmlAlert
//   }
// }

// async function getHistorico() {
//   var pacote = document.getElementsByName('Pacote');
//   let periodoInicial = document.getElementById('periodoInicial').value;
//   let periodoFinal = document.getElementById('periodoFinal').value;
//   let periodoFinalF = new Date(periodoFinal);
//   let periodoInicialF = new Date(periodoInicial);
//   var localtoken = JSON.parse(sessionStorage.getItem("dadosLogin"));

//   $.ajax({
//     type: "GET",
//     beforeSend: function (requisicao) {
//       requisicao.setRequestHeader("Authorization", "Token 7a361bd9ccf5f7b88433dcdb5d36531363c40778");
//       requisicao.setRequestHeader("Content-Type", "application/json");
//     },
//     url: "http://192.168.21.82:7000/mongo/return_measurements_by_date/?serial=10&last_date=2022-09-26 23:59:00&inital_date=2022-09-23 00:00:00",
//     success: function (data) {
//       for (var i = 0; i < data.length; i++) {
//         lista.push({ 'Corrente Med: ': data[i]["COR_ELE_RSM_MED"], 'Tensão Med: ': data[i]["TEN_ELE_RSM_MED"], 'Data': data[i]["DATE_SENSOR"] });
//       }
//       _gerarCsv()
//     },
//   });
// }
// function _gerarCsv() {
//   filename = 'reports.xlsx';
//   var ws = XLSX.utils.json_to_sheet(lista);
//   var wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, "People");
//   XLSX.writeFile(wb, filename);
//   lista = []
// }

// alarmesLateral()
// if (!usuarioLogado) {
//   window.location = "/login"
// }
function Logout() {
  // sessionStorage.removeItem('usuarioLogado');
  window.location = "/login"
  location.reload()
}

async function alarmesLateral() {
  let response = await fetch('http://179.124.9.84:7200/mongo/return_all_alerts/', {
    method: 'GET',
    headers: {
      Authorization: "token b373e7d405e1772cc549aa5d46ef1062ff8f4579",
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  let json = await response.json()
  let teste = json.pop()
  let alarmes = { "serial": teste.SERIAL, "BAT_BAIXA": 0, "CHV_ABERTA": 0, "CHV_MANIPULADA": 0 }
  var la = -20.480353584258513;
  var lon = -54.60430731647524;
  var local = new google.maps.LatLng(la, lon);
  let alarmeBateria = document.getElementById("alarme_bateria");
  let bateriaSidebar = document.getElementById("bateriaSidebar");
  let alarmeChave = document.getElementById("alarme_chave");
  let chaveSidebar = document.getElementById("chaveSidebar");
  let maniCorrente = document.getElementById("mani");
  let maniSidebar = document.getElementById("maniSidebar");
  let date = moment(teste['DATE_SENSOR']).format("DD/MM/yyyy")
  let hora = moment(teste['DATE_SENSOR']).format("HH:mm")

  let divAlarme = `<ul class="list-group mb-4">
            <li class="list-group-item text-dark bg-ligth rounded-3" style="background-color:#f8f9fa;border: none;">
      <div class="app-card-header ">
                    <div class="row g-3 align-items-center">
                        <div class="col-12 col-lg-auto text-center text-lg-start">				
                <div class="app-icon-holder">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                    <path d="M176 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64c-35.3 0-64 28.7-64 64H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64c0 35.3 28.7 64 64 64v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448c35.3 0 64-28.7 64-64h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V280h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V176h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448c0-35.3-28.7-64-64-64V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H280V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H176V24zM160 128H352c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32zm192 32H160V352H352V160z"/></svg>
                </div>		        
                        </div>
                        <div class="col-12 col-lg-auto text-center text-lg-start">
                            <div class="notification-type mb-2">
                  <span class="badge bg-danger">Switch</span>
                </div>
                <h4 class="notification-title mb-1">Serial ${teste['SERIAL']}</h4>
                <ul class="notification-meta list-inline mb-0">
                  <li class="list-inline-item">Estrutura: switch-acre</li><br>
                  <li class="list-inline-item font-monospace text-muted mt-1" style="font-size: 12px; display:flex;">
                    <div class="app-icon-holder" style="margin-right:8px">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" fill="#6C757D" height="14" viewBox="0 0 512 512">
                        <path d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z"/></svg>                          </div>
                      ${date} ás ${hora}
                    </li>
                  </ul>
                        </div>
                    </div>
                </div>
                </p>
            </li>
        </ul>`
  // for (let x of json) {

  // id - 1001 hub 
  // estrutura  -> switch-acre
  // serial 1 a 5
  
  if (teste['BAT_BAIXA'] == 0) {
    alarmes.serial = teste['SERIAL']
    alarmes.BAT_BAIXA = true
    alarmeBateria.setAttribute("fill", "red");
    bateriaSidebar.setAttribute("data-bs-toggle", "offcanvas");
    bateriaSidebar.setAttribute("data-bs-target", "#Bateria");
    $("#bateriaSideBar").empty();
    $("#bateriaSideBar").append(divAlarme);
  } else { alarmeBateria.setAttribute("fill", "currentColor"); }

  if (teste['CHV_ABERTA'] == 0) {
    alarmes.CHV_ABERTA = true
    alarmeChave.setAttribute("fill", "red");
    chaveSidebar.setAttribute("data-bs-toggle", "offcanvas");
    chaveSidebar.setAttribute("data-bs-target", "#Fase");
    $("#chaveSideBar").empty();
    $("#chaveSideBar").append(divAlarme);
  } else { alarmeChave.setAttribute("fill", "currentColor"); }

  if (teste['CHV_MANIPULADA'] == 0) {
    alarmes.CHV_MANIPULADA = true
    maniCorrente.setAttribute("fill", "red");
    maniSidebar.setAttribute("data-bs-toggle", "offcanvas");
    maniSidebar.setAttribute("data-bs-target", "#Corrente");
    $("#maniSideBar").empty();
    $("#maniSideBar").append(divAlarme);
  } else { maniCorrente.setAttribute("fill", "currentColor"); }

  // if (teste['NVL_AFUDAMENTO_TEN'] == 1) {
  //   let alarmeTransitorio = document.getElementById("alarme_transitorio");
  //   let transitorioSidebar = document.getElementById("transitorioSidebar");
  //   let date = moment(teste['DATE_SENSOR']).format("DD/MM/yyyy")
  //   let hora = moment(teste['DATE_SENSOR']).format("HH:mm")
  //   alarmeTransitorio.setAttribute("fill", "red");
  //   transitorioSidebar.setAttribute("data-bs-toggle", "offcanvas");
  //   transitorioSidebar.setAttribute("data-bs-target", "#Transitorio");
  //   $("#transitorioSideBar").append(`
  // <ul class="list-group mb-4">
  // 	<li class="list-group-item text-dark bg-ligth rounded-3" style="background-color:#f8f9fa;border: none;">
  // 	<strong>Sensor: ${teste['SERIAL']}</strong>
  // 		<p class="mt-2">
  // 			Data: ${date}<br>
  // 			Hora: ${hora}
  // 		</p>
  // 	</li>
  // </ul>`);
  // }

  if (alarmes.CHV_MANIPULADA || alarmes.CHV_ABERTA || alarmes.BAT_BAIXA) {
    addMarker(local, './vermelho1.png', alarmes.serial)
    $("#est-acre").attr("fill", '#dc3545');
    $("#spanAlarmeEst").css("background-color", "rgba(232, 232, 232, 1)");
  } else {
    addMarker(local, './preto1.png', alarmes.serial)
  }


  // if (teste['FALTA_FASE'] == 1 && teste['FALTA_CORRENTE'] == 1) {			
  // 	let alarmePermanente= document.getElementById("alarme_permanente");
  // 	let permanenteSidebar = document.getElementById("permanenteSidebar");
  // 	let date = moment(teste['DATE_SENSOR']).format("DD/MM/yyyy")
  // 	let hora = moment(teste['DATE_SENSOR']).format("HH:mm")
  // 	alarmePermanente.setAttribute("fill", "red");
  // 	permanenteSidebar.setAttribute("data-bs-toggle", "offcanvas");
  // 	permanenteSidebar.setAttribute("data-bs-target", "#Permanente");
  // 	$("#permanenteSideBar").append(`
  // 	<ul class="list-group mb-4">
  // 		<li class="list-group-item text-dark bg-ligth rounded-3" style="background-color:#f8f9fa;border: none;">
  // 		<strong>Sensor: ${teste['SERIAL']}</strong>
  // 			<p class="mt-2">
  // 				Data: ${date}<br>
  // 				Hora: ${hora}
  // 			</p>
  // 		</li>
  // 	</ul>`);
  // }

  // }
} setInterval(alarmesLateral, 500 * 10);

// function addMarker(location) {
//   var largeInfowindow = new google.maps.InfoWindow()
//   marker = new google.maps.Marker({
//     position: location,
//     map: map,

//   });

// }
// var la = '-20.480347245566527';
// var lon = '-54.60424641906011';
// var local = new google.maps.LatLng(la, lon);
// addMarker(local);


var map;
function initMap() {
    let brasil = {
        lat: -15,
        lng: -53
    };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: brasil,
        disableDefaultUI: false
    });
    //   var data_layer = new google.maps.Data({
    // 	map: map
    //   });
    //   var data_layer_2 = new google.maps.Data({
    // 	map: map
    //   });
    //   data_layer.loadGeoJson(
    // 	'convert2.json');
    //   data_layer_2.loadGeoJson(
    // 	'convert7.json');
}
// initMap()


function logout(){
    sessionStorage.removeItem("userLogin");
    // sessionStorage.clear();
    window.location = "./index.html";
}
var sair = document.getElementById('sair');

sair.addEventListener('click', logout);
window.initMap = initMap();
