import React from "react";

export default function DateAndComment() {
    return (
        <>
            <div class='mb-4'>
                <label className='form-label'>Comment</label>
                <textarea class='form-control'></textarea>
            </div>
            <div class='mb-4'>
                <label class='form-label'>
                    Date<span>*</span>
                </label>
                <input type='date' class='form-control' required />
            </div>
        </>
    );
}
