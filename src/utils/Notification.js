/** ===== Notifications Handler ===== */
import {toast} from 'react-toastify';


export const ErrorNotify = error => {

    let error_message = '';

    if (error.response && error.response.status === 422)
        error_message = Object.values(error.response.data.errors)[0][0];
    else if (error.response && error.response.status === 500)
        error_message = 'خطای سرور.لطفا به مدیر گزارش دهید.';
    else
        error_message = 'اتصال به اینترنت برقرار نیست.'

    toast.error(error_message, MessageOptions);
}


export const SuccessNotify = (message = 'عملیات با موفقیت انجام شد.') => {
    toast.success(message, MessageOptions);
}

const MessageOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}