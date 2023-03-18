import React, { useContext } from "react";
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FirebaseContext } from "context/FirebaseContext";
import { useForm } from "react-hook-form";
import { db } from "firebase-config";

export default function ServicesList() {
    const { register, handleSubmit } = useForm();
    const { services } = useContext(FirebaseContext);
    const addService = async (data) => {
        try {
            setDoc(doc(db, "Services", data.newService), {
                name: data.newService,
            });
        } catch (e) {
            console.log(e.message);
            console.log("error adding new service.");
        }
    };

    const onDelete = async (e) => {
        e.preventDefault();
        const service = e.target[0].value;
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

    return (
        <div className='d-flex flex-column mx-auto mt-4 w-50'>
            <form
                className='row g-3 needs-validation'
                onSubmit={handleSubmit(addService)}
            >
                <h1 className='alert alert-warning'> Edit Services List</h1>
                <div className='d-flex flex-wrap mb-4'>
                    <div className='mb-1 w-50'>
                        <Form.Group className='mb-3'>
                            <Form.Label>New Service</Form.Label>
                            <Form.Control
                                {...register("newService", { required: true })}
                            />
                        </Form.Group>
                        <Button type='submit' variant='primary'>
                            Add
                        </Button>
                    </div>
                </div>
            </form>
            <hr />
            <form onSubmit={(e) => onDelete(e)}>
                <div className='w-50 mt-4'>
                    <Form.Select className='mb-3'>
                        {services?.map((s) => (
                            <option key={s.name} value={s.name}>
                                {s.name}{" "}
                            </option>
                        ))}
                    </Form.Select>
                    <Button type='submit' variant='danger'>
                        Delete
                    </Button>
                </div>
            </form>
        </div>
    );
}
