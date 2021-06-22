import { useState } from "react";


export function UseModals() {
    const [Modal, setModal] = useState({isOpen:false,type:""});

    const toggleModal=(type)=>{
        setModal({isOpen:!Modal.isOpen,type:type})
    }
    const openModal=(type)=>{
        setModal({isOpen:true,type:type})
    }
    const closeModal=(type)=>{
        setModal({isOpen:false,type:type})
    }

    return {
        Modal,toggleModal,openModal,closeModal
    }
}

