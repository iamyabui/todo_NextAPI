import styles from '../../styles/button.module.scss'

export default function Priority_Button (props: any) {
    const { priority } = props;

    return (
        <button className={styles.priority_high}>{priority}</button>
    )
}