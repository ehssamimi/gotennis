import React, {useState, useEffect} from 'react';



const IsLoaderEmpty = (props) => {
    let{isLoader}=props;


    return (
        <div className="w-100  ">
            {
                isLoader ? "" : props.children
            }
        </div>
    );
};

export default IsLoaderEmpty;