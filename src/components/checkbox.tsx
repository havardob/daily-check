'use client'

import styles from "./checkbox.module.css";
import React, {useEffect, useRef} from "react";
import IconCheck from "@/components/icons/iconCheck";

interface CheckboxProps {
    id: string;
    label: { title: string, subtitle?: string };
    onChangeAction: () => void;
    isChecked: boolean;
}


export default function Checkbox({id, label, onChangeAction, isChecked}: CheckboxProps) {

    const checkboxRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.scrollIntoView();
        }
    }, []);

    return (
        <div className={styles.checkbox} ref={checkboxRef}>
            <label htmlFor={id}>
                {isChecked ? (
                    <IconCheck />
                ) : (
                    <>
                        <span className={styles.title}>{label.title}</span>
                        <span className={styles.subtitle}>{label.subtitle}</span>
                    </>
                )}
            </label>
            <input id={id} type="checkbox" checked={isChecked} onChange={onChangeAction} />
        </div>
    )
}