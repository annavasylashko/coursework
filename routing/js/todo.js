fetch('/notes', {
  credentials: 'include',
}).then((res) => {
  if (res.status == 200) {
    res.json().then((data) => {
      notesObj.asign(data);
    });
  }
});

const notesObj = {
  data: {},
  asign: function(_data) {
    this.data = _data;
    this.data.notes.forEach((noteText) => {
      const note = document.createElement('div');
      note.classList.add('note');

      const p = document.createElement('p');
      const textNode = document.createTextNode(noteText);

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';

      checkbox.addEventListener('change', (e) => this.removeNote(e));

      p.appendChild(checkbox);
      p.appendChild(textNode);

      note.appendChild(p);

      notes.appendChild(note);
    });
  },
  removeNote: function(e) {
    e.target.parentNode.parentNode.classList.add('checked');
    e.target.disabled = true;

    setTimeout(() => {
      const index = Array.from(notes.children).indexOf(
          e.target.parentNode.parentNode
      );
      notes.removeChild(e.target.parentNode.parentNode);
      this.data.done.push(this.data.notes.splice(index, 1)[0]);

      this.refreshNotes();
    }, 1000);
  },
  addNote: function(text) {
    this.data.notes.push(text);

    const note = document.createElement('div');
    note.classList.add('note');

    const p = document.createElement('p');
    const textNode = document.createTextNode(text);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    checkbox.addEventListener('change', (e) => this.removeNote(e, this.data));

    p.appendChild(checkbox);
    p.appendChild(textNode);

    note.appendChild(p);

    notes.appendChild(note);

    this.refreshNotes();
  },
  refreshNotes: function() {
    fetch('/updateNotes', {
      method: 'POST',
      body: JSON.stringify(this.data),
    }).then((res) => {
      if (res.status === 500) alert(res.statusText);
    });
  },
};
