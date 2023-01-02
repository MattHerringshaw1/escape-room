import React from 'react'

const CountDownTimer = ({minSecs}) => {

    const {minutes = 0, seconds = 60} = minSecs;
    const [[mins, secs], setTime] = React.useState([minutes, seconds])

    const tick = () => {

        if (secs === 0) {
            setTime([mins - 1, 59]);
        }else{
            setTime([mins, secs - 1])
        }
    }


    React.useEffect(()=>{
        if(mins===0 && secs===0){
            alert('You ran out of time!')
            return
        }else{
        const timerId = setInterval(()=>tick(),1000);
        return()=>clearInterval(timerId)}
    },)



    return(
        <div>
            <p>
                {`${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`}
            </p>
        </div>
    )

}

export default CountDownTimer