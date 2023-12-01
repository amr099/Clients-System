export default function Print({ styles, setPrint }) {
    const print = async () => {
        await setPrint(true);
        window.print();
    };
    return (
        <button className={`mb-3 w-100 ${styles.backup}`} onClick={print}>
            <i className={`bi bi-printer ${styles.navicon}`}></i> Print
        </button>
    );
}
