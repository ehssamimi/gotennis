import {useEffect} from "react";
import {useHistory} from "react-router-dom";

const Header = () => {

    const openCity = (evt, cityName) => {

        let i, tabcontent, tablinks;

        tabcontent = document.getElementsByClassName("tabcontent");

        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "  ");
        }
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
    }

    const history = useHistory();

    useEffect(() => {
        history.location.search === '?c' ?
            document.getElementById("_registration").click() :
            document.getElementById("defaultOpen").click();

    }, [history.location.search]);

    return (
        <div className="top_header">
            <div className="container">
                <div className="tab">
                    <button className="tablinks" onClick={(e) => openCity(e, 'reserve')} id="defaultOpen">رزرو سالن
                    </button>
                    <button className="tablinks" onClick={(e) => openCity(e, 'registration')} id='_registration'>ثبت نام
                        کلاس
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Header;