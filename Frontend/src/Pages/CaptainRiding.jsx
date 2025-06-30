import mapImage from '../assets/newMapImage.png';
import downArrowImage from '../assets/up-arrow.png';
import logoutBoxImage from '../assets/logout-box.png';
import { useNavigate } from 'react-router-dom';
import FinishRide from '../Components/FinishRide';
import { useState } from 'react';

const CaptainRiding = () => {

    const [finishRidePanelOpen, setFinishRidePanelOpen] = useState(false);

    const navigate = useNavigate();
    const logoutCaptain = async (e) => {
        navigate("/captain/logout")
    }
    return (
        <div className="h-screen w-screen flex flex-col justify-start items-center overflow-hidden">
            <div className="h-[80%] w-full relative overflow-hidden">
                <h3 className="text-black text-4xl font-semibold pl-3 pt-3 absolute top-0 left-0 z-10">Uber</h3>
                <div onClick={logoutCaptain} className='h-10 w-10 border  rounded-full flex justify-center items-center bg-white absolute top-3 right-3 cursor-pointer z-10'>
                    <img className='h-5 opacity-70' src={logoutBoxImage} />

                </div>
                <img
                    src={mapImage}
                    alt="Uber map"
                    className="h-full w-full object-cover absolute top-0 left-0 z-0"
                />
            </div>

            <div onClick={() => { setFinishRidePanelOpen(true) }} className='min-h-[20%] w-full bg-yellow-400 flex flex-col justify-start gap-4 items-center pt-5'>
                <img className='cursor-pointer' src={downArrowImage} alt="" />
                <div className=' w-full flex justify-between items-center pl-10 pr-10'>
                    <h3 className='font-bold text-lg'>4 km away</h3>
                    <button className='w-[60%] h-10 font-bold text-white bg-green-800 rounded-lg'>Complete Ride</button>
                </div>
            </div>

            <FinishRide
                finishRidePanelOpen={finishRidePanelOpen}
                setFinishRidePanelOpen={setFinishRidePanelOpen}
            />

        </div >
    )
}

export default CaptainRiding