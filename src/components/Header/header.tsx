import IconInfo from "@/components/Icons/iconInfo";
import IconLightbulb from "@/components/Icons/iconLightbulb";
import styles from "./header.module.css";
import {useRef, useState} from "react";
import IconClose from "@/components/Icons/IconClose";
import IconFlame from "@/components/Icons/iconFlame";

interface HeaderProps {
    themeToggle: () => void;
}

export default function Header({themeToggle}: HeaderProps) {
    const [open, setOpen] = useState(false);
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    const toggleDialog = () => {
        if (!open) {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }

        setOpen(!open);
    }

    return (
        <>
            <header className={styles.header}>
                <button onClick={toggleDialog}><IconInfo /><span className={"u-hidden"}>About this app</span></button>
                <h1>My Streak</h1>
                <button onClick={themeToggle}>
                    <IconLightbulb /><span className={"u-hidden"}>Toggle light/dark mode</span></button>
            </header>
            <dialog ref={dialogRef} className={styles.headerDialog}>
                <div className={styles.headerDialogInner}>
                    {/* eslint-disable */}
                    <div>
                        <h2>About MyStreak.is</h2>
                        <p>Form habits and track them.</p>
                        <p>Quit smoking? Going to the gym? Taking your dog for a walk? Read a book? <br />
                            <strong>My Streak</strong> let's you track any daily <strong>habit</strong> you want.</p>
                        <p>For each <strong>habit</strong> you register you'll get a calendar. Tick off the dates you've
                           completed. If you complete a habit several days in a row it becomes
                           a <strong><IconFlame />streak</strong>.</p>
                        <p>No statistics. No former "best streak". It only shows you the streak that you're currently
                           on, and hopefully will continue on for a long time going forward.</p>
                        {/*
                        <h3>Frequently asked questions</h3>
                        <details>
                            <summary>Don't I need an account?</summary>
                            <div>
                                <p>No, you don't need an account. Your habits and your tracked days are kept saved in
                                   the browser you're using. If you change the browser, delete browsing history or
                                   change devices your activity <strong>will not</strong> be synced. I won't get too
                                   technical, but it works in the same way as how many online word and puzzle games
                                   saves your play history,
                                   like <a href={"https://worldle.teuteuf.fr/"}>Worldle</a> or <a href={"https://crosswordle.org/"}>Crosswordle</a>.
                                   You can't jump from using your desktop computer to continue on your mobile device,
                                   because there's no sync between them.</p>
                            </div>
                        </details>
                        <details>
                            <summary>Does this exist as an app?</summary>
                            <div>
                                <p>No, but you can save this site to your home screen.</p>
                            </div>
                        </details>
                        */}
                    </div>
                    {/* eslint-enable */}
                    <button onClick={toggleDialog}>
                        <IconClose />
                        <span className={"u-hidden"}>Close the dialog</span>
                    </button>
                </div>
            </dialog>
        </>
    )
}