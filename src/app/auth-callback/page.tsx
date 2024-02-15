"use client";

import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../_trpc/client";
import { Loader2 } from "lucide-react";
import ErrorPage from "next/error";
import { useSearchParams } from "next/navigation";

const AuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");
  const { data, isError, error } = trpc.authCallback.useQuery();

  // Check if the page is in fallback mode and if data is not available
  if (router.isFallback || (isError && error.data?.code !== "UNAUTHORIZED")) {
    // If in fallback mode or an error occurs that is not UNAUTHORIZED, show a  404 error page
    return <ErrorPage statusCode={404} />;
  }

  if (data?.success) {
    router.push(origin ? `/${origin}` : "/dashboard");
  }

  if (isError && error.data?.code === "UNAUTHORIZED") {
    router.push("/sign-in");
  }

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
        <h3 className="font-semibold text-xl">Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
