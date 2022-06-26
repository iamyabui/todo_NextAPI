import styles from '../../styles/button.module.scss'

export default function NewTodoButton (props: any) {

    const { setIsModal } = props;
    const handleOpenNewTodo = () => {
        setIsModal(true);
    }

    return (
        <button className={styles.priority_high} onClick={() => handleOpenNewTodo()}>
            New Todo
        </button>
    )
}