import {useEffect, useState} from "react";
import ListResponseHandler from "../AxiosResponse/Success/ListResponseHandler";

const GridStateHandler = all => {

    const [data, setData] = useState({
        data: [],
        loading: true,
        notFound: true
    });

    useEffect(() => {
        all().then(response => ListResponseHandler(response, setData))
            .catch(error => error);
    }, []);

    return [data, setData];
}

export default GridStateHandler;