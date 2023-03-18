import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";

export default function CustomToast({ text, type }) {
    return (
        <Toast bg={type} autoHide='true'>
            <Toast.Body>
                <strong>{text}</strong>
            </Toast.Body>
        </Toast>
    );
}
