import React, { useContext, useState } from "react";
import Backup from "./Backup";
import Stack from "react-bootstrap/Stack";
import CustomLink from "./Link";
import { PrintContext } from "context/PrintContext";

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

    const print = async () => {
        await setPrint(true);
        window.print();
    };

    return (
        <>
            {!printMode && (
                <nav>
                    <h3>View</h3>
                    <Stack gap={3} className='link-stack'>
                        {viewLinks.map((link) => (
                            <CustomLink
                                key={link.name}
                                name={link.name}
                                active={active}
                                setActive={setActive}
                                icon={link.icon}
                                link={link.link}
                            />
                        ))}
                    </Stack>
                    <hr />
                    <h3>New</h3>
                    <Stack gap={3} className='link-stack'>
                        {newLinks.map((link) => (
                            <CustomLink
                                key={link.name}
                                name={link.name}
                                active={active}
                                setActive={setActive}
                                icon={link.icon}
                            />
                        ))}
                    </Stack>
                    <hr />
                    <h3>Edit</h3>
                    <Stack gap={3} className='link-stack'>
                        {editLinks.map((link) => (
                            <CustomLink
                                key={link.name}
                                name={link.name}
                                active={active}
                                setActive={setActive}
                                icon={link.icon}
                            />
                        ))}
                        <hr />
                        <Backup />
                        <button className='mb-3 w-100 backup' onClick={print}>
                            <i class='bi bi-printer'></i> Print
                        </button>
                    </Stack>
                </nav>
            )}
        </>
    );
}
