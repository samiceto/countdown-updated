"use client"
import { useState, useRef, useEffect, ChangeEvent } from "react"
import { Button } from "./ui/button"
// import { Input } from "./ui/input"

export default function Countdown(){

const [duration,setduration]=useState<number | string>("");
const [timeleft,settimeleft]=useState<number>(0);
const [isactive,setisactive]=useState<boolean>(false);
const [ispoused,setispoused]=useState<boolean>(false);
const timerRef=useRef<NodeJS.Timeout | null>(null);

const handlesetduration=()=>{
    if(typeof duration ==="number" && duration>0){
        settimeleft(duration);
        setisactive(false);
        setispoused(false);
        if(timerRef.current){
            clearInterval(timerRef.current)
        }
    }
}
const handlestart=()=>{
if(timeleft >0){
    setisactive(true)
    setispoused(false)
}
}
const handlepoused=()=>{
    if(isactive){
        setisactive(false)
        setispoused(true) 
        if(timerRef.current){
        clearInterval(timerRef.current)
        }
    } 
}
const handlereset=()=>{
    setisactive(false)
    setispoused(false)
    settimeleft(typeof duration==="number"? duration:0);
    if(timerRef.current){
        clearInterval(timerRef.current)
    }
}
useEffect(()=>{
    if(isactive && !ispoused){
    timerRef.current=setInterval(() => {
        settimeleft((prevTime) => {
            if(prevTime <= 1){
                clearInterval(timerRef.current!);
                return 0;
            }
            return prevTime -1;
        })
    }, 1000);
    }
    return ()=>{
        if(timerRef.current){
            clearInterval(timerRef.current)
        }
    }
},[isactive, ispoused]);

const formattime=(time:number):string=>{
    const minuts=Math.floor(time / 60);
    const seconds=Math.floor(time % 60);
    return `${String(minuts).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}
const handledurationchange=(e:ChangeEvent<HTMLInputElement>)=>{
setduration(Number(e.target.value) || "")
};
return(
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">Countdown Timer</h1>
            <div className="flex items-center mb-6">
                <input 
                type="number" 
                id="duration"
                placeholder="Enter duration in seconds"
                value={duration}
                onChange={handledurationchange}
                className="flex-1 mr-4 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                />
                <Button
                onClick={handlesetduration}
                variant="outline"
                className="text-gray-800 dark:text-gray-200"
                >set
                </Button>
            </div>
            <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
                {formattime(timeleft)}
            </div>
            <div className="flex justify-center gap-4">
                <Button
                onClick={handlestart}
                variant="outline"
                className="text-gray-800 dark:text-gray-200"
                >
                    {ispoused ? "Resume" : "Strart"}
                </Button>
                <Button
                onClick={handlepoused}
                variant="outline"
                className="text-gray-800 dark:text-gray-200"
                >
                    Poused
                </Button>
                <Button
                onClick={handlereset}
                variant="outline"
                className="text-gray-800 dark:text-gray-200"
                >
                    Reset
                </Button>

            </div>
        </div>
    </div>
)
}