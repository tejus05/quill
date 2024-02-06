"use client";

import { trpc } from '@/app/_trpc/client';
import ChatInput from './ChatInput';
import Messages from './Messages';
import { Loader2 } from 'lucide-react';

const ChatWrapper = ({fileId}:{fileId:string}) => {

  const { data, isLoading } = trpc.getFileUploadStatus.useQuery(
    {
      fileId
    },
    {
      refetchInterval: ({state}) => state.data?.status === "FAILED" || state.data?.status === "SUCCESS" ? false : 500 
    }
  );

  if (isLoading) {
    return (
      <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2 mt-20'>
        <div className='flex flex-1 justify-center items-center flex-col mb-28'>
          <div className='flex flex-col items-center gap-2'>
            <Loader2 className='h-8 w-8 text-blue-500 animate-spin'/>
            <h3 className='font-semibold text-xl'>
              Loading...
            </h3>
            <p className="text-zinc-500 text-sm">
              We&apos;re preparing your PDF. 
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='relative min-h-full flex divide-y bg-zinc-50 divide-zinc-200 flex-col justify-between gap-2'>
      <div className='flex-1 justify-between flex flex-col mb-28'>
        <Messages/>
      </div>

      <ChatInput/>
    </div>
  )
}

export default ChatWrapper