'use client'

import styles from "./checkbox.module.css";
import React, {useEffect, useRef, useState} from "react";
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

    const checkboxRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.scrollIntoView();
        }
    }, []);


    return (
        <div className={styles.checkbox} ref={checkboxRef}>
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