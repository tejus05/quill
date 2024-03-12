"use client";

import { useState } from "react";
import { Badge } from "./ui/badge";
import { Check, Copy } from "lucide-react";

const CopyCardNumber = () => {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    navigator.clipboard.writeText("4000003560000008");
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  return (
    <Badge className="mt-5 p-3 rounded-md bg-blue-600 text-[14px]">
      For testing purpose, use this card number
      <span className="pl-1 font-bold flex items-center gap-x-1 cursor-pointer hover:underline transition" onClick={onCopy}>
        4000003560000008
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </span>
    </Badge>
  );
}

export default CopyCardNumber