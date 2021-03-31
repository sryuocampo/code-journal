/* global data */
/* exported data */
var $photoUrl = document.getElementById('photoUrl');
var $photoPreview = document.getElementById('photoPreview');
var $entryForm = document.getElementById('entry-form');

$photoUrl.addEventListener('input', function (event) {
  $photoPreview.src = event.target.value;
});

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var formInputValue = {
    entryId: data.nextEntryId++,
    notes: event.target.elements.notes.value,
    photoURL: event.target.elements.photoUrl.value,
    title: event.target.elements.title.value
  };
  data.entries.unshift(formInputValue);
  $photoPreview.src = './images/placeholder-image-square.jpg';
  $entryForm.reset();
});

window.addEventListener('beforeunload', function () {
  var formStorage = JSON.stringify(data);
  localStorage.setItem('code-journal-input', formStorage);
});
