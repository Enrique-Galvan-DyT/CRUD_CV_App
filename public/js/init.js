document.querySelector('.collapseSocialsList').addEventListener('click', function () {
    //Si el botón no a mostrado la lista desplegable, no hace nada, de lo contrario, carga la lista UL de registros
    this.getAttribute('aria-expanded') === 'false' ? null : showListSocials();    
})

//Función para mostrar lista de registros para tabla Social
function showListSocials() {
    //Creo una plantilla de la estructura HTML que tendría mi LI, ya que, una lista UL está pensada para tener N cantidad de elementos LI, los cuales
    //son enlistados dentro de ella, entonces UL es mi lista (elemento padre) y cada LI es un elemento de mi lista (y cada uno un elemento hijo)

    //Por lo tanto, lo mejor para repetir información de forma dinámica, es tener una plantilla
    //La plantilla tiene clases que me ayudan a encontrar elementos que puedo usar para rellenar con información (inputs, textareas, checks) o bien, recuperar un dato en especial (id asignado ó id de un elemento padre)
    let li_template = '<li class="d-flex flex-column gap-3 border p-3">'
    + '<div class="d-flex align-content-center gap-3">'
    + '        <div>'
    + '            <h4 class="social-name">Name</h4>'
    + '            <input type="text" class="social-name-edit edit-field form-control my-3"/>'
    + '            <small class="social-description">Description</small>'
    + '            <textarea cols="60" rows="3" class="social-description-edit edit-field form-control my-3"/>'
    + '        </div>'
    + '        <div class="form-check form-switch ms-auto">'
    + '            <input class="form-check-input social-portfolio" type="checkbox" role="switch">'
    + '            <label class="form-check-label social-label-portfolio">Is portfolio</label>'
    + '        </div>'
    + '    </div>'
    + '    <div class="d-flex align-items-center gap-5">'
    + '        <div class="form-check">'
    + '            <input class="form-check-input social-status" type="checkbox" value="" id="social-status-">'
    + '            <label class="form-check-label social-label-status">'
    + '              Status'
    + '            </label>'
    + '          </div>'
    + '        <a class="link-opacity-100-hover social-link" href="#">Link</a>'
    + '        <input type="text" class="social-link-edit form-control edit-field"/>'
    + '        <div class="ms-auto p-3 d-flex gap-3 social-options" title="Options social">'
    + '             <button type="button" class="social-edit btn btn-sm btn-outline-info" title="Edit social">'
    + '                 <i class="bi bi-pencil-square"></i>'
    + '             </button>'
    + '             <button type="button" class="social-delete btn btn-sm btn-outline-danger" title="Delete social">'
    + '                 <i class="bi bi-trash-fill"></i>'
    + '             </button>'
    + '        </div>'
    + '    </div>'
    + '</li>'

    $.ajax({
        //Ruta que devuelve una lista completa de registros
        url: "https://localhost:44304/api/Socials",
        //Verbo utilizado
        method: 'GET',
        //Tipo de formato de comunicación
        contentType: 'application/json',
        success: function(response) {
            //Muestro la información en forma de tabla en consola
            console.table(response)
            
            //De todo mi documento (document) haré una búsqueda de selección (querySelector) hacia un elemento que contenga la clase ul-social-list ('.ul-social-list')
            //Habiendo guardado mi elemento en una variable llamada ul, ahora es más facil hacer cosas con él porque puedo llamarlo de forma más rápida y corta
            let ul = document.querySelector('.ul-social-list');
            //Vacío mi elemento ul asignandole un valor vacío a su HTML interno (innerHTML)
            ul.innerHTML = "";
            //Comparamos si la cantidad de registros devueltos son mayores a 0
            if(response.length > 0)
            {
                //Haremos un foreach de la lista de elementos
                response.forEach(social => {
                    //Por cada elemento de la lista, añadiremos la plantilla al HTML de mi lista UL, de esta forma podremos hacer cambios a su contenido
                    //Si intentara editar el contenido de la plantilla LI antes de añadirlo a la lista, me causaría un error de elemento no existente en el documento
                    $(ul).append(li_template)
                    
                    //De todo el contenido que existe en el UL, tomaré el último LI
                    let this_li = ul.lastChild;
                    
                    //Ahora que el LI existe en el HTML y ya no en memoria caché, podré editar sus valores, buscaré clases específicas para añadir valores específicos de los registros obtenidos
                    //Añadiré al ID del elemento LI un texto concatenado con el ID del registro obtenido
                    this_li.classList.add('li-socials-'+ social.Id_Social)
                    //Añadiré el nombre al elemento con clase social-name
                    this_li.querySelector('.social-name').innerText = social.Name
                    //Añadiré el nombre al elemento con clase social-name-edit, es el elemento que me ayudará a editar más tarde
                    this_li.querySelector('.social-name-edit').value = social.Name
                    //Mismos procedimientos con el siguiente valor
                    this_li.querySelector('.social-description').innerText = social.Description
                    this_li.querySelector('.social-description-edit').value = social.Description
                    
                    //Añadiré un ID al elemento check de portfolio
                    this_li.querySelector('.social-portfolio').id = "social-portfolio-" + social.Id_Social;
                    //Con Jquery (que también podemos usarlo) seleccionaré el atributo "for" de la etiqueta para relacionarlo con el ID del elemento check, 
                    //y de esa forma al dar click en este label, es como si dieramos click en el check
                    $(this_li.querySelector('.social-label-portfolio')).attr('for', "social-portfolio-" + social.Id_Social)
                    //Asignaremos el valor al check
                    this_li.querySelector('.social-portfolio').checked = social.Is_Portfolio;
                    
                    //Mismos procedimientos con el siguiente valor
                    this_li.querySelector('.social-status').id = "social-status-" + social.Id_Social;
                    $(this_li.querySelector('.social-label-status')).attr('for', "social-status-" + social.Id_Social)
                    this_li.querySelector('.social-label-status').innerText = (social.Status ? "Active" : "Inactive");
                    this_li.querySelector('.social-status').checked = social.Status;
                    
                    //Añadiré el link al elemento con clase social-link
                    this_li.querySelector('.social-link').innerText = social.Link
                    //Añadiré el link al elemento con clase social-link-edit, es el elemento que me ayudará a editar más tarde
                    this_li.querySelector('.social-link-edit').value = social.Link
                    
                    //Añadiré al ID del elemento con clase social-delete un texto concatenado con el ID del registro obtenido
                    this_li.querySelector('.social-delete').id = "social-delete-" + social.Id_Social;
                    //Añadiré al ID del elemento con clase social-edit un texto concatenado con el ID del registro obtenido
                    this_li.querySelector('.social-edit').id = "social-edit-" + social.Id_Social;
                    
                    //Del LI actual (nuestra variable this_li) haré una búsqueda de selección (querySelector) hacia un elemento que contenga la clase social-delecte ('.social-delete')
                    //al cual añadiré un evento (addEventListener) de tipo click, para después ejecutar de forma automática la función deleteSocial
                    this_li.querySelector('.social-delete').addEventListener('click', function () {
                        //La función deleteSocial va a recibir un ID
                        //Como estamos en una función basada en un elemento previamente seleccionado, podremos hacer referencia a ese mismo elemento con "this"
                        
                        //El ID numérico ya existe en forma de texto dentro del ID del elemento seleccionado "social-delete-1" por ejemplo, 
                        //con split dividiremos el ID del elemento con texto en un arreglo de 3 posiciones, seleccionando la posición 2 que es donde está nuestro número
                        deleteSocial(this.id.split('-')[2]);
                    });
                    
                    //Mismos procedimientos con el siguiente evento, ahora obteniendo más valores para poder hacer la edición
                    this_li.querySelector('.social-edit').addEventListener('click', function () {
                        let formData = {
                            id_social: this.id.split('-')[2],
                                name: this.closest('li').querySelector('.social-name-edit').value,
                                description: this.closest('li').querySelector('.social-description-edit').value,
                                is_portfolio: this.closest('li').querySelector('.social-portfolio').checked,
                                status: this.closest('li').querySelector('.social-status').checked,
                                link: this.closest('li').querySelector('.social-link-edit').value
                            }
                        editSocial(this.id.split('-')[2], formData);
                    });
                });

            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

document.querySelector('.send-social').addEventListener('click', function () {
 //Puedo llamar a otras funciones, o directamente poner el código aquí de esas funciones
 //Personalmente prefiero separarlo, porque no sabemos si más adelante necesitaremos hacer esos mismos procedimientos de otra forma que no sea un evento click como aquí   
 sendSocial()   
})

//sendSocial me ayuda a generar un objeto de los atributos que enviaré para poder crear un nuevo registro
function sendSocial() {
    // Capturar los valores del formulario
    var socialName = $('#form-social-name').val();
    var socialLink = $('#form-social-link').val();
    var socialDescription = $('#form-social-description').val();
    var socialisPortfolio = document.querySelector('#form-social-isPortfolio').checked;
    var socialStatus =  document.querySelector('#form-social-status').checked;
    
    // Construir el objeto con los datos del formulario, debe empatar con la forma que tenemos los atributos de la clase de la WEB API, eso incluye guiones bajos
    var formData = {
        name: socialName,
        link: socialLink,
        description: socialDescription,
        is_portfolio: socialisPortfolio,
        status: socialStatus
    };
    
    createSocial(formData);
}

//createSocial recibe el objeto de sendSocial para poder crear un nuevo registro
function createSocial(formData) {
    $.ajax({
        url: "https://localhost:44304/api/Socials",
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            console.table(response)
            //Si el nuevo registro se guardó, entonces vaciaré los campos del formulario
            $('#form-social-name').val('');
            $('#form-social-description').val('');
            $('#form-social-link').val('');
            $('#form-social-status').val(false);
            $('#form-social-isPortfolio').val(false);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}
//deleteSocial recibe un ID del objeto a eliminar
function deleteSocial(id) {
    $.ajax({
        url: "https://localhost:44304/api/Socials/DeleteSocials/" + id,
        method: 'DELETE',
        contentType: 'application/json',
        success: function(response) {
            console.table(response)
            //Una vez eliminado, vuelvo a cargar la lista
            showListSocials();    
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}
//editSocial recibe un ID del objeto a editar, y el objeto con los nuevos valores 
function editSocial(id, formData) {
    $.ajax({
        url: "https://localhost:44304/api/Socials/" + id,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            console.table(response)
            //Si el registro se editó, vuelvo a cargar la lista
            showListSocials()
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });
}