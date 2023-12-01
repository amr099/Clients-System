import React, { useContext, useState } from "react";
import Backup from "../Backup";
import Stack from "react-bootstrap/Stack";
import CustomLink from "../Link";
import { PrintContext } from "context/PrintContext";
import styles from "./nav.module.css";
import Print from "./../Print";

export default function Nav() {
    const [active, setActive] = useState("");
    const { printMode, setPrint } = useContext(PrintContext);
    const newLinks = [
        { name: "Client", icon: "bi bi-person-plus" },
        { name: "Transaction", icon: "bi bi-person" },
        { name: "Payment", icon: "bi bi-wallet" },
        { name: "Expense", icon: "bi bi-coin" },
    ];
    const viewLinks = [
        { name: "Overview", icon: "bi bi-clipboard2-data-fill", link: "/" },
        {
            name: "Transactions",
            icon: "bi bi-card-list",
            link: "Transactions",
        },
        { name: "Expenses", icon: "bi bi-cash-coin", link: "Expenses" },
    ];
    const editLinks = [
        { name: "Client Info", icon: "bi bi-pencil-square" },
        { name: "Services List", icon: "bi bi-file-earmark-text" },
    ];

    return (
        <>
            {!printMode && (
                <nav>
                    <Stack gap={3} className={styles.linkstack}>
                        {viewLinks.map((link) => (
                            <CustomLink
                                key={link.name}
                                name={link.name}
                                active={active}
                                setActive={setActive}
                                icon={link.icon}
                                link={link.link}
                                styles={styles}
                            />
                        ))}
                        <hr />

                        {newLinks.map((link) => (
                            <CustomLink
                                key={link.name}
                                name={link.name}
                                active={active}
                                setActive={setActive}
                                icon={link.icon}
                                styles={styles}
                            />
                        ))}
                        <hr />
                        {editLinks.map((link) => (
                            <CustomLink
                                key={link.name}
                                name={link.name}
                                active={active}
                                setActive={setActive}
                                icon={link.icon}
                                styles={styles}
                            />
                        ))}
                        <hr />
                        <Backup styles={styles} />
                        <Print
                            styles={styles}
                            print={print}
                            setPrint={setPrint}
                        />
                    </Stack>
                </nav>
            )}
        </>
    );
}
