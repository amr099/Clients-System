import { Dropdown } from "react-bootstrap";

export default function Sort({ setSort }) {
    return (
        <Dropdown className='w-100'>
            <Dropdown.Toggle
                variant='dark'
                id='dropdown-basic'
                className='w-100'
            >
                Sort
            </Dropdown.Toggle>

            <Dropdown.Menu className='w-100'>
                <Dropdown.Item onClick={() => setSort("a-z")}>
                    Alphabeticaly(A-Z)
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSort("z-a")}>
                    Alphabeticaly(Z-A)
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSort("newest")}>
                    Recent
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSort("oldest")}>
                    Earlier
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
