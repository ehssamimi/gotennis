import ListResponseHandler from "../AxiosResponse/Success/ListResponseHandler";
import {SuccessNotify} from "../Notification";

const GridDeleteHandler = (Request, id, setData, param = null) => {
    Request.destroy(id)
        .then(response => {
            SuccessNotify();
            param === null ?
                Request.all()
                    .then(response => ListResponseHandler(response, setData))
                    .catch(error => error)
                :
                Request.all(param)
                    .then(response => ListResponseHandler(response, setData))
                    .catch(error => error);

        })
        .catch(error => error);
}

export default GridDeleteHandler;