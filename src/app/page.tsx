'use client'

import BloodAnimation from "@/components/reusables/BloodAnimation";
import Solflare from "@/components/reusables/Solflare";
import { LoaderIcon } from "lucide-react";
import { SP } from "next/dist/shared/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  // useEffect(() => {
  //   router.push("/login");
  // },[router])
  
  return (
    <div className="w-full flex flex-col">
        <BloodAnimation />
        <Solflare />
    </div>
  );
}
