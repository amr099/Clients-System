export const reducer = (state, action) => {
    switch (action.type) {
        case "SUCCESS":
            return { success: true, loading: false, error: "" };
        case "LOADING":
            return { success: false, loading: true, error: "" };
        case "ERROR":
            return { success: false, loading: false, error: action.payload };
    }
};

export const initialValues = {
    success: false,
    loading: false,
    error: "",
};
