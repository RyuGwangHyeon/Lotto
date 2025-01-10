export const LottoNumbers = () => {
  let numbers: any = [];
  let sum = 0;

  while (sum < 100 || sum > 175) {
    numbers = Array.from(
      { length: 6 },
      () => Math.floor(Math.random() * 45) + 1
    );
    sum = numbers.reduce((acc: any, num: number) => acc + num, 0);
  }

  return numbers.sort((a: number, b: number) => a - b);
};

export const LottoEvenNumbers = () => {
  let numbers: number[] = [];
  let sum = 0;
  let evenCount = 0;

  while (true) {
    numbers = Array.from(
      { length: 6 },
      () => Math.floor(Math.random() * 45) + 1
    );
    sum = numbers.reduce((acc: number, num: number) => acc + num, 0);
    evenCount = numbers.filter(num => num % 2 === 0).length;
    if (sum >= 100 && sum <= 175 && evenCount <= 3) {
      break;
    }
  }

  return numbers.sort((a: number, b: number) => a - b);
};
