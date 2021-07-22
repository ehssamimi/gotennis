import {BrowserRouter, Route, Switch} from 'react-router-dom';



import Home from './components/home';
import Setting from './components/setting';
import News from './components/news';
import NewsDetail from './components/news/detail';
import Profile from './components/profile';
import Reserve from './components/reserve';
import MyReserved from './components/view/MyReserved/index';
import Salon from './components/salon';
import Classes from './components/reserve/classes/detail';

 import Footer from "./components/Layout/Footer";
import {useEffect} from "react";
import {UseProfile} from "./Hooks/UseProfile/UseProfile";
import {gotennisNotif} from "./utils/Notification";
import SuccessPayment from "./components/SuccessPayment/SuccessPayment";





function App() {
    const {initialUser}=UseProfile();
        useEffect(()=>{
            if (localStorage.getItem('GoTennisInfo')===null){
                initialUser()
                gotennisNotif(1)
            }else {

            }
         },[])
    return (

        <BrowserRouter>



            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/setting' component={Setting}/>
                <Route path='/news' exact component={News}/>
                <Route path='/news/:id' component={NewsDetail}/>
                <Route path='/profile' component={Profile}/>
                <Route path='/reserve' component={Reserve}/>
                <Route path='/my-reserve' component={MyReserved}/>
                <Route path='/salon/:id' component={Salon}/>
                <Route path='/class/:id' component={Classes}/>
                <Route path='/success-payment/:id' component={SuccessPayment}/>
            </Switch>

            <Footer/>

        </BrowserRouter>
    );
}

export default App;
