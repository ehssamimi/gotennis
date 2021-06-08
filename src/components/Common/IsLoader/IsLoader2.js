import React, {useState, useEffect} from 'react';
 import Loader from "./Loader/Loader";



const IsLoader2 = (props) => {
    let{isLoader}=props;
    useEffect(() => {
        // Update the document title using the browser API
        // document.title = `You clicked ${count} times`;
    });

    return (
        <div className="w-100  h-100">
            {
                isLoader
                    ? <div className=' w-100 flex-center h-100  '>
                    <div className='w-15'>
                        <Loader/>

                    </div>

                        {/*<img src={CirculeLogo} alt="logo" className='spinner w-25'  />*/}

                    </div> :
                    <div>
                        {props.children}
                    </div>

            }
        </div>
    );
};

export default IsLoader2;