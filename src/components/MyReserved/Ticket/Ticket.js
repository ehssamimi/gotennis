import React  from 'react';
const RowInfo=({label,value,MainClass})=>{
    return(
        <div className={MainClass}  >
            <p className='mb-0 Fs-10 font-weight-bold text-right'>{label}</p>
            <p className='mb-0 Fs-12   font-weight-bold text-right' style={{marginTop:'4px'}}>{value}</p>
        </div>
    )
}

const Ticket = ({MainContainer,SubContainer,header,img,trace_code}) => {

    return (
        <div className='w-100 d-flex justify-content-center vh-100 overflow-y-scroll' style={{paddingBottom:'60px'}}>
            <div id='ticket' className='w-85 bg-white mt-4 d-flex flex-column vh-100' style={{minHeight:'70vh'}}>
                <div className='w-100 bg-white position-relative' style={{height:'45px'}}>
                    <p className='Fs-14 text-MountainMeadow text-right pr-3 pt-2 font-weight-bold'>{header}</p>
                    <span className='ticket-circle' style={{left:'-15px',top:'-15px'}}></span>
                    <span className='ticket-circle centered-axis-x ' style={{  top:'-15px'}}></span>
                    <span className='ticket-circle' style={{right:'-15px',top:'-15px'}}></span>

                </div>
                <div className='w-100'>
                    <img  src={img} className='w-100 fill-cover' alt="" style={{height:'200px'}} />
                </div>
                <div className='row-flex  m-0 w-100 pr-16 pl-16 pb-2'>
                     {
                        MainContainer.map((item,index)=> <RowInfo key={index} label={item.label} value={item.value} MainClass='w-50 mt-2'/>)
                    }

                </div>
                <div className='w-100 position-relative  '>
                    <span className='ticket-circle' style={{left:'-15px',top:'15px'}}></span>
                    <span className='ticket-circle' style={{right:'-15px',top:'15px'}}></span>
                    <div className='ticket-border-dot w-100'></div>
                </div>
                <div className='  w-100   pr-16 pl-16'  style={{marginTop:'17px'}}>
                    {
                        SubContainer.map((item,index)=> <RowInfo  key={index}  label={item.label} value={item.label==='توضیحات اضافه'? <div  dangerouslySetInnerHTML={{__html: item.value}}/>:item.value} MainClass='w-100 mt-2'/>)
                    }


                </div>
                <div className='w-100   ' style={{marginTop:'auto'}}>
                    <p className='Fs-14 text-MountainMeadow text-center  mb-0 ticket-border-top pr-3 mt-2 pt-2 pb-2 font-weight-bold w-100'>کد رهگیری :{trace_code}</p>

                </div>

            </div>

        </div>
    );
};

export default Ticket;