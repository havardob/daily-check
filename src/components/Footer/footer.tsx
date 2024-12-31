import IconAdd from "@/components/Icons/IconAdd";
import styles from "./footer.module.css";

interface FooterProps {
    actionButtonOnClick?: () => void;
}

export default function Footer({actionButtonOnClick}: FooterProps) {
    return (
        <footer className={styles.footer}>
            <button onClick={actionButtonOnClick}><IconAdd /></button>
        </footer>
    )
}