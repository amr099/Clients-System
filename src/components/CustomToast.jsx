import React from "react";
import Toast from "react-bootstrap/Toast";

export default function CustomToast({ text, type }) {
    return (
        <Toast bg={type} autoHide='true'>
            <Toast.Header closeButton='true'></Toast.Header>
            <Toast.Body>
                <strong>{text}</strong>
            </Toast.Body>
        </Toast>
    );
}
