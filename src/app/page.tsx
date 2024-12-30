'use client';
import styles from "./page.module.css";
import Checkbox from "@/components/checkbox";
import React, {useEffect, useMemo, useState} from "react";
import IconEdit from "@/components/icons/iconEdit";
import {v4 as uuid} from "uuid";
import IconTrash from "@/components/icons/iconTrash";
import IconFlame from "@/components/icons/iconFlame";

type Habit = {
    id: string,
    name: string,
    checkedDays: string[]
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
                ...habits,
                {
                    id: uuid(),
                    name: newHabitName,
                    checkedDays: []
                }
            ]);
        }
    }

    function checkHabit(habitId: string, day: string) {
        setHabits((habits) =>
            habits.map((habit) =>
                habit.id === habitId
                    ? {
                        ...habit,
                        checkedDays: habit.checkedDays.includes(day)
                            ? habit.checkedDays.filter(item => item !== day)
                            : [...habit.checkedDays, day],
                    }
                    : habit
            )
        );
    }

    function changeHabitName(habitId: string) {
        const clickedHabit = habits.find(habit => habit.id === habitId);
        const newName = prompt("New name", clickedHabit?.name);

        if (newName === null || newName.trim() === "") {
            return;
        }

        return setHabits((habits) =>
            habits.map((habit) => habit.id === habitId ? {...habit, name: newName} : habit)
        );
    }

    function deleteHabit(habitId: string) {
        if (window.confirm(`Do you want to delete this habit`)) {
            setHabits((habits) => habits.filter(habit => habit.id !== habitId));
        } else {
            return;
        }
    }

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <button>About</button>
                <h1>My Streak</h1>
                <button onClick={newHabit}>New +</button>
            </header>
            <main className={styles.main}>
                {habits.map((habit, index) => {
                    const calculateStreak = (checkedDays: string[]) => {
                        const sortedDays: Date[] = checkedDays
                            .map((day: string) => new Date(day))
                            .sort((a, b) => b.getTime() - a.getTime()); // Sort dates descending

                        let streak = 0;
                        const today = new Date().getTime();

                        for (let i = 0; i < sortedDays.length; i++) {
                            const diffDays: number = Math.floor(
                                (today - sortedDays[i].getTime()) / (1000 * 60 * 60 * 24)
                            );

                            if (diffDays !== streak) break;

                            streak++;
                        }

                        return streak;
                    };

                    const streak = calculateStreak(habit.checkedDays);
                    return (
                        <div key={habit.id + index} className={styles.habit}>
                            <div className={styles.habit__header}>
                                <h3>{habit.name}</h3>
                                <div className={styles.habit__buttons}>
                                    <button onClick={() => changeHabitName(habit.id)}>
                                        <span className={"u-hidden"}>Change name for {habit.name}</span>
                                        <IconEdit />
                                    </button>
                                    <button onClick={() => deleteHabit(habit.id)}>
                                        <span className={"u-hidden"}>Delete {habit.name}</span>
                                        <IconTrash />
                                    </button>
                                </div>
                                {streak > 0 && (
                                    <div className={styles.habit__streak}><IconFlame />{streak}</div>
                                )}
                            </div>
                            <div className={styles.row} data-row={habit.id} key={habit.id}>
                                {dates.map((date) => {
                                    const checkboxId = habit.id + date.toISOString();
                                    const isChecked = habit.checkedDays.includes(date.toISOString());
                                    const month = date.toLocaleDateString("en-GB", {month: "short"});
                                    const day = date.toLocaleDateString("en-GB", {day: "numeric"})

                                    return (
                                        <Checkbox
                                            key={checkboxId}
                                            id={checkboxId}
                                            label={
                                                {
                                                    title: day === "1" || day === "10" || day === "20" ? day : day,
                                                    subtitle: day === "1" || day === "10" || day === "20" ? month : ""
                                                }
                                            }
                                            isChecked={isChecked}
                                            onChangeAction={() => checkHabit(habit.id, date.toISOString())} />
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </main>
        </div>
    );
}
