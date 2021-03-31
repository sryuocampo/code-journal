/* global data */
/* exported data */
var $photoUrl = document.getElementById('photoUrl');
var $photoPreview = document.getElementById('photoPreview');
var $entryForm = document.getElementById('entry-form');
var entryHolder = document.getElementById('entries-list');

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
  var list = renderEntryDomTree(formInputValue);
  entryHolder.prepend(list);
  entryHolder.scrollIntoView();
});

window.addEventListener('beforeunload', function () {
  var formStorage = JSON.stringify(data);
  localStorage.setItem('code-journal-input', formStorage);
});

function renderEntryDomTree(entry) {
  var descriptionEntry = document.createElement('p');
  var descriptionText = document.createTextNode(entry.notes);
  descriptionEntry.appendChild(descriptionText);

  var headingEntry = document.createElement('h2');
  var headingText = document.createTextNode(entry.title);
  headingEntry.appendChild(headingText);

  var divInputSection = document.createElement('div');
  divInputSection.setAttribute('class', 'column-half input-section');

  divInputSection.append(headingEntry, descriptionEntry);

  var imgEntry = document.createElement('img');
  imgEntry.src = entry.photoURL;

  var divImageSection = document.createElement('div');
  divImageSection.setAttribute('class', 'column-half image-section');

  divImageSection.append(imgEntry);

  var liAnEntry = document.createElement('li');
  liAnEntry.setAttribute('class', 'row an-entry');

  liAnEntry.append(divImageSection, divInputSection);

  return liAnEntry;
}
window.addEventListener('DOMContentLoaded', function () {
  var storageLocal = localStorage.getItem('code-journal-input');
  if (storageLocal !== null) {
    var storageData = JSON.parse(storageLocal);
    data.view = storageData.view;
    data.entries = storageData.entries;
    data.editing = storageData.editing;
    data.nextEntryId = storageData.nextEntryId;
  }

  for (var ent = 0; ent < data.entries.length; ent++) {
    var list = renderEntryDomTree(data.entries[ent]);
    entryHolder.appendChild(list);
  }
});
