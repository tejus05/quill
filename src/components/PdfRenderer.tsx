"use client";

import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf'
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useToast } from './ui/use-toast';
import { useResizeDetector } from 'react-resize-detector'
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfRenderer = ({url}:{url:string}) => {
  const { toast } = useToast();
  const { width,ref } = useResizeDetector();
  const [numPages, setNumPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>();

  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between placeholder-zinc-200">
        <div className="items-center gap-1.5 flex">
          <Button aria-label="previous-page" variant="ghost" className="m-2">
            <ChevronDown className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1.5">
            <Input className="w-12 h-8" />
            <p className="text-zinc-700 text-sm space-x-1">
              <span>/</span>
              <span>{numPages ?? "x"}</span>
            </p>
          </div>
          <Button aria-label="next-page" variant="ghost" className="m-2">
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 w-full max-h-screen">
        <div ref={ref}>
          <Document
            loading={
              <div className="flex justify-center">
                <Loader2 className="my-24 h-6 w-6 animate-spin" />
              </div>
            }
            file={url}
            className="max-h-full"
            onLoadError={() => {
              toast({
                title: "Error loading pdf",
                description: "Please try again later",
                variant: "destructive",
              });
            }}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
            }}
          >
            <Page pageNumber={1} width={width ? width : 1} />
          </Document>
        </div>
      </div>
    </div>
  );
}

export default PdfRenderer