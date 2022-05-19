import React, { FC, useState, useEffect } from "react";
import { INote, IFormObject } from '../types/types';
import Note from './Note'
import classes from '../css/table.module.css'
import Header from './UI/Header/Header'
import MyModal from './UI/Modal/MyModal'
import MyForm from "./UI/Input/MyForm";
import Archive from "./Archive";
import DefaultNotes from "./default.notes";



const ListNotes: FC = () => {

    const [notes, setNotes] = useState<INote[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [currentNote, setCurrentNote] = useState<IFormObject>({ name: '', noteBody: '', category: '' });
    const [visibleArchive, setVisibleArchive] = useState(false);
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
        //перевіряємо чи це редашування існуючої нотатки, чи створення нової

        let indexForEdit;
        notes.forEach( (el, index) => {
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
        <DefaultNotes setNotes={setNotes} notes={notes} />
        {!notes.length
            ?
            null
            : <Header setVisibleArchive={setVisibleArchive} visibleArchive={visibleArchive} 
            setNotes={setNotes} notes={notes}
            ></Header>}

        {notes.map((note => (
            !note.archiveStatus ? <Note note={note} key={note.id} setNotes={setNotes}
                notes={notes} currentNote={currentNote}
                setVisible={setVisible} visible={visible}
                setEditNoteId={setEditNoteId}
            /> : null
        )))}

        <MyModal setVisible={setVisible} visible={visible}>
            <MyForm
                currentNote={currentNote}
                setCurrentNote={setCurrentNote}
                createNewNote={createNewNote}
            ></MyForm>
        </MyModal>
        <button className={classes.btnCreate} onClick={() => setVisible(true)}>Create Note</button>
        {notes.length
            ?
            <button
                className={classes.btnCreate}
                onClick={() => setVisibleArchive(!visibleArchive)}
                style={{ float: 'left' }}
            >show/hide archive</button>
            : null
        }

        <Archive notes={notes} visibleArchive={visibleArchive} setVisibleArchive={setVisibleArchive}
            setVisible={setVisible} visible={visible}
            currentNote={currentNote} setNotes={setNotes} 
            setEditNoteId={setEditNoteId}
            />

    </div>
)
}

export default ListNotes