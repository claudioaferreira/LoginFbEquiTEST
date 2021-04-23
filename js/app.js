/////////////////// PERTENECE AL FORM ///////////////////
window.onload = inicializar;
var formConvalidaciones;
var refConvalidaciones;
var tbodyTablaConvalidaciones;
/////////////////// PERTENECE AL FORM ///////////////////

function registrar() {
  // console.log("Diste un click")
  var email = document.getElementById("email").value;
  var contrasena = document.getElementById("contrasena").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, contrasena)
    .then((userCredential) => {
      verificar(); // para solo enviar correo verificacion al momento de verificacion
      // Signed in
      var user = userCredential.user;
      toastr["info"]("Se ha enviado un correo electronico, debes verificarlo!!", "Gracias por registrarte.")
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ..
    });
}

// $(document).ready(function(){ 
//   $("#btn1").click(function(){
//       //tipos de mensajes succes, info, warning, error
//       //titulo y mensaje de texto
//       toastr["warning"]("Mensaje de prueba", "Demo");   
      
  
//   });

function ingreso() {
  var email2 = document.getElementById("email2").value;
  var contrasena2 = document.getElementById("contrasena2").value;
  
  firebase
    .auth()
    .signInWithEmailAndPassword(email2, contrasena2)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      toastr["success"]("Has accedido", "Felicidades!")
      // ... 
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      toastr["warning"](errorMessage, "Lo sentimos")
    });
}

function observador() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("Existe usuario activo");
      aparece(user);
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      console.log("*************");
      console.log("Estado Email verificado: " + user.emailVerified);
      console.log("*************");
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out
      console.log("No existe usuario activo");
      contenido.innerHTML = `
      <div class="container mt-5">
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
          <h3>Tienes que estar logueado para poder ingresar los equipos.</h3>
        </div>
      </div>
      
                            `;
      // ...
    }
  });
}
observador();

function aparece(user) {
  var user = user;
  var contenido = document.getElementById("contenido");
  if (user.emailVerified) {
    contenido.innerHTML = `
        <div class="container mt-2 ">
          <button class="btn btn-danger" onclick="cerrar()">Cerrar sesion</button>
       </div>
        <div class="container mt-5">
        <div class="alert alert-success alert-dismissible fade show" role="alert">
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
           <h4 class="alert-heading">Bievenido! ${user.email}</h4>
        <hr>
             <p class="mb-0">Favor ingresar datos del equipo!!.</p>
        </div>
      
        </div>
        <div class="container px-4">
        <div class="row gx-5">
            <div class="col-md">
                <div id="error"></div>
             <div class="p-3 border bg-light">
                 
        <form id="form-convalidaciones" name="form-convalidaciones">
            <fieldset>
                <div class="card">
                    <div class="card-body">
                        <div class="mb-3">
                            <label for="imei" class="form-label"><h4>Introduce el IMEI:</h4></label>
                            <input type="number" class="form-control" id="imei" name="imei" aria-describedby="imei">
                    </div>
                </div>
             </div>

            <div class="card mt-3 card-body" >
                    <label for="cargador" class="form-label"><h4>Cargador:</h4></label>
                    <input type="text" class="form-control" name="cargador" value="" id="cargador">
             </div> 
            <div class="card mt-3 card-body" >
                  <label for="cableusb" class="form-label"><h4>Cable USB:</h4></label>
                  <input type="text"  class="form-control" name="cableusb" value="" id="cableusb">
            </div>

            <div class="card mt-3 card-body" >
                  <label for="caja" class="form-label"><h4>Caja:</h4></label>
                  <input type="text"  class="form-control" name="caja" value="" id="caja">
             </div>
        </fieldset>

              <!-- BOTON -->
              <div class="card mt-2">
                <div class="card-body">
                    <div class="col-md-auto">
                        <input type="submit" class="btn btn-primary" name="" id="" value="Añadir">
                        <!-- <button type="button" id="modificar" class="btn btn-success ms-3">Modificar</button>  -->
                        <!-- <button type="button" id="crear" class="btn btn-success">Crear Tabla</button>       
                        <button type="button" id="listar" class="btn btn-success">Mostrar/Actualizar</button>
                        <button type="button" id="borrarTodo" class="btn btn-danger">Eliminar todo</button> -->
                      </div>
                </div>
              </div>
             
            
        
        
            
          </form>
             </div>
            </div>
            <div class="col-sm">
              <div class="p-3 border bg-light"><h5>Ultimo imei registrado:</h5>
                <div class="card" style="width: 11rem;">
                    545454545454545
                  <!-- <p class="card-text btn btn-danger" id="conteos"></p> -->
                </div>
              
              </div>
              <div class="p-3 border bg-light mt-2"><h5>Total de equipos</h5>
                <div class="card" style="width: 6rem;">
                  <div class="card-body">
                    <p class="card-text btn btn-warning" id="conteos"></p>
                  </div>
                </div>
              
              </div>
            </div>
          </div>
           
         
          </div>
      </div>

      
      <div class="container px-10">
      <div class="row g-1 mt-3 ms-2">
        <div class="col-md-15">
          <div class="p-3 border bg-light"><h5>EQUIPOS INGRESADOS</h5>

        <table id="datosEquipos" name="datosEquipos">
            <thead>
                <tr>
                    <th style="width: 220px; text-align:center;">Cable USB</th>
                    <th style="width: 186px; text-align:center;">Cargador</th>
                    <th style="width: 107px; text-align:center;">Caja</th>
                    <th style="width: 110px; text-align:center;">IMEI</th>
            </tr>
            </thead>
            <tbody id="tbody-tabla-convalidaciones">
        </table>
        
        </div>
        </div>
    </div>
                          `;
  }
};

