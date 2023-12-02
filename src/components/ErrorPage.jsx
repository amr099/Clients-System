import { Container } from "react-bootstrap";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <Container
            id='error-page'
            className='text-center vh-100 d-flex flex-column justify-content-center align-items-center'
        >
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Link className='btn btn-primary' to={"/"}>
                Try Again
            </Link>
        </Container>
    );
}
