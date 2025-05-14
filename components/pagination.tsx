import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
  nextTo?: string
  nextTitle?: string
  prevTo?: string
  prevTitle?: string
}

export function Pagination({nextTitle, nextTo, prevTitle, prevTo}: PaginationProps) {
  return (
    <div className='flex items-center w-full gap-10 mt-10'>
      {prevTo && 
        <Link href={prevTo} className="flex no-underline mr-auto flex-col items-start space-y-1 group" >
          <span className="text-xs ml-8 text-muted-foreground group-hover:text-white transition-colors">Anterior</span>
          <div className="flex gap-2 text-white">
            <ChevronLeft className="size-6 text-muted-foreground group-hover:text-white transition-colors"/>
            {prevTitle}
          </div>
        </Link>
      }
      {nextTo && 
        <Link href={nextTo} className="flex no-underline ml-auto flex-col items-start space-y-1 group" >
          <span className="text-xs text-muted-foreground group-hover:text-white transition-colors">Proximo</span>
          <div className="flex gap-2 text-white">
            {nextTitle}
            <ChevronRight className="size-6 text-muted-foreground group-hover:text-white transition-colors"/>
          </div>
        </Link>
      }
    </div>
  );
};