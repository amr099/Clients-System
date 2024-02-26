import { FirebaseContext } from "context/FirebaseContext";
import { db } from "firebase-config";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { Form, Button, Stack, Dropdown, InputGroup } from "react-bootstrap";

export default function ServicesList({ service, setService }) {
    const [newService, setNewService] = useState("");
    const { servicesData } = useContext(FirebaseContext);

    const onDelete = (service) => {
        const res = window.confirm(
            `Are you sure about deleting service: ${service} ? `
        );
        if (res) {
            deleteDoc(doc(db, "Services", service));
            e.target.reset();
        } else {
            return;
        }
    };
    const addNewService = () => {
        try {
            setDoc(doc(db, "Services", newService), {
                name: newService,
            });
            e.target.reset();
        } catch (e) {
            console.log(e.message);
            console.log("error adding new service.");
        }
    };
    return (
        <Dropdown>
            <Dropdown.Toggle
                variant='dark'
                id='dropdown-basic'
                className='w-100 mb-2'
            >
                {!service ? "Select Service" : service}
            </Dropdown.Toggle>

            <Dropdown.Menu className='w-100 h-90vh overflow-y-auto'>
                <InputGroup className='w-75 mb-4 mx-auto'>
                    <Form.Control
                        placeholder='New service'
                        aria-label='New service'
                        aria-describedby='basic-addon2'
                        onChange={(e) => setNewService(e.target.value)}
                    />
                    <Button
                        variant='outline-success'
                        id='button-addon2'
                        onClick={() => addNewService(newService)}
                        className='px-2'
                    >
                        <i className='bi bi-plus-circle'></i>
                    </Button>
                </InputGroup>
                {servicesData?.services?.map((s) => (
                    <Dropdown.Item onClick={() => setService(s.name)}>
                        <Stack direction='horizontal' gap={4}>
                            <span>{s.name}</span>
                            <i
                                className='bi bi-trash btn btn-outline-danger ms-auto'
                                onClick={() => onDelete(s.name)}
                            ></i>
                        </Stack>
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>

        // <Form.Group className='mb-3'>
        //     <Form.Label>
        //         Service <span>*</span>
        //     </Form.Label>
        //     <div className='dropdown'>
        //         <button
        //             className='btn btn-secondary dropdown-toggle'
        //             type='button'
        //             id='dropdownMenuButton'
        //             data-bs-toggle='dropdown'
        //             aria-expanded='false'
        //         >
        //             Select Service
        //         </button>
        //         <ul
        //             className='dropdown-menu'
        //             aria-labelledby='dropdownMenuButton'
        //         >
        //             {servicesData.loading && (
        //                 <li>
        //                     <a className='dropdown-item' href='#'>
        //                         Loading ...
        //                     </a>
        //                 </li>
        //             )}
        //             {servicesData.services?.map((s) => (
        //                 <li key={s.name}>
        //                     <a className='dropdown-item' href='#'>
        //                         {s.name}
        //                     </a>
        //                     <Button
        //                         variant='danger'
        //                         size='sm'
        //                         onClick={() => onDelete(s.name)}
        //                     >
        //                         Delete
        //                     </Button>
        //                 </li>
        //             ))}
        //             <li>
        //                 <hr className='dropdown-divider' />
        //                 <input
        //                     type='text'
        //                     className='form-control'
        //                     placeholder='New Service'
        //                     value={newService}
        //                     onChange={(e) => setNewService(e.target.value)}
        //                 />
        //                 <Button
        //                     variant='primary'
        //                     size='sm'
        //                     onClick={addNewService}
        //                 >
        //                     Add
        //                 </Button>
        //             </li>
        //         </ul>
        //     </div>
        //     {errors.service && (
        //         <span className='error'> This field is required</span>
        //     )}
        // </Form.Group>
    );
}
