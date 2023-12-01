import React, { useContext, useEffect } from "react";
import { FirebaseContext } from "context/FirebaseContext";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function CustomForm({ label, state, onSubmit, inputs }) {
    const { servicesData, clientsData } = useContext(FirebaseContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Alert variant='primary m-4'>
                <h2>{label}</h2>
            </Alert>
            <Container className='w-75 mx-auto m-4 form-container'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {inputs?.find((i) => i === "newClientName") && (
                        <>
                            <Form.Group className='mb-3'>
                                <Form.Label>
                                    Name <span>*</span>
                                </Form.Label>
                                <Form.Control
                                    {...register("newClientName", {
                                        required: true,
                                        pattern: /^[A-Za-z ]+$/i,
                                    })}
                                />
                                {errors.newClientName?.type === "required" && (
                                    <span className='error'>
                                        {" "}
                                        This field is required.
                                    </span>
                                )}
                                {errors.newClientName?.type === "pattern" && (
                                    <span className='error'>
                                        {" "}
                                        Name must contain letters only.
                                    </span>
                                )}
                            </Form.Group>
                        </>
                    )}

                    {inputs?.find((i) => i === "selectClient") && (
                        <>
                            <Form.Group className='mb-3'>
                                <Form.Label>
                                    Name <span>*</span>
                                </Form.Label>
                                <Form.Select
                                    {...register("clientName", {
                                        required: true,
                                    })}
                                >
                                    {clientsData.loading && (
                                        <option disabled selected>
                                            Loading ...
                                        </option>
                                    )}
                                    {clientsData?.clients?.map((c) => (
                                        <option key={c.name} value={c.name}>
                                            {c.name}
                                        </option>
                                    ))}
                                </Form.Select>
                                {errors.clientName?.type === "required" && (
                                    <span className='error'>
                                        {" "}
                                        This field is required
                                    </span>
                                )}
                            </Form.Group>
                        </>
                    )}
                    {inputs?.find((i) => i === "newClient") && (
                        <>
                            <Row>
                                <Col>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>
                                            Code <span>*</span>
                                        </Form.Label>
                                        <Form.Control
                                            type='number'
                                            {...register("code", {
                                                required: true,
                                            })}
                                        />
                                        {errors.code?.type === "required" && (
                                            <span className='error'>
                                                {" "}
                                                This field is required.
                                            </span>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>
                                            Registration Number
                                        </Form.Label>
                                        <Form.Control
                                            type='number'
                                            {...register("reg", {})}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </>
                    )}
                    {inputs?.find((i) => i === "service") && (
                        <Form.Group className='mb-3'>
                            <Form.Label>
                                Service <span>*</span>
                            </Form.Label>
                            <Form.Select
                                {...register("service", { required: true })}
                            >
                                {servicesData.loading && (
                                    <option disabled selected>
                                        Loading ...
                                    </option>
                                )}
                                {servicesData.services?.map((s) => (
                                    <option key={s.name} value={s.name}>
                                        {s.name}
                                    </option>
                                ))}
                            </Form.Select>
                            {errors.service && (
                                <span className='error'>
                                    {" "}
                                    This field is required
                                </span>
                            )}
                        </Form.Group>
                    )}
                    {inputs?.find((i) => i === "cost") && (
                        <Form.Group className='mb-3'>
                            <Form.Label>
                                Cost <span>*</span>
                            </Form.Label>
                            <Form.Control
                                type='number'
                                {...register("cost", { required: true })}
                            />
                            {errors.cost && (
                                <span className='error'>
                                    {" "}
                                    This field is required
                                </span>
                            )}
                        </Form.Group>
                    )}
                    {inputs?.find((i) => i === "payment") && (
                        <Form.Group className='mb-3'>
                            <Form.Label>
                                Payment <span>*</span>
                            </Form.Label>
                            <Form.Control
                                type='number'
                                {...register("payment", { required: true })}
                            />
                            {errors.payment && (
                                <span className='error'>
                                    {" "}
                                    This field is required
                                </span>
                            )}
                        </Form.Group>
                    )}
                    {inputs?.find((i) => i === "expense") && (
                        <>
                            <Form.Group className='mb-3'>
                                <Form.Label>
                                    Cost <span>*</span>
                                </Form.Label>
                                <Form.Control
                                    type='number'
                                    {...register("expcost", {
                                        required: true,
                                    })}
                                />
                                {errors.expcost && (
                                    <span className='error'>
                                        {" "}
                                        This field is required
                                    </span>
                                )}
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>
                                    Expense <span>*</span>
                                </Form.Label>
                                <Form.Control
                                    {...register("expense", {
                                        required: true,
                                    })}
                                />
                                {errors.expense && (
                                    <span className='error'>
                                        {" "}
                                        This field is required
                                    </span>
                                )}
                            </Form.Group>
                        </>
                    )}

                    {inputs?.find((i) => i === "dateAndComment") && (
                        <>
                            <Form.Group className='mb-3'>
                                <Form.Label>
                                    Date <span>*</span>
                                </Form.Label>
                                <Form.Control
                                    type='date'
                                    {...register("date", { required: true })}
                                />
                                {errors.date && (
                                    <span className='error'>
                                        {" "}
                                        This field is required
                                    </span>
                                )}
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    {...register("comment", {})}
                                />
                            </Form.Group>
                        </>
                    )}
                    {inputs?.find((i) => i === "newClient") && (
                        <>
                            <Form.Group className='mb-3'>
                                <Form.Label>Address</Form.Label>
                                <Form.Control {...register("address", {})} />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control {...register("phone", {})} />
                                {errors.date?.type === "pattern" && (
                                    <span className='error'>
                                        {" "}
                                        Phone Number must not have letters
                                    </span>
                                )}
                            </Form.Group>
                        </>
                    )}
                    {state?.success && (
                        <Toast bg='success' autohide='true'>
                            <Toast.Body>
                                <strong>Saved.</strong>
                            </Toast.Body>
                        </Toast>
                    )}
                    {state?.error && (
                        <Toast bg='warning' autohide='true'>
                            <Toast.Body>
                                <strong>{state?.error}</strong>
                            </Toast.Body>
                        </Toast>
                    )}
                    {state?.loading ? (
                        <Button variant='primary w-100 mt-3' disabled>
                            Saving…
                        </Button>
                    ) : (
                        <Button
                            variant='outline-primary w-100 mt-3'
                            type='submit'
                        >
                            Submit
                        </Button>
                    )}
                </form>
            </Container>
        </>
    );
}
