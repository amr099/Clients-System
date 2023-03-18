import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";

export default function SignIn() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const In = async (e) => {
        setError("");
        setLoading(false);
        e.preventDefault();
        let logEmail = e.target[0].value;
        let logPassword = e.target[1].value;
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, logEmail, logPassword);
            navigate("/");
            setLoading(false);
        } catch (e) {
            if (
                e.message === "Firebase: Error (auth/invalid-email)." ||
                e.message === "Firebase: Error (auth/user-not-found)."
            ) {
                setError("البريد الالكترونى غير صحيح");
                setLoading(false);

                console.log(e.message);
            } else if (e.message === "Firebase: Error (auth/wrong-password).") {
                setError("كلمة السر غير صحيحة");
                setLoading(false);

                console.log(e.message);
                e.target[1].value = "";
            } else {
                console.log(e.message);
                setError("خطأ");
                setLoading(false);
            }
        }
    };

    return (
        <div
            className=' d-flex justify-content-center align-items-center sign-in'
            style={{ height: "100vh" }}
        >
            <div className='sign-in-box p-4'>
                <form onSubmit={In}>
                    <h3>تسجيل الدخول</h3>
                    <div class='form-group p-4'>
                        <label className='mb-3'>البريد الالكترونى</label>
                        <input
                            type='email'
                            name='email'
                            class='form-control'
                            required
                        />
                    </div>
                    <div class='form-group p-4'>
                        <label className='mb-3'> كلمة السر</label>
                        <input
                            type='password'
                            name='password'
                            class='form-control'
                            required
                        />
                    </div>
                    {loading ? (
                        <button
                            class='btn btn-primary m-4'
                            type='button'
                            disabled
                        >
                            برجاء الانتظار...
                            <span
                                class='spinner-border spinner-border-sm'
                                role='status'
                                aria-hidden='true'
                            ></span>
                        </button>
                    ) : (
                        <button
                            type='submit'
                            class='btn btn-outline-primary m-4'
                        >
                            تسجيل الدخول
                        </button>
                    )}

                    {error && (
                        <div className='alert alert-danger ' role='alert'>
                            {error}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
