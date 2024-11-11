import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
function Timer() {
    const targetDate = new Date('2024-11-16T17:00:00')
    const [diff, setDiff] = useState<number>(targetDate.getTime() - new Date().getTime());
    useEffect(() => {
        const targetTime = targetDate.getTime();
        const setTimer = setInterval(() => {
            const now = new Date().getTime();
            setDiff(targetTime - now);
            if(diff <= 0)
            {
                clearInterval(setTimer);
            }
        }, 1000)
    }, [targetDate])
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return (
    <div className="flex justify-center items-center h-auto my-8">
  <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-10 rounded-lg shadow-2xl flex flex-col items-center space-y-4 transform transition-all duration-500 hover:scale-105 w-[35vw] min-w-[250px]">
    <h1 className="text-3xl font-semibold text-white">Countdown Timer</h1>
    <div className="text-6xl font-bold text-white">
      <span>{days}d {hours}h {minutes}m {seconds}s</span>
    </div>
    <div className="animate-pulse text-xl text-white">Hurry up, time is ticking!</div>
  </div>
</div>

  )
}

export default Timer