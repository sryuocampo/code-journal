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
  changeView('entries');
});

function renderEntryDomTree(entry) {
  var descriptionEntry = document.createElement('p');
  var descriptionText = document.createTextNode(entry.notes);
  descriptionEntry.appendChild(descriptionText);

  var headingEntry = document.createElement('h2');
  var headingText = document.createTextNode(entry.title);
  var elementI = document.createElement('i');
  elementI.setAttribute('class', 'fas fa-pencil-alt');
  headingEntry.append(headingText, elementI);

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
  liAnEntry.setAttribute('data-entry-id', entry.entryId);

  liAnEntry.append(divImageSection, divInputSection);

  return liAnEntry;
}
window.addEventListener('DOMContentLoaded', function () {
  for (var ent = 0; ent < data.entries.length; ent++) {
    var list = renderEntryDomTree(data.entries[ent]);
    entryHolder.appendChild(list);
  }
});

var buttonNewEntry = document.getElementById('new-entry');
buttonNewEntry.addEventListener('click', function () {
  changeView('entry-form');
});

function changeView(view) {
  if (view === 'entry-form') {
    document.querySelector('[data-view=entry-form]').className = '';
    document.querySelector('[data-view=entries]').className = 'hidden';
  } else {
    document.querySelector('[data-view=entry-form]').className = 'hidden';
    document.querySelector('[data-view=entries]').className = 'container';
  }
}
changeView('entries');

entryHolder.addEventListener('click', function (event) {
  if (event.target.matches('i.fas.fa-pencil-alt')) {
    var closestLi = event.target.closest('[data-entry-id]');
    var entryId = closestLi.getAttribute('data-entry-id');
    entryId = parseInt(entryId);
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === entryId) {
        data.editing = data.entries[i];
        changeView('entry-form');
        break;
      }
    }
  }
});
