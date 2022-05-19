import React, { FC } from "react";
import classes from './Header.module.css';
import {INote} from '../../../types/types'

interface HeaderProps {
    setVisibleArchive: (ar: boolean) => void;
    visibleArchive: boolean;
    setNotes: (notes: INote[]) => void;
    notes: INote[];
}


const Header: FC<HeaderProps> = ({ setVisibleArchive, visibleArchive, setNotes, notes }) => {
    function deleteAll() {
       if (window.confirm('really delete all notes?')) {
        setNotes([]); 
        localStorage.clear();
       }
    }

    return (
        <div className={classes.mainHeader}>
            <div></div>
            <div>Name</div>
            <div>Created</div>
            <div>Category</div>
            <div>Content</div>
            <div>Dates</div>
            <div></div>
            <div><button onClick={()=>{setVisibleArchive(!visibleArchive)}}>
                <i className="large material-icons" title="show/hide archive">archive</i>
            </button></div>
            <div><button onClick={()=> deleteAll()}>
                <i className="large material-icons" title="delete">delete</i>
            </button></div>

        </div>
    )
}

export default Header