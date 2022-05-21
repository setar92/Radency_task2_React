import React, {useContext, FC, useState} from "react";

const ContextNote = React.createContext({});

interface NoteProviderProps {
    children: React.ReactNode;
}

export const useNote: Function = () => {
    return useContext(ContextNote)
}



export const NoteProvider: FC<NoteProviderProps> = ({ children }) => {
    const [visibleArchive, setVisibleArchive] = useState('false');
    const [visible, setVisible] = useState<boolean>(false);

    
  


    return (
        <ContextNote.Provider value={{
            visibleArchive,
            setVisibleArchive,
            visible,
            setVisible
        }} >   
            {children}
        </ContextNote.Provider>

    )

}