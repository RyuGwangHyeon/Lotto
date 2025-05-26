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

  // 새로 추가된 상태들
  const [customEvenCount, setCustomEvenCount] = useState<number>(2);
  const [customOddCount, setCustomOddCount] = useState<number>(2);

  // handleGenerate 함수 수정
  const handleGenerate = () => {
    let numbers: number[] = [];

    // 디버그: 체크된 조건들 출력
    console.log("=== 로또 번호 생성 시작 ===");
    console.log("체크된 조건들:", {
      합계모드: isSumMode,
      짝수모드: isEvenMode,
      짝수개수: customEvenCount,
      홀수모드: isOddMode,
      홀수개수: customOddCount,
      범위모드: isRangeMode,
      끝자리모드: isLastDigitMode,
    });

    // 짝수/홀수 개수 유효성 검사
    if ((isEvenMode || isOddMode) && customEvenCount + customOddCount > 6) {
      console.error("❌ 짝수 + 홀수 개수가 6을 초과할 수 없습니다.");
      alert("짝수 + 홀수 개수가 6을 초과할 수 없습니다!");
      return;
    }

    // 아무 조건도 체크되지 않았을 때는 기본 랜덤 생성
    if (
      !isSumMode &&
      !isEvenMode &&
      !isOddMode &&
      !isRangeMode &&
      !isLastDigitMode
    ) {
      console.log("조건 없음 → 완전 랜덤 생성");
      numbers = Array.from({ length: 6 }, () => {
        let num;
        do {
          num = Math.floor(Math.random() * 45) + 1;
        } while (numbers?.includes(num));
        return num;
      }).sort((a, b) => a - b);

      console.log("생성된 번호:", numbers);
      setLottoSumNumbers(numbers);
      return;
    }

    // 하나 이상의 조건이 체크된 경우, 모든 조건을 만족할 때까지 반복
    let isAllConditionsMet = false;
    let attemptCount = 0;
    const maxAttempts = 10000;

    while (!isAllConditionsMet && attemptCount < maxAttempts) {
      attemptCount++;

      // 6개의 랜덤 번호 생성
      numbers = [];
      while (numbers.length < 6) {
        const num = Math.floor(Math.random() * 45) + 1;
        if (!numbers.includes(num)) {
          numbers.push(num);
        }
      }

      // 모든 체크된 조건들을 검사
      isAllConditionsMet = true;
      const debugResults: any = {};

      // 합계 조건 검사 (100~175)
      if (isSumMode) {
        const sum = numbers.reduce((acc, num) => acc + num, 0);
        const sumValid = sum >= 100 && sum <= 175;
        debugResults.합계검사 = { 합계: sum, 통과: sumValid };
        if (!sumValid) {
          isAllConditionsMet = false;
        }
      }

      // 짝수/홀수 조건 검사 (사용자 지정 개수)
      if ((isEvenMode || isOddMode) && isAllConditionsMet) {
        const evenCount = numbers.filter((num) => num % 2 === 0).length;
        const oddCount = numbers.filter((num) => num % 2 === 1).length;

        let evenOddValid = true;

        // 짝수 조건 체크
        if (isEvenMode && evenCount !== customEvenCount) {
          evenOddValid = false;
        }

        // 홀수 조건 체크
        if (isOddMode && oddCount !== customOddCount) {
          evenOddValid = false;
        }

        debugResults.짝수홀수검사 = {
          짝수개수: evenCount,
          홀수개수: oddCount,
          목표짝수: isEvenMode ? customEvenCount : "체크안함",
          목표홀수: isOddMode ? customOddCount : "체크안함",
          통과: evenOddValid,
        };

        if (!evenOddValid) {
          isAllConditionsMet = false;
        }
      }

      // 범위 분산 조건 검사 (각 구간별 3개 이하)
      if (isRangeMode && isAllConditionsMet) {
        const ranges = [
          numbers.filter((n) => n >= 1 && n <= 9).length,
          numbers.filter((n) => n >= 10 && n <= 19).length,
          numbers.filter((n) => n >= 20 && n <= 29).length,
          numbers.filter((n) => n >= 30 && n <= 39).length,
          numbers.filter((n) => n >= 40 && n <= 45).length,
        ];

        const rangeValid = ranges.every((count) => count < 4);
        debugResults.범위검사 = {
          구간별개수: ranges,
          통과: rangeValid,
        };

        if (!rangeValid) {
          isAllConditionsMet = false;
        }
      }

      // 끝자리 숫자 조건 검사 (동일 끝자리 2개 이하)
      if (isLastDigitMode && isAllConditionsMet) {
        const lastDigits = numbers.map((num) => num % 10);
        const digitCounts = new Map<number, number>();

        lastDigits.forEach((digit) => {
          digitCounts.set(digit, (digitCounts.get(digit) || 0) + 1);
        });

        const lastDigitValid = Array.from(digitCounts.values()).every(
          (count) => count < 3
        );
        debugResults.끝자리검사 = {
          끝자리분포: Object.fromEntries(digitCounts),
          통과: lastDigitValid,
        };

        if (!lastDigitValid) {
          isAllConditionsMet = false;
        }
      }

      // 디버그 출력 (처음 5회와 마지막 성공시만)
      if (attemptCount <= 5 || isAllConditionsMet) {
        console.log(`${attemptCount}회차 시도:`, {
          번호: numbers.sort((a, b) => a - b),
          조건검사결과: debugResults,
          전체통과: isAllConditionsMet,
        });
      }
    }

    // 최대 시도 횟수 초과 시 경고
    if (attemptCount >= maxAttempts) {
      console.error(
        "❌ 조건을 만족하는 번호를 찾을 수 없습니다. 조건을 완화해주세요."
      );
      alert("조건을 만족하는 번호를 찾을 수 없습니다. 조건을 완화해주세요.");
      return;
    }

    console.log(`✅ 최종 생성 완료! (${attemptCount}회 시도)`);
    console.log(
      "최종 번호:",
      numbers.sort((a, b) => a - b)
    );
    console.log("=== 로또 번호 생성 완료 ===\n");

    setLottoSumNumbers(numbers.sort((a, b) => a - b));
  };

  // UI 부분 수정 (return 문 안의 JSX)
  return (
    <div className="min-h-screen bg-[#F5E6D3] flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[450px] border border-[#E8D5C4]">
        <div className="font-bold text-3xl text-[#A78B71] text-center mb-8">
          🎲 로또 번호 추첨기
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-[#FDF6EC] p-6 rounded-xl h-[350px] overflow-y-auto">
            {/* 짝수 설정 */}
            <div className="flex items-center gap-3 text-[#8B7355] hover:bg-[#F5E6D3] p-2 rounded-lg transition-all cursor-pointer">
              <label className="flex items-center gap-3 text-[#8B7355] cursor-pointer">
                <input
                  type="checkbox"
                  checked={isEvenMode}
                  onChange={(e) => setIsEvenMode(e.target.checked)}
                  className="w-5 h-5 accent-[#A78B71]"
                />
                <span className="text-lg">짝수 개수 지정</span>
                {isEvenMode && (
                  <div className="ml-8 flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="6"
                      value={customEvenCount}
                      onChange={(e) =>
                        setCustomEvenCount(Number(e.target.value))
                      }
                      className="w-16 px-2 border border-[#E8D5C4] rounded text-center "
                    />
                    <span className="text-[#8B7355] text-sm">개</span>
                  </div>
                )}
              </label>
            </div>

            {/* 홀수 설정 */}
            <div className="flex items-center gap-3 text-[#8B7355] hover:bg-[#F5E6D3] p-2 rounded-lg transition-all cursor-pointer">
              <label className="flex items-center gap-3 text-[#8B7355] cursor-pointer">
                <input
                  type="checkbox"
                  checked={isOddMode}
                  onChange={(e) => setIsOddMode(e.target.checked)}
                  className="w-5 h-5 accent-[#A78B71]"
                />
                <span className="text-lg">홀수 개수 지정</span>
                {isOddMode && (
                  <div className="ml-8 flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="6"
                      value={customOddCount}
                      onChange={(e) =>
                        setCustomOddCount(Number(e.target.value))
                      }
                      className="w-16 px-2 border border-[#E8D5C4] rounded text-center"
                    />
                    <span className="text-[#8B7355] text-sm">개</span>
                  </div>
                )}
              </label>
            </div>

            {/* 기존 조건들 */}
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

            {/* 유효성 검사 표시 */}
            {(isEvenMode || isOddMode) &&
              customEvenCount + customOddCount > 6 && (
                <div className="mt-3 p-2 bg-red-100 border border-red-300 rounded text-red-600 text-sm">
                  ⚠️ 짝수 + 홀수 개수가 6을 초과할 수 없습니다!
                </div>
              )}

            {(isEvenMode || isOddMode) &&
              customEvenCount + customOddCount <= 6 && (
                <div className="mt-3 p-2 bg-blue-100 border border-blue-300 rounded text-blue-600 text-sm">
                  ℹ️ 짝수 {isEvenMode ? customEvenCount : 0}개 + 홀수{" "}
                  {isOddMode ? customOddCount : 0}개 = 총{" "}
                  {(isEvenMode ? customEvenCount : 0) +
                    (isOddMode ? customOddCount : 0)}
                  개 지정
                </div>
              )}
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
