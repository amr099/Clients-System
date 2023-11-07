import React, { useContext, useEffect } from "react";
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FirebaseContext } from "context/FirebaseContext";
import { useForm } from "react-hook-form";
import { db } from "firebase-config";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ServicesList() {
  const { register, handleSubmit } = useForm();
  const { servicesData } = useContext(FirebaseContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addService = async (data) => {
    try {
      setDoc(doc(db, "Services", data.newService), {
        name: data.newService,
      });
    } catch (e) {
      console.log(e.message);
      console.log("error adding new service.");
    }
  };

  const onDelete = async (e) => {
    e.preventDefault();
    const service = e.target[0].value;
    const res = window.confirm(
      `Are you sure about deleting service: ${service} ? `
    );
    if (res) {
      deleteDoc(doc(db, "Services", service));
      e.target.reset();
    } else {
      return;
    }
  };

  return (
    <>
      <Alert className="alert alert-primary m-4">
        <h2>Edit Services List</h2>
      </Alert>
      <Container className="w-75 mx-auto mt-4">
        <form onSubmit={handleSubmit(addService)}>
          <Row>
            <Col xs={10}>
              <Form.Control
                className="mb-3"
                placeholder="Add new service ..."
                {...register("newService", {
                  required: true,
                })}
              />
            </Col>
            <Col>
              <Button type="submit" variant="success">
                Add
              </Button>
            </Col>
          </Row>
        </form>
        <hr />
        <form onSubmit={(e) => onDelete(e)}>
          <Row className="mt-4">
            <Col xs={10}>
              <Form.Select className="mb-3">
                {servicesData.services?.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}{" "}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Button type="submit" variant="danger">
                Delete
              </Button>
            </Col>
          </Row>
        </form>
      </Container>
    </>
  );
}
