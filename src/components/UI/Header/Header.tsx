import React, { FC } from "react";
import classes from './Header.module.css';
import {INote} from '../../../types/types'
import {useNote} from '../../ContextNote'

interface HeaderProps {
    setNotes: (notes: INote[]) => void;
    notes: INote[];
}


const Header: FC<HeaderProps> = ({  setNotes, notes }) => {

    let value = useNote();
    let visibleArchive = value.visibleArchive;
    let setVisibleArchive= value.setVisibleArchive;


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
            <div><button onClick={()=> {deleteAll()
             if (visibleArchive) setVisibleArchive(!visibleArchive)
            }}>
                <i className="large material-icons" title="delete">delete</i>
            </button></div>

        </div>
    )
}

export default Header