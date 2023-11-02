import { ReactNode, useState } from "react";
import clockIcon from '../assets/clock.png'
import { useInterval } from "../hooks/use-interval";

function getCurrentTime(): string {
    const date = new Date();
    const pmHour = date.getHours() % 12;
    const isPm = pmHour > 0;
    return `${isPm ? pmHour : date.getHours()}:${date.getMinutes()} ${isPm ? 'PM' : 'AM'}`;
}

export function Clock(): ReactNode {
    const [currentTime, setCurrentTime] = useState(getCurrentTime());
    useInterval(() => {
        setCurrentTime(getCurrentTime())
    }, 1000);

    return <>
        <div className="flex-align">
            <div><img src={clockIcon} height={128} width={128} /></div>
            <div className="margin-left"><h1>{currentTime}</h1></div>
        </div>
    </>
}