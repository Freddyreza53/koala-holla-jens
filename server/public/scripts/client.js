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
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: 'testName',
      age: 'testName',
      gender: 'testName',
      ready_to_transfer: 'testName',
      notes: 'testName',
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
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
    $('#viewKoalas').append(`
      <tr data-id=${koala.id}>
        <td>${koala.name}</td>
        <td>${koala.gender}</td>
        <td>${koala.age}</td>
        <td>${koala.ready_to_transfer}</td>
        <td>${koala.notes}</td>
        <td>
          <button class="deleteBtn">DELETE Koala</button>
          <button class="markReadyBtn">Ready to Transfer</button>
        </td>
      </tr>
    `);
  }
}

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  
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