import { useState } from "react";

function useSignUpStep(initialState: string) {
    const [state, setState] = useState(initialState)

    const updateState = (newValue: string) => {
        setState(newValue);
    };

    return [state, updateState];
}

export default useSignUpStep;