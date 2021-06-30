import React, {useState, useEffect} from 'react';

const Loadrgreen=()=>{
    return(
        <svg    width="50x" height="50px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" fill="none" stroke="#339d68" strokeWidth="9" r="40" strokeDasharray="188.49555921538757 64.83185307179586">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
            </circle>
        </svg>
    )
}

const TotalLoader = (props) => {
    const [isLoading, setisLoading] = useState(true);
    useEffect(() => {
        setisLoading(props.isLoading)
    }, [props.isLoading]);

    return (
        <div className={['w-100 position-relative' , props.DivClass].join(" ")}>
            {
                props.children
            }
            {
                isLoading?
                    <div className='w-100   flex-center  position-absolute' style={{top:0,left:0,height:'100vh',background: 'rgba(1, 100, 17, 0.2)'}}>

                        <Loadrgreen/>

                    </div> :""
            }


        </div>
    );
};

export default TotalLoader;