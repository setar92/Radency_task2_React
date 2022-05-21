import React, { FC, useState, useEffect } from "react";
import { INote, IFormObject } from '../types/types';
import Note from './Note'
import classes from '../css/table.module.css'
import Header from './UI/Header/Header'
import MyModal from './UI/Modal/MyModal'
import MyForm from "./UI/Input/MyForm";
import Archive from "./Archive";
import DefaultNotes from "./default.notes";
import { NoteProvider } from "./ContextNote";
import HeaderArchive from "./UI/HeaderForArchiveCount"


function getFromStorage() {
    const notesStorage = localStorage.getItem('Notes');
    if (notesStorage) {
        return JSON.parse(notesStorage);
    } else {
        return []
    }
}



const ListNotes: FC = () => {
    getFromStorage()

    const [notes, setNotes] = useState<INote[]>(getFromStorage());
    const [currentNote, setCurrentNote] = useState<IFormObject>({ name: '', noteBody: '', category: '' });
    const [editNoteId, setEditNoteId] = useState<number>(0);

    useEffect(() => {
        setTimeout(() => {
            const value = JSON.stringify(notes);
            localStorage.setItem('Notes', value);
        }, 300)

    }, [notes])

    function getDateNow() {
        let date = new Date();
        return date.toLocaleString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    };

    function createNewNote(e: React.FormEvent) {
        e.preventDefault();
        //перевіряємо чи це редаuування існуючої нотатки, чи створення нової

        let indexForEdit;
        notes.forEach((el, index) => {
            if (el.id === editNoteId) {
                indexForEdit = index;
            }
        });
        if (indexForEdit !== undefined) {
            if (currentNote.category && currentNote.name && currentNote.noteBody) {
                notes[indexForEdit].category = currentNote.category;
                notes[indexForEdit].name = currentNote.name;
                notes[indexForEdit].noteBody = currentNote.noteBody;
                setNotes([...notes]);
                setCurrentNote({ name: '', noteBody: '', category: '' });
                setEditNoteId(0);
            }
        } else {
            if (currentNote.category && currentNote.name && currentNote.noteBody) {
                const newNote: INote = { ...currentNote, id: Date.now(), archiveStatus: false, createdDate: getDateNow() };
                setNotes([...notes, newNote]);
                setCurrentNote({ name: '', noteBody: '', category: '' });
            }
        }


    }





    return (
        <div className={classes.table}>
            <NoteProvider>
                <DefaultNotes setNotes={setNotes} notes={notes} />
                {!notes.length
                    ?
                    null
                    : <Header
                        setNotes={setNotes} notes={notes}
                    ></Header>}

                {notes.map((note => (
                    !note.archiveStatus ? <Note note={note} key={note.id} setNotes={setNotes}
                        notes={notes} currentNote={currentNote}
                        setEditNoteId={setEditNoteId}
                    /> : null
                )))}
             

                <HeaderArchive notes={notes}></HeaderArchive>
                <MyModal>
                    <MyForm
                        currentNote={currentNote}
                        setCurrentNote={setCurrentNote}
                        createNewNote={createNewNote}
                    ></MyForm>
                </MyModal>
                <Archive notes={notes}
                    currentNote={currentNote} setNotes={setNotes}
                    setEditNoteId={setEditNoteId}
                />
            </NoteProvider>
        </div>
    )
}

export default ListNotes