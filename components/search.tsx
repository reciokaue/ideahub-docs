"use client";

import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useThrottle } from "@/utils/useThrottle";
import { searchText } from "@/lib/finder/search";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Typography } from "./typography";

export default function SearchButton() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [pages, setPages] = useState<any[]>([])
  const { throttle } = useThrottle({delay: 500})

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(true)
      }
    }
 
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  function handleSearchByText(text: string){
    console.time('search')
    const result = searchText(text)
    console.timeEnd('search')
    setPages(result)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="font-mono gap-2 px-2 bg-muted text-muted-foreground"
          aria-label="Buscar (Ctrl+K)"
          onClick={() => setOpen(true)}
        >
        <div className="flex items-center gap-2">
          <Search size={18} />
          <span>Buscar...</span>
        </div>

        <div className="ml-auto flex items-center gap-1 text-xs font-mono">
          <kbd className="bg-background text-foreground border rounded-md py-0.5 px-1.5 dark:border-neutral-700 border-neutral-300">
            Ctrl
          </kbd>
          <kbd className="bg-background text-foreground border rounded-md py-0.5 px-[0.28rem] dark:border-neutral-700 border-neutral-300">
            K
          </kbd>
        </div>
        </Button>
     </DialogTrigger>
      <DialogContent className="flex flex-col p-0">
        <div className="border-b p-3 gap-2 flex itens-center">
          <Search size={18} className="mt-0.5"/>
          <input
            value={search}
            className="bg-transparent w-full outline-none"
            placeholder="Buscar..."
            onChange={(e) => {
              setSearch(e.target.value)
              throttle(() => handleSearchByText(e.target.value))
            }}
          />

        </div>
        <div className="flex flex-col px-4 pb-6 space-y-2 overflow-y-auto max-h-[600px]">
          {pages.map((page) => (
            <Link
              href={page.href}
              key={page.title}
              className="rounded p-3 bg-muted"
              onClick={() => setOpen(false)}
            >
              <h4
                className="text-sm font-semibold"
                dangerouslySetInnerHTML={{__html: page.title}}
              />
              <p dangerouslySetInnerHTML={{__html: page.description}}/>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>

   
  );
}
