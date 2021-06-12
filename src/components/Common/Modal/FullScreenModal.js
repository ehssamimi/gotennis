import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';

const FullScreenModal = (props) => {

    const customeStyle=  {
        content : {
            top                   : 'auto',
            left                  : 'auto',
            right                 : 'auto',
            bottom                : '0',
            marginRight           : 'auto',
            zIndex:'99',
             padding :'0',
            width:'100%',
            borderRadius:0,
             border:0,
            // minHeight:props.minHeight|| 'auto',
            minHeight:'100vh',
            height:'100%',
            backgroundColor:  "#FFF" ,

        },
        overlay: {
            // backgroundColor:'rgba(0,0,0,0.44)',
            // opacity:'0.5'
            zIndex:'50000',
        },
    } ;
     useEffect(() => {
        Modal.setAppElement('body');
    }, []);

    let{isOpen,toggle}=props
    return (

        <div className="w-100 zIndex-5 fadeIn ">

            <Modal
                isOpen={ isOpen}
                 shouldCloseOnOverlayClick={true}
                onRequestClose={ toggle }
                style={customeStyle}
                contentLabel="Example Modal fadeIn"
                className='fadeIn'

            >



                {
                    props.children
                }

            </Modal>

        </div>
    );
};

export default FullScreenModal;