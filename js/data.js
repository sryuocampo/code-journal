/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function () {
  var formStorage = JSON.stringify(data);
  localStorage.setItem('code-journal-input', formStorage);
});

window.addEventListener('DOMContentLoaded', function () {
  var storageLocal = localStorage.getItem('code-journal-input');
  if (storageLocal !== null) {
    var storageData = JSON.parse(storageLocal);
    data = storageData;
  }
});
