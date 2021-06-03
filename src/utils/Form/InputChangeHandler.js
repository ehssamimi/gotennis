const InputChangeHandler = (e, data, setData) => {

    let {name, value} = e[0] ? {name: 'image', value: e[0]} : e.target;

    setData({
        ...data,
        [name]: value
    });
}

export default InputChangeHandler;