"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import AuthCallbackFunction with SSR disabled
const AuthCallbackFunction = dynamic(() => import("../../components/AuthCallbackFunction"), {
  ssr: false,
});

const AuthCallback = () => {
  return (
    <Suspense fallback="<p>Loading...</p>">
      <AuthCallbackFunction />
    </Suspense>
  );
};

export default AuthCallback;
