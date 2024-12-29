'use client';
import styles from "./page.module.css";
import Checkbox from "@/components/checkbox";
import React, {useEffect, useMemo, useState} from "react";
import IconDots from "@/components/icons/iconDots";
import {v4 as uuid} from "uuid";

type Habit = {
    id: string,
    name: string,
    checkedBoxes: string[]
}

export default function Home() {
    const [habits, setHabits] = useState<Habit[]>([]);

    const dates = useMemo(() => {
        const startDate = new Date("2024-12-01");
        const today = new Date();
        const result: Date[] = [];
        const date = new Date(startDate);
        while (date <= today) {
            result.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return result;
    }, []);

    useEffect(() => {
        const storedHabits = localStorage.getItem('storage');
        if (storedHabits) {
            setHabits(JSON.parse(storedHabits));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('storage', JSON.stringify(habits));
    }, [habits]);


    function newHabit() {
        const newHabitName = prompt("New habit");
        if (newHabitName) {
            setHabits((habits) => [
                {
                    id: uuid(),
                    name: newHabitName,
                    checkedBoxes: []
                },
                ...habits
            ]);
        }
    }

    function checkHabit(habitId: string, checkboxId: string) {
        setHabits((habits) =>
            habits.map((habit) =>
                habit.id === habitId
                    ? {
                        ...habit,
                        checkedBoxes: habit.checkedBoxes.includes(checkboxId)
                            ? habit.checkedBoxes.filter(item => item !== checkboxId)
                            : [...habit.checkedBoxes, checkboxId],
                    }
                    : habit
            )
        );
    }

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <button>About</button>
                <h1>My streak</h1>
                <button onClick={newHabit}>New +</button>
            </header>
            <main className={styles.main}>
                {habits.map((habit, index) => (
                    <div key={habit.id + index} className={styles.habit}>
                        <div className={styles.habit__header}>
                            <h3>{habit.name}</h3>
                            <button>
                                <span className={"u-hidden"}>Toggle options for {habit.name}</span>
                                <IconDots />
                            </button>
                        </div>
                        <div className={styles.row} data-row={habit.id} key={habit.id}>
                            {dates.map((date) => {
                                const checkboxId = habit.id + date.toISOString();
                                const isChecked = habit.checkedBoxes.includes(checkboxId);

                                return (
                                    <Checkbox
                                        key={checkboxId}
                                        id={checkboxId}
                                        label={
                                            {
                                                title: date.toLocaleDateString("en-GB", {weekday: "narrow"}),
                                                subtitle: date.toLocaleDateString("en-GB", {
                                                    month: "short",
                                                    day: "numeric"
                                                })
                                            }
                                        }
                                        isChecked={isChecked}
                                        onClickAction={() => checkHabit(habit.id, date.toISOString())} />
                                )
                            })}
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}
