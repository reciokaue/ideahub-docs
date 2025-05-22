import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-[80vh] w-full items-center justify-center px-2 py-8 flex flex-col gap-3">
        <h2 className="text-7xl font-bold">404</h2>
        <p className="text-muted-foreground">Pagina não encontrada</p>

      <Link href="/" className={buttonVariants({})}>
        Voltar para pagina inicial
      </Link>
    </div>
  );
}
