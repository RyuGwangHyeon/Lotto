import { useState } from "react";
import { LottoNumbers } from "@/libs/Lotto";

const LottoMachine = () => {
  const [lottoNumbers, setLottoNumbers] = useState<number[]>([]);

  const handleGenerate = () => {
    const numbers = LottoNumbers();
    setLottoNumbers(numbers);
  };

  return (
    <div className="flex flex-col gap-6 w-[400px] items-center justify-center mt-4">
      <div className="font-bold text-2xl">🎲 로또 번호 추첨기</div>
      <button
        onClick={handleGenerate}
        className="font-semibold text-white bg-gray-400 border-gray-500 rounded-md w-[100px] h-[30px] "
      >
        번호 생성
      </button>
      <div>원하는 옵션</div>
      {lottoNumbers.length > 0 && (
        <p>
          🎯 추첨된 번호: {lottoNumbers.join(", ")} <br />
        </p>
      )}
    </div>
  );
};

export default LottoMachine;
