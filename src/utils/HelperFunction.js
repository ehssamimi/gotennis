export const validatephoneNumber = (phonenumber) => {
    var re = /^(\+98|0)?9\d{9}$/;
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


