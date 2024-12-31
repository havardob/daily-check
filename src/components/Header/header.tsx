import IconInfo from "@/components/Icons/iconInfo";
import IconLightbulb from "@/components/Icons/iconLightbulb";
import styles from "./header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <button><IconInfo /><span className={"u-hidden"}>About this app</span></button>
            <h1>My Streak</h1>
            <button><IconLightbulb /><span className={"u-hidden"}>Toggle light/dark mode</span></button>
        </header>
    )
}