import {useCallback, useEffect, useState} from "react";
import {getSans} from "../../api";

const SlideShow = ({court_id, reserveData}) => {

    let [slideIndex, setSlideIndex] = useState(1);

    let [sans, setSans] = useState([]);

    let [sansCount, setSansCount] = useState(0);

    const plusSlides = n => {
        setSlideIndex(slideIndex + n);
        showSlides(slideIndex);
    }

    const showSlides = useCallback(n => {

        let i;
        let slides = document.getElementsByClassName("mySlide");
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

    }, [slideIndex]);

    const monthHandler = date => {
        let month_number = date.split("-")[1];

        let month_text = '';

        switch (month_number) {
            case '01':
                month_text = 'فروردین';
                break;
            case '02':
                month_text = 'اردیبهشت';
                break;
            case '03':
                month_text = 'خرداد';
                break;
            case '04':
                month_text = 'تیر';
                break;
            case '05':
                month_text = 'مرداد';
                break;
            case '06':
                month_text = 'شهریور';
                break;
            case '07':
                month_text = 'مهر';
                break;
            case '08':
                month_text = 'آبان';
                break;
            case '09':
                month_text = 'آذر';
                break;
            case '10':
                month_text = 'دی';
                break;
            case '11':
                month_text = 'بهمن';
                break;
            case '12':
                month_text = 'اسفند';
                break;
            default:
                throw Error('ماه ناشناخته است.خطا از سمت سرور')
        }
        return month_text;

    }

    const yearHandler = date => {

        return date.split("-")[0];
    }

    const headerDateHandler = date => {

        let _date = date.split("-");

        return _date[1] + '-' + _date[2];
    }

    const timeHandler = date => {

        let start_time = date.start_time.split(":");
        let finish_time = date.finish_time.split(":");

        if (start_time[0].charAt(0) == "0")
            start_time[0] = start_time[0].replace("0", "");

        if (finish_time[0].charAt(0) == "0")
            finish_time[0] = finish_time[0].replace("0", "");


        return start_time[0] + '-' + finish_time[0];

    }

    const handleClick = row => {
        reserveData(row);
    }


    useEffect(() => {
        getSans(court_id).then(response => {
            setSans(response.data.data.weeks);
            showSlides(slideIndex);
        })
            .catch(error => error);
    }, [court_id, showSlides, slideIndex]);


    return (
        <div className="slideshow-container" style={{borderRadius: '20px 20px 0 0'}}>

            {
                sans.length > 0 && sans.map((item, key) => {
                    return Object.keys(item).map((date, key2) => {
                            return <div className="mySlide" key={key + key2}>
                                <p className="mySlide-p">{yearHandler(date)} {monthHandler(date)}</p>
                                <div className="row">
                                    <div className="col">
                <span>
                    {headerDateHandler(Object.keys(item)[0])}
                </span>
                                        <p className="mySlide-a">
                                            شنبه
                                        </p>
                                        {Object.values(item)[0].map((row, key4) => <p className="mySlide-null"
                                                                                      key={key4}
                                                                                      onClick={() => handleClick(row)}>
                    <span className={`${row.gender == 0 ? "mySlide-w" : "mySlide-n"}`}>

                        {timeHandler(row)}
                    </span>
                                        </p>)}
                                    </div>
                                    <div className="col">
                <span>
                    {headerDateHandler(Object.keys(item)[1])}
                </span>
                                        <p className="mySlide-a" dir="rtl">
                                            ۱شنبه
                                        </p>
                                        {Object.values(item)[1].map((row, key4) => <p className="mySlide-null"
                                                                                      key={key4}
                                                                                      onClick={() => handleClick(row)}>
                    <span className={`${row.gender == 0 ? "mySlide-w" : "mySlide-n"}`}>

                        {timeHandler(row)}
                    </span>
                                        </p>)}
                                    </div>
                                    <div className="col">
                <span>
                    {headerDateHandler(Object.keys(item)[2])}
                </span>
                                        <p className="mySlide-a">
                                            ۲شنبه
                                        </p>
                                        {Object.values(item)[2].map((row, key4) => <p className="mySlide-null" key={key4}
                                                                                      onClick={() => handleClick(row)}>
                    <span className={`${row.gender == 0 ? "mySlide-w" : "mySlide-n"}`}>

                        {timeHandler(row)}
                    </span>
                                        </p>)}
                                    </div>
                                    <div className="col">
                <span>
                    {headerDateHandler(Object.keys(item)[3])}
                </span>
                                        <p className="mySlide-a">
                                            ۳شنبه </p>
                                        {Object.values(item)[3].map((row, key4) => <p className="mySlide-null" key={key4}
                                                                                      onClick={() => handleClick(row)}>
                    <span className={`${row.gender == 0 ? "mySlide-w" : "mySlide-n"}`}
                    >

                        {timeHandler(row)}
                    </span>
                                        </p>)}
                                    </div>
                                    <div className="col">
                <span>
                    {headerDateHandler(Object.keys(item)[4])}
                </span>
                                        <p className="mySlide-a">
                                            ۴شنبه
                                        </p>
                                        {Object.values(item)[4].map((row, key4) => <p className="mySlide-null" key={key4}
                                                                                      onClick={() => handleClick(row)}>
                    <span className={`${row.gender == 0 ? "mySlide-w" : "mySlide-n"}`}
                    >

                        {timeHandler(row)}
                    </span>
                                        </p>)}
                                    </div>
                                    <div className="col">
                <span>
                    {headerDateHandler(Object.keys(item)[5])}
                </span>
                                        <p className="mySlide-a">
                                            ۵شنبه
                                        </p>
                                        {Object.values(item)[5].map((row, key4) => <p className="mySlide-null" key={key4}
                                                                                      onClick={() => handleClick(row)}>
                    <span className={`${row.gender == 0 ? "mySlide-w" : "mySlide-n"}`}
                    >

                        {timeHandler(row)}
                    </span>
                                        </p>)}
                                    </div>
                                    <div className="col">
                <span>
                    {headerDateHandler(Object.keys(item)[6])}
                </span>
                                        <p className="mySlide-a">
                                            جمعه
                                        </p>
                                        {Object.values(item)[6].map((row, key4) => <p className="mySlide-null" key={key4}
                                                                                      onClick={() => handleClick(row)}>
                    <span className={`${row.gender == 0 ? "mySlide-w" : "mySlide-n"}`}
                    >

                        {timeHandler(row)}
                    </span>
                                        </p>)}
                                    </div>
                                </div>
                            </div>

                        }
                    )
                })
            }

            <a className="prev" id="prev" onClick={() => plusSlides(-1)}>❮</a>
            <a className="next" id="next" onClick={() => plusSlides(1)}>❯</a>

        </div>
    )
}

export default SlideShow;