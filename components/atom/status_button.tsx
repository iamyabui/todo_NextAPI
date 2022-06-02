import styles from '../../styles/button.module.scss'

export default function Status_Button (props: any) {
    const { status } = props;

    return (
        <button className={styles.status_progress}>{status}</button>
    )
}