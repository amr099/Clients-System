import { db } from "firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";

export default function DeleteModal({ id, clientName }) {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onDelete = async () => {
        setLoading(true);
        if (name === clientName) {
            await deleteDoc(doc(db, "Clients", id));
            handleClose();
        } else {
            setError("Name is not correct");
        }
        setLoading(false);
    };
    return (
        <>
            <i
                className='bi bi-trash-fill btn btn-outline-danger'
                onClick={handleShow}
            ></i>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Client</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        size='lg'
                        type='text'
                        placeholder='Enter Client name you wanna Delete'
                        onChange={(e) => setName(e.target.value)}
                    />
                    {error && (
                        <Form.Text className='text-muted'>{error}</Form.Text>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    {loading ? (
                        <Button variant='primary' disabled>
                            <Spinner
                                as='span'
                                animation='border'
                                size='sm'
                                role='status'
                                aria-hidden='true'
                            />
                            Loading...
                        </Button>
                    ) : (
                        <Button variant='danger' onClick={onDelete}>
                            Delete
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
}
