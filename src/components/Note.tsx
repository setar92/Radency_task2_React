import React, { FC } from "react";
import { INote } from '../types/types';
import classes from '../css/table.module.css'
import MyButton, { ButtonVariant } from "./UI/Buttons/RightButton";
import CategoryIcon from "./UI/CategoryIcon/CategoryIcon";
import { IFormObject } from '../types/types';
import {useNote} from './ContextNote'

interface noteProps {
    note: INote;
    setNotes: (notes: INote[]) => void;
    notes: INote[];
    currentNote: IFormObject;
    setEditNoteId: (id:number) => void;
}

function getDatesFromBody(body: string) {

    let regEx = /[0-9]{1}[0-9]*[/][0-9]{1}[0-9]*[/][0-9]{4}/ig;
    const result: Array<string | null> = [];
    let dataFromBody;

    while ((dataFromBody = regEx.exec(body)) !== null) {
        result.push(dataFromBody.toString());
    }

    return result.join(', ')
};



const Note: FC<noteProps> = ({ note, setNotes, notes, currentNote,  setEditNoteId }) => {

    const value = useNote();
    const visible = value.visible;
    const setVisible = value.setVisible;

   

    function deleteNote(note: INote) {
        if (window.confirm('Are you sure, delete?')) {
            setNotes(notes.filter(item => item.id !== note.id));
        }
    }
    function archiveNote(note: INote) {
        let message: string;
        note.archiveStatus ? message = 'Are you sure, unzip?' : message = 'Are you sure, to archive?'
        if (window.confirm(message)) {
            notes.forEach((el) => {
                if (el.id === note.id) {
                    el.archiveStatus = !el.archiveStatus;
                }
            })
            setNotes([...notes]);
        }
    }

    function editButton(note: INote) {
        if (!visible) {
            setVisible(true)
        }
            currentNote.name = note.name;
            currentNote.noteBody = note.noteBody;
            currentNote.category = note.category; 
            setEditNoteId(note.id)
    }

    return (
        <div key={note.id}>
            <div className={classes.mainDiv} data-id={note.id}>
                <pre><CategoryIcon category={note.category}></CategoryIcon></pre>
                <pre>{note.name}</pre>
                <pre>{note.createdDate}</pre>
                <pre>{note.category}</pre>
                <pre>{note.noteBody}</pre>
                <pre>{getDatesFromBody(note.noteBody)}</pre>
                <pre><MyButton onClick={() => editButton(note)} note={note} buttonType={ButtonVariant.edit}></MyButton></pre>
                <pre><MyButton onClick={archiveNote} note={note} buttonType={ButtonVariant.archive}></MyButton></pre>
                <pre><MyButton onClick={deleteNote} note={note} buttonType={ButtonVariant.delete}></MyButton></pre>
            </div>
            <div className={classes.emptySpace}></div>
        </div>

    )

}

export default Note