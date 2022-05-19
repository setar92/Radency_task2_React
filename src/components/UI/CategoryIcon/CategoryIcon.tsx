import React, { FC } from "react";
import classes from "./CategoryIcon.module.css";

interface IconProps {
    category: string;
}
let iconName:string;

const CategoryIcon: FC<IconProps> = ({ category }) => {
    
    switch(category) {
    case 'Idea':
        iconName = 'format_quote'
        break;
        case 'Task':
        iconName = 'shopping_cart'
        break;
        case 'Random Thought':
        iconName = 'lightbulb_outline'
        break;
    }
    
    return (
        <div className={classes.icon}>
            <i className="large material-icons">{iconName}</i>
        </div>
    )
}

export default CategoryIcon