/* global data */
/* exported data */

var $photoUrl = document.getElementById('photo-url');
var $photoPreview = document.getElementById('photo-preview');
var $entryForm = document.getElementById('entry-form');

$photoUrl.addEventListener('input', function (event) {
  $photoPreview.src = event.target.value;
  // console.log($photoUrl, event)
});

$entryForm.addEventListener('submit', function (event) {
  //  var formInputUpdated = event.target.value;
  // formInputUpdated.nextEntryId =
});
