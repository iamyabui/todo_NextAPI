import Router from 'next/router';
import styles from '../../styles/button.module.scss'

export default function PriorityPullDown (props: any) {
    const { priority, todo } = props;

    const handleUpdatePriority = async(e: any) => {
        const update_priority = e.target.value;
        const update_todo = {...todo, priority: update_priority}

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
        <select className={styles.date_form} value={priority} onChange={(e) => handleUpdatePriority(e)}>
            <option value="Low">Low</option>
            <option value="Middle">Middle</option>
            <option value="High">High</option>
        </select>
    )
}