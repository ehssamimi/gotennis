import React, {createContext, useContext, useReducer} from 'react';

let FormContext = createContext(null);

let initializeState = {};


const types = {
    'SET_LOADING': 'SET_LOADING',
    'SET_ITEMS': 'SET_ITEMS',
}

let reducer = (state, action) => {

    let {items} = action;

    return {...state, ...items};
}

let FormProvider = ({children}) => {

    let [state, dispatch] = useReducer(reducer, initializeState, () => initializeState);

    return (
        <FormContext.Provider value={{state, dispatch}}>
            {children}
        </FormContext.Provider>
    );
}

let useForm = () => {

    let context = useContext(FormContext);

    if (!context)
        throw Error('FormContext not found...');

    let {dispatch, state} = context;

    return {
        state,
        dispatch,
    }
}

export {FormProvider, useForm, types}