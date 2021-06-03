import React, {createContext, useContext, useState} from 'react';

let BreadcrumbContext = createContext(null);


let BreadcrumbProvider = ({children}) => {

    let [breadcrumb, setBreadcrumb] = useState([]);

    return (
        <BreadcrumbContext.Provider value={{breadcrumb, setBreadcrumb}}>
            {children}
        </BreadcrumbContext.Provider>
    );
}

let useBreadcrumb = () => {

    let context = useContext(BreadcrumbContext);

    if (!context)
        throw Error('BreadcrumbContext not found...');

    let {breadcrumb, setBreadcrumb} = context;

    return {
        breadcrumb,
        setBreadcrumb,
    }
}

export {BreadcrumbProvider, useBreadcrumb}