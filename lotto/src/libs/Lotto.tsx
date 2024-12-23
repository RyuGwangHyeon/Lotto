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
