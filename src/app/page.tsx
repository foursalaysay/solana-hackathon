'use client'

import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  },[router])
  
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <LoaderIcon size={100} className="place-self-center"/>
    </div>
  );
}
