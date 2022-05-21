import React, { FC } from "react";
import { INote } from '../types/types';
import Note from './Note';
import Header from './UI/Header/Header';
import cl from '../css/table.module.css';
import { IFormObject } from '../types/types';
import { useNote } from './ContextNote';


interface ArchiveProps {
    setNotes: (notes: INote[]) => void;
    notes: INote[];
    currentNote: IFormObject;
    setEditNoteId: (id: number) => void;
};

const Archive: FC<ArchiveProps> = ({ setNotes, notes, currentNote, setEditNoteId }) => {
    const value = useNote();
    const visibleArchive = value.visibleArchive;
    console.log(visibleArchive)
    return (
        <div>
            <div className={visibleArchive ? [cl.archive, cl.active].join(' ') : cl.archive}>
                {/* {visibleArchive ? <h1>Archive</h1> : null}
                {visibleArchive ? <Header setNotes={setNotes} notes={notes}/> : null} */}
                <h1>Archive</h1>
                <Header setNotes={setNotes} notes={notes}/>
                {notes.map((note => (
                    note.archiveStatus ? <Note note={note} key={note.id} setNotes={setNotes}
                        notes={notes} currentNote={currentNote}
                        setEditNoteId={setEditNoteId}
                    /> : null
                )))}
            </div>
        </div>
    )
};

export default Archive;