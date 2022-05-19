import React, { FC } from "react";
import { INote } from '../types/types';
import Note from './Note';
import Header from './UI/Header/Header';
import cl from '../css/table.module.css'
import {IFormObject} from '../types/types'


interface ArchiveProps {
    setVisibleArchive: (ar: boolean) => void;
    visibleArchive: boolean;
    setNotes: (notes: INote[]) => void;
    notes: INote[];
    currentNote: IFormObject;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    setEditNoteId: (id:number)=> void;
}

const Archive:FC<ArchiveProps> = ({visibleArchive, setNotes, notes, setVisibleArchive, currentNote, visible, setVisible, setEditNoteId}) => {

    return (
        <div className={visibleArchive? cl.archive: [cl.archive, cl.active].join(' ')}>
            <h1>Archive</h1>
            <Header setVisibleArchive={setVisibleArchive} visibleArchive={visibleArchive} setNotes={setNotes} notes={notes}></Header>
            {notes.map((note => (
                note.archiveStatus ? <Note note={note} key={note.id} setNotes={setNotes} 
                notes={notes} currentNote={currentNote}
                setVisible={setVisible} visible ={visible}
                setEditNoteId={setEditNoteId}
                /> : null
            )))}

        </div>
    )
}

export default Archive