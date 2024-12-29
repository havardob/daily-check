'use client'

import styles from "./checkbox.module.css";
import React, {useState} from "react";

interface CheckboxProps {
    id: string;
    label: {title: string, subtitle?: string};
}


export default ({id, label}: CheckboxProps) => {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
    };

    return (
        <div className={styles.checkbox}>
            <label htmlFor={id}>
            <span className={styles.title}>{label.title}</span>
            <span className={styles.subtitle}>{label.subtitle}</span>
            </label>
            <input id={id} type="checkbox" checked={checked} onChange={handleChange} />
        </div>
    )
}