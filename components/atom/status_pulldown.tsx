import Router from 'next/router';
import styles from '../../styles/button.module.scss'

export default function Status_PullDown (props: any) {
    const { status, todo } = props;

    const handleUpdateStatus = async(e: any) => {
        const update_status = e.target.value;
        const update_todo = {...todo, status: update_status}

        const res = await fetch("/api/updateTodo", {
            method: "POST",
            body: JSON.stringify(update_todo),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await res.json();
        if (json.ok) {
        Router.push("/");
        } else {
        alert(JSON.stringify(json));
        }
      }

    return (
        <select className={styles.date_form} value={status} onChange={(e) => handleUpdateStatus(e)}>
            <option value="InProgress">InProgress</option>
            <option value="Waiting">Waiting</option>
            <option value="Pending">Pending</option>
            <option value="Done">Done</option>
        </select>
    )
}