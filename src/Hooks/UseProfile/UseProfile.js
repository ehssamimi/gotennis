import { useState, useEffect } from "react";

export function UseProfile() {
     const [User, setUser] = useState( {"wallet":"",'isLogin':"","token":"" ,'phoneValidate':false,'complexName':"",'name':"کاربر",'img':"/assets/img/avatar-380-456332.png" ,'phoneNumber':""});

    useEffect(() => {

        if(localStorage.getItem("GoTennisInfo")){
            let f=localStorage.getItem("GoTennisInfo").search("wallet");


            if (f!==-1){
                let Profile=JSON.parse(localStorage.getItem("GoTennisInfo"))
                setUser({
                    ...User,
                    wallet: Profile.wallet,
                    isLogin: Profile.isLogin,
                    token: Profile.token,
                    phoneValidate: Profile.phoneValidate,
                    complexName: Profile.complexName,
                    name: Profile.name,
                    img: Profile.img,
                    phoneNumber: Profile.phoneNumber
                })
            }
        }

    }, []);


    const EditUser= async (value,type)=>{
let oldUser=JSON.parse(localStorage.getItem("GoTennisInfo"));
        let NewUser={...oldUser,[type]:value}
        setUser(NewUser)
       await localStorage.setItem("GoTennisInfo",JSON.stringify(NewUser))

    }
 const initialUser=( )=>{
     localStorage.setItem("GoTennisInfo",JSON.stringify({"wallet":"",'isLogin':"","token":"",'phoneValidate':false,'complexName':"",'name':"کاربر",'img':"/assets/img/avatar-380-456332.png" ,'phoneNumber':""}))
    }

    return {
        User,EditUser,initialUser
    }
}

