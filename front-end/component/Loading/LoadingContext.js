import React, {useState} from 'react'

export const LoadingContext = React.createContext();

export default function LoadingProvider({children}) {
    const [loading, setLoading] = useState(false);

    const loadingState = {
        isLoading: loading,
        setLoadingState: changeLoadingState
    }

    return (
        <LoadingContext.Provider value={loadingState}>
            {children}
        </LoadingContext.Provider>
    );

    function changeLoadingState(state) {
        setLoading(state);
    }
}