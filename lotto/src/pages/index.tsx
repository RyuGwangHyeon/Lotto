import LottoMachine from "@/components/LottoMachine";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>로또추첨기</title>
        <link rel="icon" href="/favicon2.ico" />
      </Head>
      <div>
        <LottoMachine />
      </div>
    </>
  );
}
