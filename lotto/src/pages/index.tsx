import Head from "next/head";
import LottoMachine from "@/components/LottoMachine";

export default function Home() {
  return (
    <>
      <Head>
        <title>로또추첨기</title>
        <link rel="icon" href="/favicon_v2.ico" />
      </Head>
      <div>
        <LottoMachine />
      </div>
    </>
  );
}
