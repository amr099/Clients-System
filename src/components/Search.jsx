import { Form, Button, Stack } from "react-bootstrap";

export default function Search({ onSearch }) {
    return (
        <Form.Control
            type='search'
            placeholder='Search for client'
            onChange={(e) => onSearch(e.target.value)}
        />
    );
}
