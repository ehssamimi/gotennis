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

export const gotennisNotif = (type = 1) => {
    let message=welcome();
    switch(type) {
        case 1:
            // code block
            message=welcome();
            break;
        case 2:
            message=Validate();
            break;
        case 3:
            message=sanseGener();
            break;
        default:
        // code block
    }
     toast(message, MessageOptions);
}




const MessageOptions = {
    position: "top-right",
    autoClose: 6000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    // limit:1
    // newestOnTop:true

}
const Style={
    display:"flex",
    fontSize:"16px",
    justifyContent: 'space-around',
    alignItems:"center",
    fontFamily:"sans"
}

const welcome =()=>{
    return(
        <div dir='rtl'  style={Style}> <img src="/assets/img/avatar-380-456332.png" alt="" width={30}/>به اپلیکشین خوش آمدید  </div>
    )
}
const Validate =()=>{
    return(
        <div dir='rtl'  style={Style}><img src="/assets/img/avatar-380-456332.png" alt="" width={30}/>برای رزرو باید موبایل شما تایید شود    </div>
    )
}

const sanseGener =()=>{
    return(
        <div dir='rtl'  style={Style}><img src="/assets/img/avatar-380-456332.png" alt="" width={30}/>  خطا در  جنسیت سانس  </div>
    )
}


