import {BrowserRouter, Route, Switch} from 'react-router-dom';



import Home from './components/home';
import Setting from './components/setting';
import News from './components/news';
import NewsDetail from './components/news/detail';
import Profile from './components/profile';
import Reserve from './components/reserve';
import Salon from './components/salon';
import Classes from './components/reserve/classes/detail';

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";


function App() {
    return (

        <BrowserRouter>



            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/setting' component={Setting}/>
                <Route path='/news' exact component={News}/>
                <Route path='/news/:id' component={NewsDetail}/>
                <Route path='/profile' component={Profile}/>
                <Route path='/reserve' component={Reserve}/>
                <Route path='/salon/:id' component={Salon}/>
                <Route path='/class/:id' component={Classes}/>
            </Switch>

            <Footer/>

        </BrowserRouter>
    );
}

export default App;
