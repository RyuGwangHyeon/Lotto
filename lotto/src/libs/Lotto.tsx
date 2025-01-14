export const LottoSumNumbers = () => {
  let numbers: number[] = [];
  let sum = 0;

  while (sum < 100 || sum > 175) {
    numbers = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    sum = numbers.reduce((acc: number, num: number) => acc + num, 0);
  }

  return numbers.sort((a: number, b: number) => a - b);
};

export const LottoEvenNumbers = () => {
  let numbers: number[] = [];
  let evenCount = 0;

  while (evenCount !== 2) {
    numbers = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    evenCount = numbers.filter((num) => num % 2 === 0).length;
  }

  return numbers.sort((a: number, b: number) => a - b);
};

export const LottoOddNumbers = () => {
  let numbers: number[] = [];
  let oddCount = 0;

  while (oddCount !== 2) {
    numbers = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    oddCount = numbers.filter((num) => num % 2 === 1).length;
  }

  return numbers.sort((a: number, b: number) => a - b);
};

export const LottoRangeNumbers = () => {
  const isValidDistribution = (numbers: number[]) => {
    const ranges = [
      numbers.filter((n) => n >= 1 && n <= 9).length,
      numbers.filter((n) => n >= 10 && n <= 19).length,
      numbers.filter((n) => n >= 20 && n <= 29).length,
      numbers.filter((n) => n >= 30 && n <= 39).length,
      numbers.filter((n) => n >= 40 && n <= 45).length,
    ];

    return ranges.every((count) => count < 4);
  };

  let numbers: number[] = [];
  let isValid = false;

  while (!isValid) {
    numbers = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    isValid = isValidDistribution(numbers);
  }

  return numbers.sort((a: number, b: number) => a - b);
};

export const LottoLastDigitNumbers = () => {
  const isValidLastDigits = (numbers: number[]) => {
    const lastDigits = numbers.map((num) => num % 10);
    const digitCounts = new Map<number, number>();

    lastDigits.forEach((digit) => {
      digitCounts.set(digit, (digitCounts.get(digit) || 0) + 1);
    });

    return Array.from(digitCounts.values()).every((count) => count < 3);
  };

  let numbers: number[] = [];
  let isValid = false;

  while (!isValid) {
    numbers = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    isValid = isValidLastDigits(numbers);
  }

  return numbers.sort((a: number, b: number) => a - b);
};
