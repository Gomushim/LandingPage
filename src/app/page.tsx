import Image from "next/image";

export default function Home() {
  return (
    <main>
      <header >
        <Image src="/logo.svg" alt="로고" width={70} height={21} style={{width: "70px", height:"21px"}}/>
      </header>
    </main>
  );
}
