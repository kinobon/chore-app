"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // クライアントサイドルーティングのため、ホームにリダイレクト
    router.push("/chores");
  }, [router]);

  return null;
}
