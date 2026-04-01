"use client";
import { useEffect } from "react";
import { getHealth } from "@/lib/api";

export default function TestApiCall(){
    useEffect(() => {
        getHealth()
            .then((data) => console.log("Health:", data))
            .catch((err) => console.error("API error:", err));
    }, []);

    return null;
}