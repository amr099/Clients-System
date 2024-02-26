import React, { useReducer, useContext } from "react";
import { setDoc, arrayUnion, addDoc, collection } from "firebase/firestore";
import { FirebaseContext } from "context/FirebaseContext";
import { db } from "firebase-config";
import { reducer, initialValues } from "./reducer";
import { Alert, Form, Row, Col, Button, Toast, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function ClientForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const [state, dispatch] = useReducer(reducer, initialValues);
    const { clientsData } = useContext(FirebaseContext);

    const onSubmit = async (data) => {
        dispatch({ type: "LOADING" });
        if (clientsData?.error) {
            dispatch({
                type: "ERROR",
                payload: "Can't fetch clients data.",
            });
            return;
        }

        if (
            clientsData.clients.find(
                (c) => c?.name.toLowerCase() === data?.name.toLowerCase()
            )
        ) {
            dispatch({
                type: "ERROR",
                payload: "Name already exists.",
            });
            return;
        }
        if (clientsData.clients.find((c) => c.code === data.code)) {
            dispatch({
                type: "ERROR",
                payload: "Code already exists.",
            });
            return;
        }
        if (
            data.reg != "" &&
            clientsData.clients.find((c) => c.reg === data.reg)
        ) {
            dispatch({
                type: "ERROR",
                payload: "Registeration number already exists.",
            });
            return;
        }

        try {
            const clientsCollectionRef = collection(db, "Clients");

            const newDocRef = await addDoc(clientsCollectionRef, {
                name: data.name,
                code: data.code,
                reg: data.reg,
                address: data.address,
                phone: data.phone,
                transactions: arrayUnion(),
            });
            const newDocId = newDocRef.id;
            await setDoc(newDocRef, {
                id: newDocId,
                name: data.name,
                code: data.code,
                reg: data.reg,
                address: data.address,
                phone: data.phone,
                createdAt: new Date().toLocaleDateString("en-GB"),
                transactions: arrayUnion(),
            });
            reset();
            dispatch({ type: "SUCCESS" });
        } catch (e) {
            console.log(e);
            dispatch({
                type: "ERROR",
                payload: `Unexpected Error Occured While Adding New Client.`,
            });
        }
    };

    return (
        <Col md={{ offset: 1, span: 7 }} xs={{ span: 9 }} className='mt-4'>
            <h2 className='form-heading mb-4'>New Client</h2>

            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                {state?.success && (
                    <Alert
                        variant='success'
                        className='d-flex justify-content-between'
                    >
                        <strong>Client has been added successfully.</strong>
                        <i className='bi bi-check-circle-fill'></i>
                    </Alert>
                )}
                {state?.error && (
                    <Alert
                        variant='warning'
                        className='d-flex justify-content-between'
                    >
                        <strong>{state?.error}</strong>
                        <i className='bi bi-exclamation-circle-fill'></i>
                    </Alert>
                )}
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Name <span>*</span>
                    </Form.Label>
                    <Form.Control
                        {...register("name", {
                            required: {
                                value: true,
                                message: "You should provide your name!",
                            },
                            pattern: {
                                value: /^[A-Za-z\s]+$/i,
                                message: "Name must have letters only",
                            },
                        })}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.name && errors.name.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Row>
                    <Col md={6} xs={12}>
                        <Form.Group className='mb-3'>
                            <Form.Label>
                                Code <span>*</span>
                            </Form.Label>
                            <Form.Control
                                {...register("code", {
                                    required: {
                                        value: true,
                                        message: "Code is required",
                                    },
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message:
                                            "Field must contain numbers only!",
                                    },
                                })}
                                isInvalid={!!errors.code}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.code && errors.code.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6} xs={12}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Registration Number</Form.Label>
                            <Form.Control
                                {...register("reg", {
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message:
                                            "Field must contain numbers only!",
                                    },
                                })}
                                isInvalid={!!errors.reg}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.reg && errors.reg.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className='mb-3'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control {...register("address", {})} />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        {...register("phone", {
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "Invalid phone number",
                            },
                        })}
                        isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.phone && errors.phone.message}
                    </Form.Control.Feedback>
                </Form.Group>

                {state?.loading ? (
                    <Button variant='primary' disabled>
                        <Spinner
                            as='span'
                            animation='grow'
                            size='sm'
                            role='status'
                            aria-hidden='true'
                        />
                        Loading...
                    </Button>
                ) : (
                    <Button variant='primary' className='w-100' type='submit'>
                        Submit
                    </Button>
                )}
            </form>
        </Col>
    );
}
