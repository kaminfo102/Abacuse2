"use client";

import { useEffect, useState, useCallback } from "react";
import { Clock } from "lucide-react";
import { formatTime } from "@/lib/utils";

type ExamTimerProps = {
  isRunning: boolean;
  timeLimit: number;
  onTimeUp: () => void;
  onTimeUpdate: (time: number) => void;
};

export function ExamTimer({ isRunning, timeLimit, onTimeUp, onTimeUpdate }: ExamTimerProps) {
  const [seconds, setSeconds] = useState(timeLimit);

  const updateTime = useCallback(() => {
    if (seconds <= 0) {
      onTimeUp();
      return;
    }
    
    const newTime = seconds - 1;
    setSeconds(newTime);
    onTimeUpdate(timeLimit - newTime);
  }, [seconds, timeLimit, onTimeUp, onTimeUpdate]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && seconds > 0) {
      interval = setInterval(updateTime, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, seconds, updateTime]);

  return (
    <div className="flex items-center justify-center gap-2 text-xl font-bold text-primary">
      <Clock className="w-6 h-6" />
      <span dir="ltr">{formatTime(seconds)}</span>
    </div>
  );
}