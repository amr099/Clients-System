import React, { useContext, useState } from "react";
import Backup from "./Backup";
import Stack from "react-bootstrap/Stack";
import CustomLink from "./Link";
import Button from "react-bootstrap/Button";
import { PrintContext } from "context/PrintContext";
import Restore from "./Restore";

export default function Nav() {
  const [active, setActive] = useState("");
  const { printMode, setPrint } = useContext(PrintContext);

  const print = async () => {
    await setPrint(true);
    window.print();
  };

  return (
    <>
      {!printMode && (
        <nav>
          <h3>New</h3>
          <Stack gap={3} className="link-stack">
            <CustomLink
              name={"Client"}
              active={active}
              setActive={setActive}
              icon={"bi bi-person-plus"}
            />
            <CustomLink
              name={"Transaction"}
              active={active}
              setActive={setActive}
              icon={"bi bi-stack"}
            />
            <CustomLink
              name={"Payment"}
              active={active}
              setActive={setActive}
              icon={"bi bi-wallet"}
            />
            <CustomLink
              name={"Expense"}
              active={active}
              setActive={setActive}
              icon={"bi bi-coin"}
            />
          </Stack>
          <hr />
          <h3>View</h3>
          <Stack gap={3} className="link-stack">
            <CustomLink
              name={"Transactions"}
              active={active}
              setActive={setActive}
              icon={"bi bi-card-list"}
            />
            <CustomLink
              name={"Expenses"}
              active={active}
              setActive={setActive}
              icon={"bi bi-cash-coin"}
            />
            {/* <CustomLink
              name={"RevenuesChart"}
              active={active}
              setActive={setActive}
              icon={"bi bi-bar-chart"}
            /> */}
          </Stack>
          <hr />
          <h3>Edit</h3>
          <Stack gap={3} className="link-stack">
            <CustomLink
              name={"Client Info"}
              active={active}
              setActive={setActive}
              icon={"bi bi-pencil-square"}
            />
            <CustomLink
              name={"Services List"}
              active={active}
              setActive={setActive}
              icon={"bi bi-file-earmark-text"}
            />
            <hr />
            <Backup />
            <button className="mb-3 w-100 backup" onClick={print}>
              <i class="bi bi-printer"></i> Print
            </button>
          </Stack>
        </nav>
      )}
    </>
  );
}
