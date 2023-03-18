import React from "react";
import { Link } from "react-router-dom";
import Backup from "./Backup";

export default function Nav() {
    return (
        <nav className='d-flex flex-column sidenav w-25'>
            <h2>Dashboard</h2>
            <h3>Add</h3>

            <Link to='client'>
                <i class='bi bi-person-plus'></i> <span>Client</span>
            </Link>
            <Link to='transaction'>
                <i class='bi bi-stack'></i> <span>Transaction</span>
            </Link>
            <Link to='payment'>
                <i class='bi bi-wallet'></i> <span>Payment</span>
            </Link>
            <Link to='expense'>
                <i class='bi bi-cash-coin'></i> <span>Expense</span>
            </Link>
            <hr />
            <h3>View</h3>

            <Link to='transactions'>
                <i class='bi bi-card-list'></i> <span>Transactions</span>
            </Link>
            <Link to='revenues'>
                <i class='bi bi-bar-chart'></i> <span>Revenues</span>
            </Link>
            <Link to='expenses'>
                <i class='bi bi-bar-chart'></i> <span>Expnenes</span>
            </Link>

            <hr />
            <h3>Edit</h3>

            <Link to='clientinfo'>
                <i class='bi bi-pencil-square'></i> <span>Client Info.</span>
            </Link>
            <Link to='serviceslist'>
                <i class='bi bi-file-earmark-text'></i>{" "}
                <span>Services List</span>
            </Link>
            <hr />
            <Backup />
        </nav>
    );
}
