import React, {useState, useEffect} from 'react';

const Loader = (props) => {
    // const [count, setCount] = useState(1);
    useEffect(() => {
        // Update the document title using the browser API
        // return //for componentDidMount
    }, []);

    return (

            <svg version="1.1" id="L4"   x="0px" y="0px"
                 viewBox="0 0 55 100" enable-background="new 0 0 0 0"  >
                <circle fill="#FF006400" stroke="none" cx="6" cy="50" r="6">
                    <animate
                        attributeName="opacity"
                        dur="1s"
                        values="0;1;0"
                        repeatCount="indefinite"
                        begin="0.1"/>
                </circle>
                <circle fill="#FF006400" stroke="none" cx="26" cy="50" r="6">
                    <animate
                        attributeName="opacity"
                        dur="1s"
                        values="0;1;0"
                        repeatCount="indefinite"
                        begin="0.2"/>
                </circle>
                <circle fill="#FF006400" stroke="none" cx="46" cy="50" r="6">
                    <animate
                        attributeName="opacity"
                        dur="1s"
                        values="0;1;0"
                        repeatCount="indefinite"
                        begin="0.3"/>
                </circle>
            </svg>

    );
};

export default Loader;