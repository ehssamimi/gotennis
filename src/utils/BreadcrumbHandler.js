import {useBreadcrumb} from "../context/Breadcrumb";
import {useEffect} from "react";

const BreadcrumbHandler = title => {

    let {setBreadcrumb} = useBreadcrumb();

    useEffect(() => {
        setBreadcrumb([{title}]);
        document.title = `پنل مدیریت -${title}`;
    }, []);
}

export default BreadcrumbHandler;