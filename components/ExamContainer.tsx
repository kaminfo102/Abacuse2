"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { ExamTimer } from "./ExamTimer";
import { CalculationsTable } from "./CalculationsTable";
import { ExamResult } from "./exam/ExamResult";
import { ExamConfigForm, ExamConfig } from "./admin/ExamConfigForm";
import { Card } from "@/components/ui/card";

export function ExamContainer() {
  const [isStarted, setIsStarted] = useState(false);
  const [examTime, setExamTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [examConfig, setExamConfig] = useState<ExamConfig | null>(null);
  const [examResults, setExamResults] = useState<{
    correctAnswers: number;
    timeSpent: number;
  } | null>(null);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [totalQuestions, setTotalQuestions] = useState(10);

  const handleConfigSubmit = (config: ExamConfig) => {
    setExamConfig(config);
  };

  const handleFinishExam = (correctAnswers: number) => {
      setIsFinished(true);
      setExamResults({ correctAnswers, timeSpent: examTime });
    };

  const handleTimeUp = () => {
      setIsTimeUp(true);
    };

    const handleSetTotalQuestions = (total: number) => {
        setTotalQuestions(total)
    }

  if (!examConfig) {
    return <ExamConfigForm onSubmit={handleConfigSubmit} />;
  }

  if (!isStarted) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-8">
        <h2 className="text-2xl font-bold text-primary">آماده شروع آزمون هستید؟</h2>
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
          onClick={() => setIsStarted(true)}
        >
          <Play className="w-6 h-6 ml-2" />
          شروع آزمون
        </Button>
      </div>
    );
  }

  return (
    <>
      <Card className="p-6">
        <div className="mb-6">
          <ExamTimer
            isRunning={isStarted && !isFinished}
            timeLimit={examConfig.timeLimit}
            onTimeUp={handleTimeUp}
              onTimeUpdate={setExamTime}
            
          />
        </div>
          <CalculationsTable
              config={examConfig}
            onFinish={handleFinishExam}
            isTimeUp={isTimeUp}
              onSetTotalQuestions={handleSetTotalQuestions}
        />
      </Card>

      {examResults && (
        <ExamResult
          correctAnswers={examResults.correctAnswers}
            totalQuestions={totalQuestions}
          timeSpent={examResults.timeSpent}
        />
      )}
    </>
  );
}
