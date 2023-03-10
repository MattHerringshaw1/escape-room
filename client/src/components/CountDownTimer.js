import React from 'react'
import {connect} from 'react-redux'
import '../styles/timer.css'
import { useNavigate } from 'react-router-dom'

const CountDownTimer = (props) => {
    
    const {minutes = 0, seconds = 60} = props.minSecs;
    const [[mins, secs], setTime] = React.useState([minutes, seconds])
    const [door, setDoor] = React.useState(false)
    const username = localStorage.getItem('username')
    const navigate = useNavigate()


    const handleDoorCheck = () =>{
        
        if (props.doorOpen){
            setDoor(true)
        }else{
            return
        }
    }
    
    const handleSaveTime = () =>{
            console.log(mins, secs)
            fetch('https://gentle-shelf-51324.herokuapp.com/api/leaderboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mins: mins, 
                    secs: secs, 
                    username: username
                })
            })
            .then(response=> response.json())
            .then(result=>{
                console.log(result)
                navigate('/leaderboard')
            })
    
    }


    const tick = () => {

        if (secs === 0) {
            setTime([mins - 1, 59]);
        }else{
            setTime([mins, secs - 1])
        }
    }


    React.useEffect(()=>{
        handleDoorCheck()
        if((mins===0 && secs===0) || door===true){
            return
        }else{
        const timerId = setInterval(()=>tick(),1000);
        return()=>clearInterval(timerId)}
    })

   

    return(
        <div>
            <h2>
                {`${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`}
            </h2>
            {door && (
                    <div className='time-save-container'>
                        <button className='time-save-btn' onClick={handleSaveTime}>Save Time</button>
                    </div>
                )}
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        doorOpen: state.doorOpen
    }
}

export default connect (mapStateToProps)(CountDownTimer)