// components/CalculationsTable.tsx
"use client";

import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { generateRandomNumbers, calculateColumnSum, convertPersianToEnglish, cn, calculateResult } from "@/lib/utils";

type Answer = {
  value: string;
  submitted: boolean;
  isCorrect?: boolean;
};

interface CalculationsTableProps {
    onFinish: (correctAnswers: number) => void;
    isTimeUp: boolean;
    config: {
      operator: string;
    }
}

export function CalculationsTable({ onFinish, isTimeUp, config }: CalculationsTableProps) {
  const [answers, setAnswers] = useState<{ [key: number]: Answer }>(
    Array(10).fill(0).reduce((acc, _, index) => ({
      ...acc,
      [index + 1]: { value: "", submitted: false }
    }), {})
  );
  
  const examData = useMemo(() => ({
        numbers: generateRandomNumbers(),
    }), []);

  const handleAnswerChange = (columnIndex: number, value: string) => {
    if (!answers[columnIndex].submitted) {
      setAnswers(prev => ({
        ...prev,
        [columnIndex]: { ...prev[columnIndex], value }
      }));
    }
  };

  const handleSubmitAnswer = (columnIndex: number) => {
    if (!answers[columnIndex]?.value || isTimeUp) return;
  
    const userAnswer = convertPersianToEnglish(answers[columnIndex].value);
    const correctAnswer = calculateResult(examData.numbers[columnIndex - 1], config.operator);
    const isCorrect = userAnswer === correctAnswer;
  
    setAnswers(prev => ({
      ...prev,
      [columnIndex]: { ...prev[columnIndex], submitted: true, isCorrect }
    }));
  };

  const handleFinishExam = () => {
    const totalCorrect = Object.values(answers).filter(a => a.isCorrect).length;
    onFinish(totalCorrect);
  };

  const allAnswersSubmitted = Object.values(answers).every(a => a.submitted);

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary/10">
              {[...Array(10)].map((_, i) => (
                <TableHead key={i} className="text-center font-bold">{10 - i}</TableHead>
              ))}
              <TableHead className="text-center font-bold">شماره</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              {examData.numbers.map((nums, i) => (
                <TableCell
                  key={i}
                  className={cn(
                    "text-center",
                    answers[i + 1].submitted && (
                      answers[i + 1].isCorrect
                        ? "bg-green-50"
                        : "bg-red-50"
                    )
                  )}
                >
                  {nums.row1}
                </TableCell>
              ))}
              <TableCell rowSpan={2} className="text-center align-middle font-bold">
                Abacuse
              </TableCell>
            </TableRow>
            <TableRow>
              {examData.numbers.map((nums, i) => (
                <TableCell
                  key={i}
                  className={cn(
                    "text-center",
                    answers[i + 1].submitted && (
                      answers[i + 1].isCorrect
                        ? "bg-green-50"
                        : "bg-red-50"
                    )
                  )}
                >
                  {nums.row2}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {[...Array(10)].map((_, i) => (
                <TableCell key={i} className="p-0">
                  <div className="flex flex-col gap-2 p-2">
                    <Input
                      className="text-center w-full"
                      value={answers[i + 1].value}
                      onChange={(e) => handleAnswerChange(i + 1, e.target.value)}
                      disabled={answers[i + 1].submitted}
                    />
                    {answers[i + 1].submitted ? (
                      answers[i + 1].isCorrect ? (
                        <CheckCircle className="w-5 h-5 mx-auto text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 mx-auto text-red-500" />
                      )
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => handleSubmitAnswer(i + 1)}
                        disabled={!answers[i + 1].value}
                      >
                        ثبت
                      </Button>
                    )}
                  </div>
                </TableCell>
              ))}
              <TableCell className="text-center font-bold">جواب</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-center mt-8">
        <Button
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
          onClick={handleFinishExam}
          disabled={!allAnswersSubmitted}
        >
          پایان آزمون
        </Button>
      </div>
    </div>
  );
}
