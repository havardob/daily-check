'use client'

import styles from "./checkbox.module.css";
import React, {useState} from "react";
import IconCheck from "@/components/icons/iconCheck";

interface CheckboxProps {
    id: string;
    label: { title: string, subtitle?: string };
    onClickAction: () => void;
    isChecked: boolean;
}


export default function Checkbox({id, label, onClickAction, isChecked}: CheckboxProps) {
    const [checked, setChecked] = useState(isChecked);

    const handleChange = () => {
        setChecked(!checked);
    };


    return (
        <div className={styles.checkbox}>
            <label htmlFor={id}>
                {checked ? (
                    <IconCheck />
                ) : (
                    <>
                        <span className={styles.title}>{label.title}</span>
                        <span className={styles.subtitle}>{label.subtitle}</span>
                    </>
                )}
            </label>
            <input id={id} type="checkbox" checked={checked} onChange={handleChange} onClick={onClickAction} />
        </div>
    )
}