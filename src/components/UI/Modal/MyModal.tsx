import React, { FC } from "react";
import cl from './MyModal.module.css'
import { useNote } from "../../ContextNote"

interface MyModalProps {
    children: React.ReactNode;
}

const MyModal: FC<MyModalProps> = ({ children}) => {

    const value = useNote();
    const visible = value.visible;
    const setVisible = value.setVisible;


    const classVisible = [cl.myModal];
    if (visible) {
        classVisible.push(cl.active)
    };

    return (
        <div className={visible? [cl.myModal, cl.active].join(' '): cl.myModal} onClick={() => setVisible(false)}>
            <div className={visible? [cl.content, cl.active].join(' '): cl.content} onClick={ (e) => e.stopPropagation()} >
                {children}
            </div>

        </div>
    )
}

export default MyModal