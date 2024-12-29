'use client';
import styles from "./page.module.css";
import Checkbox from "@/components/checkbox";
import React, {useEffect, useId, useState} from "react";
import IconDots from "@/components/icons/iconDots";
import {v4 as uuid} from "uuid";


function scrollToEnd(element: any) {
    element.scrollLeft = element.scrollWidth;
}

export default function Home() {
    useEffect(() => {
        getFromLocalStorage();
    }, []);

    const startDate = new Date("2024-12-01");
    const today = new Date();

    let [habits, setHabits] = useState<{ id: string, name: string, checkedDays: string[] }[]>([]);

    let dates: Date[] = [];

    let date = new Date(startDate);
    while (date <= today) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    function newHabit() {
        let newHabitName = prompt("New habit");
        if (newHabitName) {
            setHabits([{id: uuid(), name: newHabitName, checkedDays: []}, ...habits])
            saveToLocalStorage();
        }
    }

    function getFromLocalStorage() {
        const storedHabits = localStorage.getItem('storage');
        if (storedHabits) {
            setHabits(JSON.parse(storedHabits));
        }
    }

    useEffect(() => {
        saveToLocalStorage();
    }, [habits]);

    useEffect(() => {
        document.querySelectorAll("[data-row]").forEach((row) => {
            scrollToEnd(row);
        });
    }, [habits]);

    function saveToLocalStorage() {
        localStorage.setItem('storage', JSON.stringify(habits));
    }

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <button onClick={() => saveToLocalStorage()}>About</button>
                <h1>My streak</h1>
                <button onClick={newHabit}>New +</button>
            </header>
            <main className={styles.main}>
                {habits.map((habit, index) => (
                    <div key={index} className={styles.habit}>
                        <div className={styles.habit__header}>
                            <h3>{habit.name}</h3>
                            <button>
                                <span className={"u-hidden"}>Toggle options for {habit.name}</span>
                                <IconDots />
                            </button>
                        </div>
                        <div className={styles.row} data-row={habit.id} key={index}>
                            {dates.map((date, index) => (
                                <Checkbox
                                    key={index}
                                    id={habit.id + date.toISOString()}
                                    label={
                                        {
                                            title: date.toLocaleDateString("en-GB", {weekday: "narrow"}),
                                            subtitle: date.toLocaleDateString("en-GB", {month: "short", day: "numeric"})
                                        }
                                    }
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}
