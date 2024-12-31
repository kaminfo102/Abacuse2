// ... (previous code remains the same)
export function cn(...inputs: (string | boolean | undefined | null)[]): string {
  return inputs.filter(Boolean).join(" ");
}

export function calculateResult(numbers: { [key: string]: number }, operator: string): string {
  const values = Object.values(numbers);
  let result: number;

  switch (operator) {
    case '+':
      result = values.reduce((sum, num) => sum + num, 0);
      break;
    case '-':
      result = values.reduce((diff, num, index) => 
        index === 0 ? num : diff - num, 0);
      break;
    case '*':
      result = values.reduce((product, num) => product * num, 1);
      break;
    case '/':
      result = values.reduce((quotient, num, index) => 
        index === 0 ? num : quotient / num, 0);
      break;
    default:
      result = 0;
  }

  return String(Math.round(result * 100) / 100); // Round to 2 decimal places
}

// ... (rest of the code remains the same)
// lib/utils.ts

export function calculateColumnSum(numbers: { row1: number; row2: number }): string {
  return String(numbers.row1 + numbers.row2);
};

export function convertPersianToEnglish(persianNumber: string): string {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const englishDigits = "0123456789";
  let result = "";
  for (let i = 0; i < persianNumber.length; i++) {
      const digit = persianNumber[i];
      const index = persianDigits.indexOf(digit);
      if (index !== -1) {
          result += englishDigits[index];
      } else {
          result += digit;
      }
  }
  return result;
}

export function generateRandomNumbers(): { row1: number; row2: number}[] {
  const numbers: { row1: number; row2: number}[] = [];
  for (let i = 0; i < 10; i++) {
      numbers.push({
          row1: Math.floor(Math.random() * 19) - 9,
          row2: Math.floor(Math.random() * 19) - 9,
          
      });
  }
  return numbers.reverse();
}

export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}
