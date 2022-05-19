export interface IUser{
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface INote {
    name: string;
    noteBody: string;
    category: string;
    id: number;
    archiveStatus: boolean;
    createdDate: string;
}

export interface IFormObject { 
    name: string;
    noteBody: string;
    category: string;
}