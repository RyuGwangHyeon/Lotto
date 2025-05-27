import { useState } from "react";
import {
  LottoSumNumbers,
  LottoEvenNumbers,
  LottoRangeNumbers,
  LottoLastDigitNumbers,
  LottoOddNumbers,
} from "@/libs/Lotto";

const LottoMachine = () => {
  const [lottoSumNumbers, setLottoSumNumbers] = useState<number[]>([]);
  const [isEvenMode, setIsEvenMode] = useState<boolean>(false);
  const [isSumMode, setIsSumMode] = useState<boolean>(false);
  const [isRangeMode, setIsRangeMode] = useState<boolean>(false);
  const [isLastDigitMode, setIsLastDigitMode] = useState<boolean>(false);
  const [isOddMode, setIsOddMode] = useState<boolean>(false);

  const handleGenerate = () => {
    let numbers: number[] = [];

    if (isSumMode) {
      numbers = LottoSumNumbers();
    } else if (isEvenMode) {
      numbers = LottoEvenNumbers();
    } else if (isOddMode) {
      numbers = LottoOddNumbers();
    } else if (isRangeMode) {
      numbers = LottoRangeNumbers();
    } else if (isLastDigitMode) {
      numbers = LottoLastDigitNumbers();
    } else {
      numbers = Array.from({ length: 6 }, () => {
        let num;
        do {
          num = Math.floor(Math.random() * 45) + 1;
        } while (numbers?.includes(num));
        return num;
      }).sort((a, b) => a - b);
    }

    setLottoSumNumbers(numbers);
  };

  return (
    <div className="min-h-screen bg-[#F5E6D3] flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[450px] border border-[#E8D5C4]">
        <div className="font-bold text-3xl text-[#A78B71] text-center mb-8">
          🎲 로또 번호 추첨기
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-[#FDF6EC] p-6 rounded-xl h-[250px] overflow-y-auto">
            <label className="flex items-center gap-3 text-[#8B7355] hover:bg-[#F5E6D3] p-2 rounded-lg transition-all cursor-pointer">
              <input
                type="checkbox"
                checked={isEvenMode}
                onChange={(e) => setIsEvenMode(e.target.checked)}
                className="w-5 h-5 accent-[#A78B71]"
              />
              <span className="text-lg">짝수 2개 포함하기</span>
            </label>
            <label className="flex items-center gap-3 text-[#8B7355] hover:bg-[#F5E6D3] p-2 rounded-lg transition-all cursor-pointer">
              <input
                type="checkbox"
                checked={isOddMode}
                onChange={(e) => setIsOddMode(e.target.checked)}
                className="w-5 h-5 accent-[#A78B71]"
              />
              <span className="text-lg">홀수 2개 포함하기</span>
            </label>
            <label className="flex items-center gap-3 text-[#8B7355] hover:bg-[#F5E6D3] p-2 rounded-lg transition-all cursor-pointer">
              <input
                type="checkbox"
                checked={isSumMode}
                onChange={(e) => setIsSumMode(e.target.checked)}
                className="w-5 h-5 accent-[#A78B71]"
              />
              <span className="text-lg">로또 총합 (100~175)</span>
            </label>
            <label className="flex items-center gap-3 text-[#8B7355] hover:bg-[#F5E6D3] p-2 rounded-lg transition-all cursor-pointer">
              <input
                type="checkbox"
                checked={isRangeMode}
                onChange={(e) => setIsRangeMode(e.target.checked)}
                className="w-5 h-5 accent-[#A78B71]"
              />
              <span className="text-lg">동일 색상 3개이하</span>
            </label>
            <label className="flex items-center gap-3 text-[#8B7355] hover:bg-[#F5E6D3] p-2 rounded-lg transition-all cursor-pointer">
              <input
                type="checkbox"
                checked={isLastDigitMode}
                onChange={(e) => setIsLastDigitMode(e.target.checked)}
                className="w-5 h-5 accent-[#A78B71]"
              />
              <span className="text-lg">동끝수 2개이하</span>
            </label>
          </div>
          <button
            onClick={handleGenerate}
            className="font-bold text-white bg-[#A78B71] hover:bg-[#8B7355] rounded-xl py-3 px-6 transition-all duration-300 shadow-md w-full text-lg"
          >
            번호 생성하기
          </button>
        </div>
        {lottoSumNumbers.length > 0 && (
          <div className="mt-8 p-6 bg-[#FDF6EC] rounded-xl text-center">
            <div className="text-lg text-[#8B7355] font-medium mb-3">
              🎯 추첨된 번호
            </div>
            <div className="flex gap-3 justify-center">
              {lottoSumNumbers.map((num, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded-full bg-[#A78B71] text-white flex items-center justify-center font-bold"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LottoMachine;
