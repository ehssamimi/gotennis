import React, {Component} from 'react';

class RowShowEdit extends Component {
    render() {
        let{label,value,className,labelClass,valueClass}=this.props;
        return (
            <div className={[ ' d-flex align-items-end   ','' ,className||''].join(' ')} dir='rtl'>
                <span className={['text-RomanSilver Fs-12 text-right  ml-2 ' ,labelClass||''].join(' ')}>{label}  </span>
                <span className={['text-right Fs-12 text-black' ,valueClass||''].join(' ')}  >{value}</span>
            </div>
        );
    }
}

export default RowShowEdit;