function cerrar() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      contenido.innerHTML = "";
      toastr["info"]("Te esperamos pronto!!", "Adios")
      console.log("Saliendo...");
      // Sign-out successful.
    })
    .catch((error) => {
      console.log(error);
      // An error happened.
    });
}

function verificar() {
  var user = firebase.auth().currentUser;
  user
    .sendEmailVerification()
    .then(function () {
      console.log("Enviando Correo");
      // Email sent.
    })
    .catch(function (error) {
      console.log(error);
      // An error happened.
    });
}


///////////////////////////////////////////// FORMULARIO INGRESAR IMEI
function inicializar (){
    formConvalidaciones = document.getElementById("form-convalidaciones");
    formConvalidaciones.addEventListener("submit", enviarConvalidacionAFirebase, false);
    tbodyTablaConvalidaciones = document.getElementById("tbody-tabla-convalidaciones");
    refConvalidaciones = firebase.database().ref().child("equipos");

    mostrarConvalidacionesdeFireBase();
};


function mostrarConvalidacionesdeFireBase(){
    refConvalidaciones.on("value", function(snap){
        var datos = snap.val();
        var filasAMostrar = "";
        for(var key in datos) {
          filasAMostrar +=  "<tr>" + 
                                "<td>" + datos[key].imei + "</td>" +
                                "<td>" + datos[key].cargador + "</td>" +
                                "<td>" + datos[key].cableusb + "</td>" +
                                "<td>" + datos[key].caja + "</td>" +
                                "<td></td>" +
                                '<td>' +
                                '<button class="btn btn-danger borrar" data-convalidacion="' + key + '">' +
                                '<span class="material-icons-two-tone">delete</span>' +
                                '</button>' +
                                '</td>' +
                            "</tr>";
        }
        tbodyTablaConvalidaciones.innerHTML = filasAMostrar;
        if(filasAMostrar != ""){
            var elementosBorrables = document.getElementsByClassName("borrar");
            for (var i = 0; i < elementosBorrables.length; i++) {
            elementosBorrables[i].addEventListener("click", borrarConvalidacionesdeFirebase, false);
            
            }
        }
    });
};

function borrarConvalidacionesdeFirebase(){
    var keyDeConvalidacionABorrar = this.getAttribute("data-convalidacion");
    var refConvalidacionABorrar = refConvalidaciones.child(keyDeConvalidacionABorrar);
            refConvalidacionABorrar.remove();
}

function enviarConvalidacionAFirebase(e){
    e.preventDefault();
    refConvalidaciones.push({
        imei:       e.target.imei.value,
        cargador:   e.target.cargador.value,
        cableusb:   e.target.cableusb.value,
        caja:       e.target.caja.value
    });
    formConvalidaciones.reset();
    
};conteo ()

//CONTEO DE EQUIPOS
function conteo (){
    let cont = firebase.database().ref("equipos");
    cont.once("value")
      .then(function(snapshot) {
        console.log("Cantidad de equipos: " + snapshot.numChildren()); 
        document.getElementById("conteos").innerHTML =  snapshot.numChildren();
      });
}