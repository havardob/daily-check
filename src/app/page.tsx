'use client';
import styles from "./page.module.css";
import Checkbox from "@/components/Checkbox/checkbox";
import React, {useEffect, useMemo, useState} from "react";
import IconEdit from "@/components/Icons/iconEdit";
import {v4 as uuid} from "uuid";
import IconTrash from "@/components/Icons/iconTrash";
import IconFlame from "@/components/Icons/iconFlame";
import Header from "@/components/Header/header";
import IconAdd from "@/components/Icons/IconAdd";
import IconUpArrow from "@/components/Icons/IconUpArrow";
import IconDownArrow from "@/components/Icons/IconDownArrow";
import IconMore from "@/components/Icons/IconMore";

type Habit = {
    id: string,
    name: string,
    checkedDays: string[]
}

export default function Home() {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [openPopover, setOpenPopover] = useState<string | null>(null);
    const [theme, setTheme] = useState("light");

    const togglePopover = (habitId: string) => {
        if (habitId) {
            setOpenPopover((prev) => (prev === habitId ? null : habitId));
        }
    };

    const closePopover = () => {
        if (openPopover) {
            setOpenPopover("")
        }
    }

    const today = useMemo(() => {
        return new Date();
    }, [])

    const dates = useMemo(() => {
        const startDate = new Date("2024-12-01");
        const result: Date[] = [];
        const date = new Date(startDate);
        while (date <= today) {
            result.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return result;
    }, [today]);

    useEffect(() => {
        const storedHabits = localStorage.getItem('storage');
        if (storedHabits) {
            setHabits(JSON.parse(storedHabits));
        }

        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('storage', JSON.stringify(habits));
    }, [habits]);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);


    function newHabit() {
        const newHabitName = prompt("New habit (max 25 characters)");

        if (newHabitName === null || newHabitName.trim() === "") {
            return;
        }

        if (newHabitName !== "" && newHabitName.length <= 25) {
            console.log(newHabitName.length)
            setHabits((habits) => [
                ...habits,
                {
                    id: uuid(),
                    name: newHabitName,
                    checkedDays: []
                }
            ]);
        } else {
            alert("Write something between 1 and 25 characters")
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
        const newName = prompt("New name (max 25 characters)", clickedHabit?.name);

        if (newName === null || newName.trim() === "") {
            return;
        }

        if (newName !== "" && newName.length <= 25) {
            return setHabits((habits) =>
                habits.map((habit) => habit.id === habitId ? {...habit, name: newName} : habit)
            );
        } else {
            alert("Write something between 1 and 25 characters")
        }

    }

    function deleteHabit(habitId: string) {
        if (window.confirm(`Do you want to delete this habit`)) {
            setHabits((habits) => habits.filter(habit => habit.id !== habitId));
        } else {
            return;
        }
    }

    function moveHabit(habitId: string, direction: "up" | "down") {
        setHabits((habits) => {
            const index = habits.findIndex((habit) => habit.id === habitId);
            if (index === -1) {
                return habits;
            }

            const toIndex = direction === "up" ? index - 1 : index + 1;

            if (toIndex < 0 || toIndex >= habits.length) {
                return habits;
            }

            const updatedHabits = [...habits];

            const [movedHabit] = updatedHabits.splice(index, 1);
            updatedHabits.splice(toIndex, 0, movedHabit);

            return updatedHabits;
        });
    }

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

    function toggleTheme() {
        if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    }

    return (
        <>
            <div className={styles.page} onClick={closePopover}>
                <Header themeToggle={() => toggleTheme()} />
                <main className={styles.main}>
                    {habits.map((habit, index) => {
                        const streak = calculateStreak(habit.checkedDays);
                        return (
                            <div key={habit.id + index} className={styles.habit}>
                                <div className={styles.habitHeader}>
                                    <h3 className={styles.habitTitle}>{habit.name}</h3>
                                    <div className={styles.habitPopoverWrapper}>
                                        <button className={styles.habitPopoverToggle} onClick={() => togglePopover(habit.id)}>
                                            <span className={"u-hidden"}>Toggle options for {habit.name}</span>
                                            <IconMore />
                                        </button>
                                        {openPopover === habit.id && (
                                            <div className={styles.habitPopover} onClick={() => togglePopover(habit.id)}>
                                                <div className={styles.habitPopoverInner}>
                                                    <button onClick={() => changeHabitName(habit.id)} className={styles.habitPopoverButton}>
                                                        <IconEdit />
                                                        <span>Edit Name</span>
                                                    </button>
                                                    <button onClick={() => moveHabit(habit.id, "up")} className={styles.habitPopoverButton} disabled={index === 0}>
                                                        <IconUpArrow />
                                                        <span>Move Up</span>
                                                    </button>
                                                    <button onClick={() => moveHabit(habit.id, "down")} className={styles.habitPopoverButton} disabled={index === habits.length - 1}>
                                                        <IconDownArrow />
                                                        <span>Move Down</span>
                                                    </button>
                                                    <button onClick={() => deleteHabit(habit.id)} className={styles.habitPopoverButton}>
                                                        <IconTrash />
                                                        <span>Delete</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {streak > 0 && (
                                        <div className={styles.habitStreak}><IconFlame />{streak}</div>
                                    )}
                                </div>
                                <div className={styles.row} data-row={habit.id} key={habit.id}>
                                    {dates.map((date) => {
                                        const checkboxId = habit.id + date.toISOString();
                                        const isChecked = habit.checkedDays.includes(date.toISOString());
                                        const month = date.toLocaleDateString("en-GB", {month: "short"});
                                        const day = date.toLocaleDateString("en-GB", {day: "numeric"})
                                        const weekday = date.toLocaleDateString("en-GB", {weekday: "narrow"})

                                        return (
                                            <Checkbox
                                                key={checkboxId}
                                                id={checkboxId}
                                                label={
                                                    {
                                                        title: weekday,
                                                        subtitle: day + " " + month
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
                    <div className={styles.ctaButtonWrapper}>
                        <button className={styles.ctaButton} onClick={newHabit}>
                            <span>New Habit</span>
                            <IconAdd />
                        </button>
                    </div>
                </main>
            </div>
        </>
    );
}
