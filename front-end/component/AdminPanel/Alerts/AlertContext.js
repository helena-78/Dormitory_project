import React, {useState} from 'react'

export const AlertContext = React.createContext();

export default function AlertProvider({children}){
    const [errorOccurredState, setErrorOccurredState] = useState(false);
    const [successState, setSuccessState] = useState(false);

    const alertStates = {
        errorOccurredState: errorOccurredState,
        setErrorOccurredState: changeErrorOccurredState,
        successState: successState,
        setSuccessState: changeSuccessState
    }

    return(
      <AlertContext.Provider value={alertStates}>
          {children}
      </AlertContext.Provider>
    );

    function changeErrorOccurredState(){
        setErrorOccurredState(true);
        setTimeout(()=>setErrorOccurredState(false), 4000)
    }

    function changeSuccessState() {
        setSuccessState(true);
        setTimeout(()=>setSuccessState(false), 4000)
    }
}