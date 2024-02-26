import React, { useReducer, useContext } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { FirebaseContext } from "context/FirebaseContext";
import { db } from "firebase-config";
import { reducer, initialValues } from "./reducer";
import { useParams } from "react-router";
import {
    Alert,
    Form,
    Container,
    Row,
    Col,
    Button,
    Spinner,
} from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function ClientInfoForm() {
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const [state, dispatch] = useReducer(reducer, initialValues);
    const { clientsData } = useContext(FirebaseContext);
    const { code, reg, phone, address, name } = clientsData.clients.find(
        (c) => c.id == id
    );

    const onSubmit = async (data) => {
        dispatch({ type: "LOADING" });
        if (clientsData?.error) {
            dispatch({
                type: "ERROR",
                payload: "Can't fetch clients data.",
            });
            return;
        }
        if (clientsData?.clients.find((c) => c.code === data.code)) {
            dispatch({ type: "ERROR", payload: "Code already exists." });
            return;
        }
        if (
            data.reg != "" &&
            clientsData?.clients.find((c) => c.reg === data.reg)
        ) {
            dispatch({
                type: "ERROR",
                payload: "Registeration number already exists.",
            });
            return;
        }

        try {
            let clientDoc = doc(db, "Clients", id);

            if (data.name) await updateDoc(clientDoc, { name: data.name });
            if (data.code) await updateDoc(clientDoc, { code: data.code });
            if (data.reg) await updateDoc(clientDoc, { reg: data.reg });
            if (data.phone) await updateDoc(clientDoc, { phone: data.phone });
            if (data.address)
                await updateDoc(clientDoc, { address: data.address });
            reset();
            dispatch({ type: "SUCCESS" });
        } catch (e) {
            console.log(e);
            dispatch({
                type: "ERROR",
                payload:
                    "Unexpected Error Occured While Editing Client Inforamtion.",
            });
        }
    };

    return (
        <Col md={{ offset: 1, span: 7 }} xs={{ span: 9 }} className='mt-4'>
            <h2 className='form-heading mb-4'>Edit {name}'s information</h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {state?.success && (
                    <Alert
                        variant='success'
                        className='d-flex justify-content-between'
                    >
                        <strong>
                            Client Information has been updated successfully.
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
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Name <span>*</span>
                    </Form.Label>
                    <Form.Control
                        {...register("name", {
                            pattern: {
                                value: /^[A-Za-z\s]+$/i,
                                message: "Name must have letters only",
                            },
                        })}
                        isInvalid={!!errors.name}
                        placeholder={name}
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
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message:
                                            "Field must contain numbers only!",
                                    },
                                })}
                                isInvalid={!!errors.code}
                                placeholder={code}
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
                                placeholder={reg}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.reg && errors.reg.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className='mb-3'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        {...register("address", {})}
                        placeholder={address}
                    />
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
                        placeholder={phone}
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
