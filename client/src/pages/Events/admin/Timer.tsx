import React, { useEffect, useState } from 'react';

function Timer() {
  const targetDate = new Date('2024-11-16T17:00:00');
  const [diff, setDiff] = useState<number>(targetDate.getTime() - new Date().getTime());

  useEffect(() => {
    const targetTime = targetDate.getTime();
    const setTimer = setInterval(() => {
      const now = new Date().getTime();
      setDiff(targetTime - now);
      if (diff <= 0) {
        clearInterval(setTimer);
      }
    }, 1000);

    return () => clearInterval(setTimer);
  }, [targetDate, diff]);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return (
    <div className="flex justify-center items-center h-auto my-8">
      <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-6 rounded-lg shadow-2xl flex flex-col items-center space-y-4 transform transition-all duration-500 hover:scale-105 w-[45vw] min-w-[250px] max-w-[550px]"> {/* Slightly increased width */}
        
        {/* Title with responsive font size */}
        <h1
          className="text-white"
          style={{
            fontSize: 'clamp(1.3rem, 5vw, 1.8rem)', // Slightly reduced font size
            whiteSpace: 'nowrap', // Prevent title from breaking into multiple lines
          }}
        >
          Countdown Timer
        </h1>

        {/* Countdown timer with responsive font size */}
        <div
          className="text-white flex justify-center"
          style={{
            width: '100%',
            textAlign: 'center',
            fontSize: 'clamp(1.2rem, 5vw, 2.1rem)', // Slightly reduced font size
            overflow: 'hidden', // Prevent overflow in small devices
            letterSpacing: 'normal', // Default spacing
            whiteSpace: 'nowrap', // Prevent countdown from breaking into multiple lines
          }}
        >
          <span style={{ marginRight: '0.2em' }}>{days}d</span>
          <span style={{ marginRight: '0.2em' }}>{hours}h</span>
          <span style={{ marginRight: '0.2em' }}>{minutes}m</span>
          <span>{seconds}s</span>
        </div>

        {/* "Hurry up" message with responsive font size */}
        <div
          className="animate-pulse text-white"
          style={{
            fontSize: 'clamp(0.9rem, 4vw, 1.3rem)', // Slightly reduced font size
            whiteSpace: 'nowrap', // Prevent "Hurry up" message from breaking into multiple lines
          }}
        >
          Hurry up, time is ticking!
        </div>
      </div>
    </div>
  );
}

export default Timer;
