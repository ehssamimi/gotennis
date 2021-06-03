const FormDataHandler = (data, is_update = false) => {

    let form_data = new FormData();

    Object.entries(data).forEach(item => {
        form_data.append(item[0], item[1]);
    });
    if (is_update)
        form_data.append('_method', 'PATCH')

    return form_data;
}

export default FormDataHandler;