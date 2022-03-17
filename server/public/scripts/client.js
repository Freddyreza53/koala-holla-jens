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
      readyForTransfer: 'testName',
      notes: 'testName',
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
}
function transferStatus() {
  console.log('transferStatus button clicked');
  let koala = $(this).closest('tr').data('koala')
  let transfer = $(this).text();
  console.log('clicked transfer status',koala.id,transfer);
  $.ajax({
    url: `/koalas/${koala.id}`,
    method: 'PUT',
    data: {transfer: transfer}
  }).then(function (response) {
    console.log('has been transfered!');
    renderKoalas();
  }).catch(function (err) {
    console.log(err)
  })
}
//need to add click listener to run this function :
// $(#viewKoalas).on('click),***fillin***, transferStatus