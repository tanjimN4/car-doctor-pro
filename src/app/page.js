import Homepage from "@/components/HomePage/Homepage";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" items-center justify-items-center min-h-screen  sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <div>
          <Homepage></Homepage>
        </div>
      </main>
    </div>
  );
}
