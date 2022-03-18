console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();
}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    let name = $('#nameIn').val();
    let age = $('#ageIn').val();
    let gender = $('#genderIn').val();
    let ready_to_transfer = $('#readyForTransferIn').val();
    let notes = $('#notesIn').val();


    let koalaToSend = {
      name: name,
      age: age,
      gender: gender,
      ready_to_transfer: ready_to_transfer,
      notes: notes
    };
    console.log(koalaToSend)
    // call saveKoala with the new object
    saveKoala( koalaToSend );
  }); 
  $( 'body' ).on( 'click','.markReadyBtn',transferStatus);
  // click-listener for the delete button ot call function
  $('body').on('click', '.deleteBtn', deleteKoala);
}

function getKoalas() {
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas'
  }).then(function (koalas) {
    renderKoalas(koalas);
  }).catch(function (err) {
    console.log(err);
  })
} // end getKoalas

function renderKoalas(listOfKoalas) {
  console.log('in render', listOfKoalas);
  $('#viewKoalas').empty();

  for(let i = 0; i < listOfKoalas.length; i++) {
    let koala = listOfKoalas[i];
    
    
    if (koala.ready_to_transfer === true) {
      $('#viewKoalas').append(`
      <tr data-id=${koala.id}>
        <td>${koala.name}</td>
        <td>${koala.gender}</td>
        <td>${koala.age}</td>
        <td class="green">${koala.ready_to_transfer}</td>
        <td>${koala.notes}</td>
        <td>
          <button class="deleteBtn">DELETE Koala</button>
        </td>
      </tr>
    `);
    } 
    else {
    $('#viewKoalas').append(`
      <tr data-id=${koala.id}>
        <td>${koala.name}</td>
        <td>${koala.gender}</td>
        <td>${koala.age}</td>
        <td class="red" >${koala.ready_to_transfer}</td>
        <td>${koala.notes}</td>
        <td>
          <button class="deleteBtn">DELETE Koala</button>
          <button class="markReadyBtn">Ready to Transfer</button>
        </td>
      </tr>
    `);
    }
  }
}


function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas

  $.ajax({
    url: '/koalas',
    method: 'POST',
    data: newKoala
  }).then(function(response) {
    console.log(response);
    getKoalas(response);
  }).catch(function(error) {
    console.log('error in client post:', error);
    alert('Sorry, dude. Error in post');
  })
}
function transferStatus() {
  console.log('transferStatus button clicked');
  let koalaId = $(this).closest('tr').data('id')
  
  console.log('clicked transfer status',koalaId);
  $.ajax({
    url: `/koalas/${koalaId}`,
    method: 'PUT',
  
  }).then(function (response) {
    console.log('has been transferred!');
    getKoalas();
  }).catch(function (err) {
    console.log(err)
  })
}


function deleteKoala( removedKoala ){
  console.log('in deleteKoala', removedKoala);
  // target the ID of the koala on the table row
  let id = $(this).closest('tr').data('id');
  console.log(id);

    $.ajax({
      url: `/koalas/${id}`,
      method: 'DELETE',
    }).then(function (response) {
      console.log('koala deleted');
      getKoalas();
    }).catch(function(err) {
      console.log(err);
    }) 
  }
