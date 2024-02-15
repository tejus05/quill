// sync user to db

"use client";

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { trpc } from '../_trpc/client';
import { Loader2 } from 'lucide-react';
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const AuthCallback = () => {
  <Suspense fallback="<p>Loading...</p>">
    <AuthCallbackFunction/>
  </Suspense>
}

const AuthCallbackFunction = () =>{
  const router = useRouter();

  const searchParams = useSearchParams();

  const origin = searchParams.get("origin");

  const { data, isError, error } = trpc.authCallback.useQuery();

  if (data?.success) {
    router.push(origin ? `/${origin}` : "/dashboard");
  }

  if (isError) {
    if (error.data?.code === "UNAUTHORIZED") {
      router.push("/sign-in");
    }
  }

  return (
    <Suspense fallback={<>Loading...</>}>
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
          <h3 className="font-semibold text-xl">Setting up your account...</h3>
          <p>You will be redirected automatically. </p>
        </div>
      </div>
    </Suspense>
  );
}

export default AuthCallback