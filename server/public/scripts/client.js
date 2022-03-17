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
  $.ajax({
    url: '/koalas',
    method: 'POST',
    data: newKoala
  }).then(function(response) {
    console.log(response);
    // getKoalas();
  }).catch(function(error) {
    console.log('error in client post:', error);
    alert('Sorry, dude. Error in post');
  })
}
