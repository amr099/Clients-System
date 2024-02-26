import React, { useContext, useEffect, useReducer, useState } from "react";
import { db } from "firebase-config";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { reducer, initialValues } from "./reducer";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Alert, Button, Col, Form, Spinner } from "react-bootstrap";
import { FirebaseContext } from "context/FirebaseContext";
import ServicesList from "../components/ServicesList";

export default function TransactionForm() {
    const { id } = useParams();
    const { clientsData } = useContext(FirebaseContext);
    const [service, setService] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [state, dispatch] = useReducer(reducer, initialValues);

    const onSubmit = async (data) => {
        dispatch({ type: "LOADING" });
        try {
            let clientRef = doc(db, "Clients", id);

            await updateDoc(clientRef, {
                transactions: arrayUnion({
                    service: service,
                    cost: data.cost,
                    payment: data.payment,
                    comment: data.comment,
                    date: new Date(data.date).toLocaleDateString("en-GB"),
                }),
            });
            reset();
            dispatch({ type: "SUCCESS" });
        } catch (e) {
            console.log(e);
            dispatch({
                type: "ERROR",
                payload: `Unexpected Error Occured While Adding New Transaction.`,
            });
        }
    };

    const { name } = clientsData?.clients?.find((c) => c.id == id);

    return (
        <Col md={{ offset: 1, span: 7 }} xs={{ span: 9 }} className='mt-4'>
            <h2 className='form-heading mb-4'>New Transaction to {name}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {state?.success && (
                    <Alert
                        variant='success'
                        className='d-flex justify-content-between'
                    >
                        <strong>
                            Transaction has been added successfully.
                        </strong>
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
                <ServicesList service={service} setService={setService} />
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Cost <span>*</span>
                    </Form.Label>
                    <Form.Control
                        {...register("cost", {
                            required: {
                                value: true,
                                message: "Cost is required",
                            },
                            pattern: {
                                value: /^[0-9]+(?:[,.][0-9]{1,2})?$/,
                                message: "Invalid cost amount",
                            },
                        })}
                        isInvalid={!!errors.cost}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.cost && errors.cost.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Payment <span>*</span>
                    </Form.Label>
                    <Form.Control
                        {...register("payment", {
                            required: {
                                value: true,
                                message: "Payment is required",
                            },
                            pattern: {
                                value: /^[0-9]+(?:[,.][0-9]{1,2})?$/,
                                message: "Invalid payment amount",
                            },
                        })}
                        isInvalid={!!errors.payment}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.payment && errors.payment.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Date <span>*</span>
                    </Form.Label>
                    <Form.Control
                        type='date'
                        {...register("date", { required: true })}
                        isInvalid={!!errors.date}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.date && errors.date.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as='textarea' {...register("comment", {})} />
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
