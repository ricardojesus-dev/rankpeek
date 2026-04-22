"use client"
import { useState } from "react";
import UrlInput from "@/components/UrlInput";
import SeoReport from "@/components/SeoReport";

export default function Home(){
    const [data,setData] = useState(null);

    return (
        <main>
        <UrlInput setData={setData} />
        <SeoReport data={data} />
        </main>
    )
}