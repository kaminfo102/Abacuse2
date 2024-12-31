"use client";

import { Card } from '@/components/ui/card';
import { formatTime } from '@/lib/utils';

interface ExamResultProps {
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
}

export function ExamResult({ correctAnswers, totalQuestions, timeSpent }: ExamResultProps) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  return (
    <Card className="p-6 mt-8 bg-gradient-to-br from-primary/5 to-primary/10">
      <h3 className="text-xl font-bold mb-4 text-primary text-center">نتیجه آزمون</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-sm text-gray-600 mb-1">تعداد پاسخ‌های صحیح</p>
          <p className="text-2xl font-bold text-primary">{correctAnswers} از {totalQuestions}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-sm text-gray-600 mb-1">درصد موفقیت</p>
          <p className="text-2xl font-bold text-primary">٪{percentage}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-sm text-gray-600 mb-1">زمان صرف شده</p>
          <p className="text-2xl font-bold text-primary" dir="ltr">{formatTime(timeSpent)}</p>
        </div>
      </div>
    </Card>
  );
}