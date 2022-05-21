import React, { FC } from "react";
import CategoryIcon from '../CategoryIcon/CategoryIcon';
import { ICount } from '../../../types/types'
import classes from '../../../css/table.module.css'

export enum CategoryVariant {
    Task = 'Task',
    Idea = 'Idea',
    "Random Thought" = 'Random Thought'
}

interface ColumnForCaunterProps {
    children?: React.ReactNode;
    count: ICount[];
    category: CategoryVariant;
}

const ColumnForCaunter: FC<ColumnForCaunterProps> = ({ children, count, category }) => {
    console.log(count)
    return (
        <div>
            <div className={classes.mainDiv}>
                <pre style={{ width: "3%" }}><CategoryIcon category={category}></CategoryIcon></pre>
                <pre style={{ width: "35%" }}>{category}</pre>
                <pre style={{ width: "15%" }}>{count[1][category]}</pre>
                <pre style={{ width: "47%" }}>{count[0].Idea}</pre>
            </div>
            <div className={classes.emptySpace}></div>
        </div>

    )
}

export default ColumnForCaunter