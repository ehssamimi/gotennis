import React from 'react';
import {BreadcrumbProvider} from "../context/Breadcrumb";
import {FormProvider} from "../context/Form";

let Provider = ({children}) => {

    return (
        <BreadcrumbProvider>
            <FormProvider>
                {children}
            </FormProvider>
        </BreadcrumbProvider>
    );
}

export default Provider;