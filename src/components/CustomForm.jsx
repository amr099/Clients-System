import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import { useForm } from "react-hook-form";
import { FirebaseContext } from "context/FirebaseContext";

export default function CustomForm({
    label,
    loading,
    success,
    error,
    onSubmit,
    inputs,
}) {
    const { register, handleSubmit } = useForm();
    const { services, clients } = useContext(FirebaseContext);

    return (
        <div className='d-flex flex-column mx-auto pt-4 w-50 custom-form'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Alert variant='primary'>{label}</Alert>
                {inputs?.find((i) => i === "newClientName") && (
                    <Form.Group className='mb-3'>
                        <Form.Label>
                            Name <span>*</span>
                        </Form.Label>
                        <Form.Control
                            {...register("newClientName", { required: true })}
                        />
                    </Form.Group>
                )}

                {inputs?.find((i) => i === "selectClient") && (
                    <Form.Group className='mb-3'>
                        <Form.Label>Name</Form.Label>
                        <Form.Select
                            {...register("clientName", { required: true })}
                        >
                            {clients?.map((c) => (
                                <option key={c.name} value={c.name}>
                                    {c.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                )}
                {inputs?.find((i) => i === "newClient") && (
                    <>
                        <Form.Group className='mb-3'>
                            <Form.Label>Code</Form.Label>
                            <Form.Control
                                type='number'
                                {...register("code", {})}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Registration Code</Form.Label>
                            <Form.Control {...register("reg", {})} />
                        </Form.Group>
                    </>
                )}
                {inputs?.find((i) => i === "service") && (
                    <Form.Group className='mb-3'>
                        <Form.Label>Service</Form.Label>
                        <Form.Select
                            {...register("service", { required: true })}
                        >
                            {services?.map((s) => (
                                <option key={s.name} value={s.name}>
                                    {s.name}
                                </option>
                            ))}
                        </Form.Select>
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
                        </Form.Group>
                    </>
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
                    </Form.Group>
                )}
                {inputs?.find((i) => i === "dateAndComment") && (
                    <>
                        <Form.Group className='mb-3'>
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type='date'
                                {...register("date", { required: true })}
                            />
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
                        </Form.Group>
                    </>
                )}
                {success && (
                    <Toast bg='success' autohide='true'>
                        <Toast.Body>
                            <strong>تم التسجيل</strong>
                        </Toast.Body>
                    </Toast>
                )}
                {error && (
                    <Toast bg='warning' autohide='true'>
                        <Toast.Body>
                            <strong>{error}</strong>
                        </Toast.Body>
                    </Toast>
                )}
                {loading ? (
                    <Button variant='primary' disabled>
                        Loading…
                    </Button>
                ) : (
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                )}
            </form>
        </div>
    );
}
