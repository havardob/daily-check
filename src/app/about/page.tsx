import RootLayout from "@/app/layout";
import styles from "./about.module.css";

export default function About() {
    return (
        <RootLayout>
            <div className={styles.page}>
                <h1>About</h1>
            </div>
        </RootLayout>
    )
}