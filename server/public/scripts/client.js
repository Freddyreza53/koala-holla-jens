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
      ready_for_transfer: 'testName',
      notes: 'testName',
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
  // click-listener for the delete button ot call function
  $('body').on('click', '.deleteBtn', deleteKoala);
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  
} // end getKoalas

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