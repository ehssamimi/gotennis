import {useHistory} from "react-router-dom";

const SingleErrorHandler = error => {

    let statusCode = error.response.status;

    let history = useHistory();
    if (statusCode === 404) {
        history.push('/');

    }
}

export default SingleErrorHandler;