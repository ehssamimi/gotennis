import { useState, useEffect } from "react";

export function UseProfile() {
     const [User, setUser] = useState( {"wallet":"",'isLogin':"","token":"" ,'phoneValidate':false});

    useEffect(() => {

        if(localStorage.getItem("GoTennisInfo")){
            let f=localStorage.getItem("GoTennisInfo").search("wallet");


            if (f!==-1){
                let Profile=JSON.parse(localStorage.getItem("GoTennisInfo"))
                setUser({...User,wallet:Profile.wallet,isLogin:Profile.isLogin,token:Profile.token })
            }
        }

    }, []);


    const EditUser=(value,type)=>{
let oldUser=JSON.parse(localStorage.getItem("GoTennisInfo"));
        let NewUser={...oldUser,[type]:value}
        setUser(NewUser)
        localStorage.setItem("GoTennisInfo",JSON.stringify(NewUser))

    }
 const initialUser=( )=>{
     localStorage.setItem("GoTennisInfo",JSON.stringify({"wallet":"",'isLogin':"","token":"",'phoneValidate':false }))
    }



    return {
        User,EditUser,initialUser
    }
}

