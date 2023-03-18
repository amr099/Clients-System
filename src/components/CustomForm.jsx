import React from "react";
import CustomToast from "./CustomToast";
import DateAndComment from "./DateAndComment";
import SelectClient from "./SelectClient";
import SelectService from "./SelectService";

export default function CustomForm({
    label,
    loading,
    success,
    error,
    onSubmit,
    inputs,
}) {
    return (
        <>
            <div className='d-flex flex-column mx-auto pt-4 w-50 custom-form'>
                <form onSubmit={onSubmit}>
                    <h1 className='alert alert-success'>{label}</h1>
                    {inputs?.find((i) => i === "newClientName") && (
                        <div class='mb-3'>
                            <label class='form-label'>
                                Name<span>*</span>
                            </label>
                            <input type='text' class='form-control' required />
                        </div>
                    )}

                    {inputs?.find((i) => i === "selectClient") && (
                        <SelectClient />
                    )}
                    {inputs?.find((i) => i === "newClient") && (
                        <>
                            <div class='mb-4'>
                                <label class='form-label'>Code</label>
                                <input type='number' class='form-control' />
                            </div>
                            <div class='mb-4'>
                                <label class='form-label'>
                                    Registration Number{" "}
                                </label>
                                <input type='string' class='form-control' />
                            </div>
                        </>
                    )}
                    {inputs?.find((i) => i === "service") && <SelectService />}
                    {inputs?.find((i) => i === "cost") && (
                        <div class='mb-4'>
                            <label class='form-label'>
                                Price<span>*</span>
                            </label>
                            <input
                                type='number'
                                class='form-control'
                                required
                            />
                        </div>
                    )}
                    {inputs?.find((i) => i === "expense") && (
                        <>
                            <div class='mb-4'>
                                <label class='form-label'>
                                    Amount<span>*</span>
                                </label>
                                <input
                                    type='number'
                                    class='form-control'
                                    required
                                />
                            </div>
                            <div class='mb-4'>
                                <label class='form-label'>
                                    Expense<span>*</span>
                                </label>
                                <input
                                    type='text'
                                    class='form-control'
                                    required
                                />
                            </div>
                        </>
                    )}
                    {inputs?.find((i) => i === "payment") && (
                        <div class='mb-4'>
                            <label class='form-label'>
                                Payment<span>*</span>
                            </label>
                            <input
                                type='number'
                                class='form-control'
                                required
                            />
                        </div>
                    )}
                    {inputs?.find((i) => i === "dateAndComment") && (
                        <DateAndComment />
                    )}
                    {inputs?.find((i) => i === "newClient") && (
                        <>
                            <div class='mb-4'>
                                <label class='form-label'>Address</label>
                                <input type='text' class='form-control' />
                            </div>
                            <div class='mb-4'>
                                <label class='form-label'>Mobile Number </label>
                                <input type='text' class='form-control' />
                            </div>{" "}
                        </>
                    )}
                    {success && (
                        <CustomToast type='success' text='تم التسجيل' />
                    )}
                    {error && <CustomToast type='warning' text={error} />}
                    {loading ? (
                        <button
                            class='btn btn-primary my-4 w-100'
                            type='button'
                            disabled
                        >
                            Loading ...
                            <span
                                class='spinner-border spinner-border-sm'
                                role='status'
                                aria-hidden='true'
                            ></span>
                        </button>
                    ) : (
                        <button className='btn btn-success my-4 w-100'>
                            Submit
                        </button>
                    )}
                </form>
            </div>
        </>
    );
}
