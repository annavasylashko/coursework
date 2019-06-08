const notes = document.getElementById('notes');

fetch('notes').then((res) => {
  if (res.status == 200) {
    res.json().then((data) => {
      //refresh(data);
      asign(data);
    });
  }
});

const asign = (data) => {
  console.log(data.notes);
  data.notes.forEach((noteText, index) => {
    const note = document.createElement('div');
    note.classList.add('note');

    const p = document.createElement('p');
    const textNode = document.createTextNode(noteText);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    checkbox.addEventListener('change', e => {
      e.target.parentNode.parentNode.classList.toggle('checked');
      setTimeout(() => {
        let index = Array.from(notes.children).indexOf(e.target.parentNode.parentNode);
        notes.removeChild(e.target.parentNode.parentNode);
        data.notes.splice(index, 1);
      }, 1000);
    });

    p.appendChild(checkbox);
    p.appendChild(textNode);

    note.appendChild(p);

    notes.appendChild(note);
  });
}




const refresh = (data) => {

  //while (notes.firstChild) notes.removeChild(notes.firstChild);

  /*
  data.notes.forEach((noteText, index) => {
    const note = document.createElement('div');
    note.classList.add('note');

    const p = document.createElement('p');
    const textNode = document.createTextNode(noteText);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    checkbox.addEventListener('change', (index, data) => {
      noteIsChecked(index, data);
    });

    p.appendChild(checkbox);
    p.appendChild(textNode);

    note.appendChild(p);

    notes.appendChild(note);
  });
  */
}
/*
const noteIsChecked = (index, data) => {
  const notes = document.getElementsByClassName('note');

  notes[index].classList.toggle('checked');
  setTimeout(() => {
    if (!notes[index].classList.contains('checked')) return;
    notes[index].classList.toggle('done');
    data.notes.splice(index, 1);
    refresh(data);
    console.log(data.notes);
  }, 700);
};
*/