import React  from 'react';
import Header from "../../Layout/Header";

const MainDiv = (props) => {


    return (
        <>
            <Header {...props}/>
            {
                props.children
            }
        </>
    );
};

export default MainDiv;