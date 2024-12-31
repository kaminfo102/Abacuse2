"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type Operator = '+' | '-' | '*' | '/';

export type ExamConfig = {
  digitCount: number;
  rowCount: number;
  timeLimit: number;
  columnCount: number;
  operator: Operator;
};

interface ExamConfigFormProps {
  onSubmit: (config: ExamConfig) => void;
}

export function ExamConfigForm({ onSubmit }: ExamConfigFormProps) {
  const [config, setConfig] = useState<ExamConfig>({
    digitCount: 1,
    rowCount: 2,
    timeLimit: 300,
    columnCount: 10,
    operator: '+',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(config);
  };

  return (
    <Card className="p-6 mb-8">
      <h2 className="text-xl font-bold mb-4 text-primary">تنظیمات آزمون</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>تعداد ارقام اعداد</Label>
            <Input
              type="number"
              min="1"
              max="3"
              value={config.digitCount}
              onChange={(e) => setConfig({ ...config, digitCount: parseInt(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label>تعداد سطرها</Label>
            <Input
              type="number"
              min="2"
              max="5"
              value={config.rowCount}
              onChange={(e) => setConfig({ ...config, rowCount: parseInt(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label>زمان آزمون (ثانیه)</Label>
            <Input
              type="number"
              min="60"
              value={config.timeLimit}
              onChange={(e) => setConfig({ ...config, timeLimit: parseInt(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label>تعداد ستون‌ها</Label>
            <Input
              type="number"
              min="5"
              max="20"
              value={config.columnCount}
              onChange={(e) => setConfig({ ...config, columnCount: parseInt(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label>عملگر محاسباتی</Label>
            <Select
              value={config.operator}
              onValueChange={(value: Operator) => setConfig({ ...config, operator: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="انتخاب عملگر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+">جمع (+)</SelectItem>
                <SelectItem value="-">تفریق (-)</SelectItem>
                <SelectItem value="*">ضرب (*)</SelectItem>
                <SelectItem value="/">تقسیم (/)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit" className="w-full">ذخیره تنظیمات</Button>
      </form>
    </Card>
  );
}