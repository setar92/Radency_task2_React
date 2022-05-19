import React, { FC } from "react";
import cl from './MyModal.module.css'


interface MyModalProps {
    children: React.ReactNode;
    setVisible: (visible: boolean) => void;
    visible: boolean;
}

const MyModal: FC<MyModalProps> = ({ children, setVisible, visible}) => {

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