
import styles from '../styles/index.module.scss'

export default function Modal (props: any) {

    const { IsModal, setIsModal } = props;

    const handleCloseModal = () => {
        setIsModal(false);
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modal_header}>
                <p className={styles.name}>New Todo</p>
                <p className={styles.close} onClick={() => handleCloseModal()}>✗</p>
            </div>

            <div className={styles.modal_box}>
                <p className={styles.todo_label}>Title</p>
                <input type="text" className={styles.todo_form}></input>
            </div>

            <div className={styles.modal_box}>
                <p className={styles.todo_label}>Detail</p>
                <textarea className={styles.detail_form}></textarea>
            </div>

            <div className={styles.date_flex}>
                <div className={styles.date_box}>
                <p className={styles.todo_label}>Start Date</p>
                <input type="date" className={styles.date_form}></input>
                </div>

                <div className={styles.date_box}>
                <p className={styles.todo_label}>End Date</p>
                <input type="date" className={styles.date_form}></input>
                </div>
            </div>

            <button className={styles.modal_save_button}>Save</button>

        </div>
    )
}