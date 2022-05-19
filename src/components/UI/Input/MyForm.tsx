import React, { FC, useEffect, useState } from "react";
import cl from './MyForm.module.css'
import { IFormObject } from '../../../types/types';


interface MyFormProps {
    currentNote: IFormObject;
    setCurrentNote: (arg: IFormObject) => void;
    createNewNote: (e: React.FormEvent) => void;
}

const MyForm: FC<MyFormProps> = ({ currentNote, setCurrentNote, createNewNote }) => {

    const [modalValid, setModalValid] = useState<boolean>(false);
    useEffect(() => {
        if (currentNote.category && currentNote.name && currentNote.noteBody) {
            setModalValid(true)
        } else {
            setModalValid(false)
        }
    }, [currentNote])
    function onReset() {
        setCurrentNote({ name: '', noteBody: '', category: '' })
    }

    return (
        <form className={cl.myForm}>
            <p>
                <label htmlFor={'name'} >Type note name</label>
                <input
                    name="name" required
                    value={currentNote.name}
                    onChange={e => {
                        setCurrentNote({ ...currentNote, name: e.target.value })
                    }}
                />
            </p>
            <p>
                <label htmlFor={'noteBody'}>Type note text</label>
                <textarea
                    cols={64} rows={2}
                    name="noteBody" required
                    value={currentNote.noteBody}
                    onChange={e => setCurrentNote({ ...currentNote, noteBody: e.target.value })}
                />
            </p>
            <p>
                <label htmlFor="select">Choose category</label>
                <select required
                    defaultValue={''}
                    name="select"
                    value={currentNote.category}
                    onChange={e => setCurrentNote({ ...currentNote, category: e.target.value })}
                >
                    <option value={'Idea'}>Idea</option>
                    <option value={'Random Thought'}>Random Thought</option>
                    <option value={'Task'}>Task</option>
                </select>
            </p>
            <p>
                <label></label>
                <button type="submit" onClick={e => createNewNote(e)} disabled={!modalValid}>submit</button>
                <button type="reset" onClick={onReset}>reset</button>
            </p>
        </form >
    )
}

export default MyForm