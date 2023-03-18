import React from "react";
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import SelectService from "components/SelectService";

export default function ServicesList() {
    const addService = async (e) => {
        e.preventDefault();
        let newService = e.target[0].value;
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

    const onDelete = async (service, e) => {
        e.preventDefault();
        deleteDoc(doc(db, "Services", service));
        e.target.reset();
    };

    return (
        <div className='d-flex flex-column mx-auto mt-4 w-50'>
            <form class='row g-3 needs-validation' onSubmit={addService}>
                <h1 className='alert alert-warning'> Edit Services List</h1>
                <div className='d-flex flex-wrap mb-4'>
                    <div class='mb-1 w-50'>
                        <label class='form-label'>New Service</label>
                        <input type='text' class='form-control' required />
                        <button className='btn btn-success mt-3'>Add</button>
                    </div>
                </div>
            </form>
            <hr />
            <form onSubmit={(e) => onDelete(e)}>
                <div className='w-50'>
                    <SelectService />
                    <button className='btn btn-danger'>Delete</button>
                </div>
            </form>
        </div>
    );
}
