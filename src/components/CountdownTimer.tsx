import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './CountdownTimer.css';

interface TimeLeft {
       days: number;
       hours: number;
       minutes: number;
       seconds: number;
}

const CountdownTimer: React.FC = () => {
       // Target date for the hackathon (Adjust this!)
       const targetDate = new Date('2026-04-07T09:00:00').getTime();

       const calculateTimeLeft = (): TimeLeft => {
              const now = new Date().getTime();
              const difference = targetDate - now;

              let timeLeft: TimeLeft = {
                     days: 0,
                     hours: 0,
                     minutes: 0,
                     seconds: 0
              };

              if (difference > 0) {
                     timeLeft = {
                            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                            minutes: Math.floor((difference / 1000 / 60) % 60),
                            seconds: Math.floor((difference / 1000) % 60)
                     };
              }
              return timeLeft;
       };

       const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

       useEffect(() => {
              const timer = setInterval(() => {
                     setTimeLeft(calculateTimeLeft());
              }, 1000);

              return () => clearInterval(timer);
       }, [calculateTimeLeft]);

       const formatTime = (time: number) => {
              return time < 10 ? `0${time}` : time;
       };

       const timeBlocks = [
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HOURS', value: timeLeft.hours },
              { label: 'MINUTES', value: timeLeft.minutes },
              { label: 'SECONDS', value: timeLeft.seconds }
       ];

       return (
              <motion.div
                     className="countdown-container"
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.8, delay: 4.8 }}
              >
                     <div className="countdown-grid">
                            {timeBlocks.map((block, index) => (
                                   <div key={index} className="time-block glass-panel">
                                          <div className="time-value text-gradient">{formatTime(block.value)}</div>
                                          <div className="time-label">{block.label}</div>
                                          <div className="block-glare"></div>
                                   </div>
                            ))}
                     </div>
              </motion.div>
       );
};

export default CountdownTimer;
