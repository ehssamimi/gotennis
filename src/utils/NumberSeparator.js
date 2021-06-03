const NumberSeparator = props => {

    let {number} = props;

    return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + ',');
}

export default NumberSeparator;