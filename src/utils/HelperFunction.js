export const validatephoneNumber = (phonenumber) => {
    var re = /^(\+98|0|98)?9\d{9}$/;
    return re.test(phonenumber);
}
export function  getIndexIfObjWithAttr   (array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

export const NumberSeparatorFunction = (number) => {


    return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + ',');
}
export const monthHandler = date => {

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

