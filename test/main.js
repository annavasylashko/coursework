let data = {
    "notes": 
    [
        "Sample Task To Do Sample Task To Do Sample Task To Do",
        "Sample Task To Do Sample Task To Do",
        "Sample Task To Do",
        "Sample Task To Do Sample Task To Do Sample Task To Do",
        "Sample Task To Do Sample Task To Do",
        "Sample Task To Do Sample Task To Do Sample Task To Do Sample Task To Do Sample Task To Do Sample Task To Do",
        "Sample Task To Do Sample Task To Do Sample Task To Do",
         
    ],
    
    "done": 
    [
        "Note That Is Already Done",
        "Note That Is Already Done",
        "Note That Is Already Done",
        "Note That Is Already Done"
    ]
}

const notes = document.getElementById('notes');

data.notes.forEach((noteText, index) => {
    let note = document.createElement('div');
    note.classList.add('note');

    let p = document.createElement('p');
    let textNode = document.createTextNode(noteText);

    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";

    checkbox.addEventListener('change', () => {
        noteIsDone(index);
    })

    p.appendChild(checkbox);
    p.appendChild(textNode);

    note.appendChild(p);

    notes.appendChild(note);
});

const noteIsDone = index => {
    let notes = document.getElementsByClassName('note');
    notes[index].classList.toggle('checked');
}