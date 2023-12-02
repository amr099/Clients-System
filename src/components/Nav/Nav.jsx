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

    const Links = [
        { name: "Overview", icon: "bi bi-clipboard2-data-fill", link: "/" },
        {
            name: "Transactions",
            icon: "bi bi-card-list",
            link: "Transactions",
        },
        { name: "Expenses", icon: "bi bi-cash-coin", link: "Expenses" },
        { name: "Client", icon: "bi bi-person-plus", link: "/client" },
        { name: "Transaction", icon: "bi bi-person", link: "/transaction" },
        { name: "Payment", icon: "bi bi-wallet", link: "/payment" },
        { name: "Expense", icon: "bi bi-coin", link: "/expense" },
        {
            name: "Client Info",
            icon: "bi bi-pencil-square",
            link: "client info",
        },
        {
            name: "Services List",
            icon: "bi bi-file-earmark-text",
            link: "services list",
        },
    ];

    return (
        <>
            {!printMode && (
                <nav>
                    <Stack gap={3} className={styles.linkstack}>
                        {Links.map((link) => (
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
