import React, { FC } from 'react'
import classes from './Batton.module.css'
import { INote } from '../../../types/types'

export enum ButtonVariant {
    edit = 'create',
    archive = 'archive',
    delete = 'delete'
}

interface IButtonProps {
    onClick: (note: INote) => void;
    buttonType: ButtonVariant;
    note: INote;
}



const MyButton: FC<IButtonProps> = ({ onClick, buttonType, note }) => {
    return (
        <button onClick={() => onClick(note)} className={classes.myButton}>
            <i className="large material-icons"
                title={
                (note.archiveStatus&&(buttonType === 'archive'))? 'unzip':buttonType}
            
            
            >{buttonType}</i>
        </button >
    )
}

export default MyButton