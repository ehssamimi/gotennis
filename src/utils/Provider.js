import React from 'react';
import {BreadcrumbProvider} from "../context/Breadcrumb";
import {FormProvider} from "../context/Form";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let Provider = ({children}) => {

    return (
        <BreadcrumbProvider>
            <FormProvider>
                {children}
                <ToastContainer/>
            </FormProvider>
        </BreadcrumbProvider>
    );
}

export default Provider;