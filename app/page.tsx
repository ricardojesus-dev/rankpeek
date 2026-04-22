// app/page.tsx
"use client"
import { useState } from "react";
import UrlInput from "@/components/UrlInput";
import SeoReport from "@/components/SeoReport";
import type { SeoReportData } from "@/types/seoReport";

export default function Home(){
    const [data,setData] = useState<SeoReportData | null>(null)

    return (
        <main>
        <UrlInput setData={setData} />
        <SeoReport data={data} />
        </main>
    )
}