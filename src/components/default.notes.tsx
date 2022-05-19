import React, { FC } from "react";
import { INote } from '../types/types'
import cl from '../css/table.module.css'

interface DefaultNotesProps {
    setNotes: (notes: INote[]) => void;
    notes: INote[];
}


const DefaultNotes: FC<DefaultNotesProps> = ({ setNotes, notes }) => {
    const myArray = [
        {
            name: "first date",
            noteBody: "05/05/2020 I will go on a date 05/05/2020.",
            category: "Idea",
            id: 101,
            archiveStatus: false,
            createdDate: 'April 21, 2022'
        },

        {
            name: "You have to do your homework tomorrow ",
            noteBody: "You have to do your homework tomorrow. You have to do your homework tomorrow. You have to do your homework tomorrow. You have to do your homework tomorrow You have to do your homework tomorrow. You have to do your homework tomorrow. You have to do your homework tomorrow. You have to do your homework tomorrow You have to do your homework tomorrow. You have to do your homework tomorrow. You have to do your homework tomorrow. You have to do your homework tomorrow You have to do your homework tomorrow. You have to do your homework tomorrow. You have to do your homework tomorrow. You have to do your homework tomorrow",
            category: "Task",
            id: 202,
            archiveStatus: false,
            createdDate: 'April 21, 2022'
        },

        {
            name: "Buy a gift",
            noteBody: "Buy a gift for brother's birthday",
            category: "Task",
            id: 303,
            archiveStatus: false,
            createdDate: 'April 21, 2022'
        },

        {
            name: "ostriches",
            noteBody: "Start raising ostriches. It is necessary to order food for them no later than 25/05/2022",
            category: "Idea",
            id: 404,
            archiveStatus: false,
            createdDate: 'April 20, 2022'
        },

        {
            name: "Why",
            noteBody: "Why do planes fly and not fall?",
            category: "Random Thought",
            id: 505,
            archiveStatus: false,
            createdDate: 'April 13, 2022'
        },

        {
            name: "doctor",
            noteBody: "Visits to the doctor 15/04/2022",
            category: "Task",
            id: 606,
            archiveStatus: true,
            createdDate: 'April 19, 2022'
        },

        {
            name: "journey",
            noteBody: "Go on a journey",
            category: "Idea",
            id: 707,
            archiveStatus: true,
            createdDate: 'April 21, 2022'
        }
    ]



    function addToLocalStorage() {
        const value = JSON.stringify(myArray);
        setNotes(myArray);
        if (!localStorage.getItem('Notes')) {
            localStorage.setItem('Notes', value);
        }
    }
    return (
        <div className={cl.defaultNotes} style={{ display: notes.length ? 'none' : 'block' }}>
            <h3>No notes yet, click on the button to display the default notes or create new note:</h3>
            <button className={cl.btnDefault}
            onClick={addToLocalStorage}
            style={{float:'left'}}
            >show default notes</button>

        </div>

    )
}

export default DefaultNotes