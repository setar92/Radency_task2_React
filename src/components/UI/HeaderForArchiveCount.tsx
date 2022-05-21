import React, { FC } from "react";
import { INote, ICount } from "../../types/types";
import { useNote } from '../ContextNote'
import ColumnForCaunter from './ColumCounter/ColumnForCaunter'
import cl from './ColumCounter/Column.module.css';
import clas from '../../css/table.module.css'

export enum CategoryVariant {
    Task = 'Task',
    Idea = 'Idea',
    "Random Thought" = 'Random Thought'
}

interface HeaderProps {
    notes: INote[];
}

function countCategory(notes: INote[]) {
    const countArchived: ICount = {
        Task: 0,
        Idea: 0,
        'Random Thought': 0
    };
    const countActive: ICount = {
        Task: 0,
        Idea: 0,
        'Random Thought': 0
    };
    const count: ICount[] = [];

    notes.filter(note => note.archiveStatus === true).forEach(note => {
        switch (note.category) {
            case 'Task': countArchived.Task += 1;
                break;
            case 'Idea': countArchived.Idea += 1;
                break
            case 'Random Thought': countArchived["Random Thought"] += 1;
                break
        }
    });
    notes.filter(note => note.archiveStatus === false).forEach(note => {
        switch (note.category) {
            case 'Task': countActive.Task += 1;
                break;
            case 'Idea': countActive.Idea += 1;
                break
            case 'Random Thought': countActive["Random Thought"] += 1;
                break
        }
    });
    count[0] = countArchived;
    count[1] = countActive;
    return count
}


const HeaderArchive: FC<HeaderProps> = ({ notes }) => {
    const count = countCategory(notes);
    const value = useNote();
    const visibleArchive = value.visibleArchive;
    const setVisibleArchive = value.setVisibleArchive;
    const setVisible = value.setVisible;
    return (
        <div>
            {/* кнопки 'показати архів' 'створити нотатку' */}
            <div className={cl.divForButtons}>

                {!notes.length ? null :
                    <button
                        className={clas.btnCreate}
                        onClick={() => setVisibleArchive(!visibleArchive)}>
                        show/hide archive</button>
                }
                <button style={{
                    float: 'right'
                }} className={clas.btnCreate} onClick={() => setVisible(true)}>Create Note</button>
            </div>
{/* Табличка з кількостями нотаток по категоріям та статусу архівації */}
            <div className={cl.headerCounter}>
                <div></div>
                <div style={{ width: "35%" }}>Note Category</div>
                <div style={{ width: "15%", paddingLeft: 0 }}>Active</div>
                <div style={{ width: "47%", paddingLeft: 0 }}>Archived</div>
            </div>

            {(count[0].Idea | count[1].Idea) ? <ColumnForCaunter count={count} category={CategoryVariant.Idea} /> : null}
            {(count[0]["Random Thought"] | count[1]["Random Thought"]) ? <ColumnForCaunter count={count} category={CategoryVariant["Random Thought"]} /> : null}
            {(count[0].Task | count[1].Task) ? <ColumnForCaunter count={count} category={CategoryVariant.Task} /> : null}
        </div>
    )
}


export default HeaderArchive