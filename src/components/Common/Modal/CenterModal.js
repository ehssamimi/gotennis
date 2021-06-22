import React, { useEffect} from 'react';
import Modal from 'react-modal';

const CenterScreenModal = (props) => {

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

            // backgroundColor:  "rgb(0, 0, 0,0.44)" ,

        },
        overlay: {
            backgroundColor:'rgba(0,0,0,0.44)',
            // opacity:'0.2',
            zIndex:'50000',
        },
    } ;
    useEffect(() => {
        Modal.setAppElement('body');
    }, []);

    let{isOpen,toggle}=props
    return (

        <div className="w-100 zIndex-5   ">

            <Modal
                isOpen={ isOpen}
                shouldCloseOnOverlayClick={true}
                onRequestClose={ toggle }
                style={customeStyle}
                contentLabel="Example Modal  "
                className='slideIn'
                ariaHideApp={false}
                /*
                 String indicating the role of the modal, allowing the 'dialog' role to be applied if desired.
                 */
                role="dialog"
                /*
                 Function that will be called to get the parent element that the modal will be attached to.
                 */
                parentSelector={() => document.body}
            >
                <div className="  centered-axis-xy" style={{width:"fit-content"}}>
                {
                    props.children
                }
                </div>

            </Modal>









        </div>
    );
};

export default CenterScreenModal;