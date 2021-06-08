import {useState, useEffect, useCallback} from "react";
import {getSlider} from "../../api";
import ListResponseHandler from "../../utils/AxiosResponse/Success/ListResponseHandler";
import News from "../news";
import {Link} from "react-router-dom";
import MainDiv from "../Common/MainDiv/MainDiv";

const Index = () => {

    let [slider, setSlider] = useState({
        data: [],
        loading: true,
        notFound: true
    });

    let [slideIndex, setSlideIndex] = useState(1);

    let [contactInfo, setContactInfo] = useState({});


    const showSlides = useCallback(n => {

        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");

        if (n > slides.length) {
            setSlideIndex(1);
            return;
        }
        if (n < 1) {
            setSlideIndex(slides.length);
            return;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";

    }, [slideIndex])


    useEffect(() => {
        getSlider().then(response => {
            ListResponseHandler(response, setSlider);
            showSlides(slideIndex);
            setContactInfo(response.data.data.contact_info);
        })
            .catch(error => error);
    }, [showSlides, slideIndex, slider]);

    const plusSlides = n => {
        setSlideIndex(slideIndex + n);
        showSlides(slideIndex);
    }

    const currentSlide = n => {
        setSlideIndex(n);
        showSlides(slideIndex);
    }

    return (
        <>
            <MainDiv>
                <div className="slideshow-container">
                    {
                        !slider.loading ?
                            slider.notFound ? <p className='text-center text-danger'>اطلاعاتی یافت نشد</p> :
                                slider.data.map(item =>
                                    <a href={item.link} key={item.id}>
                                        <div className="mySlides fade" key={item.id}>
                                            <img src={item.media_url} style={{width: '100%'}} alt={item.media_url}/>
                                            <div className="text">{item.name}</div>
                                        </div>
                                    </a>
                                )
                            : <p className='text-center text-warning'>در حال بارگزاری</p>
                    }

                    <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
                    <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>

                </div>

                <div style={{textAlign: "center", marginTop: "10px"}}>
                    {
                        slider.data.length > 0 && slider.data.map((item, index) => <span className="dot"
                                                                                         key={item.id}
                                                                                         onClick={() => currentSlide(index + 1)}/>)
                    }
                </div>

                <div className="container">
                    <div className="row">
                        <a href={contactInfo.telegram} target='_blank'>
                            <div className="col-sm">
                                <div className="text_e">اینستاگرام<br/>ما را دنبال کنید</div>
                            </div>
                        </a>
                        <a href={contactInfo.instagram} target='_blank'>
                            <div className="col-sm">
                                <div className="text_q">تلگرام<br/>ما را دنبال کنید</div>
                            </div>
                        </a>
                        <div className="col-sm">
                            <Link to='/reserve'>
                                <div className="text_r">رزرو زمین</div>
                            </Link>
                        </div>
                        <div className="col-sm">
                            <Link to='/reserve?c'>
                                <div className="text_w">ثبت نام در کلاس</div>
                            </Link>
                        </div>
                    </div>
                </div>

                <News className='new_a' home={true}/>

            </MainDiv>


        </>
    )
}
export default Index;