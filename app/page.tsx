import { Pagination } from "@/components/pagination";
import { buttonVariants } from "@/components/ui/button";
import { page_routes } from "@/lib/routes-config";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex sm:min-h-[91vh] max-h-[88vh] flex-col items-center justify-center text-center px-2 py-8">
      <h1 className="text-5xl font-bold mb-4 sm:text-7xl">
        Documentação Huawei<br/><span className="text-primary">Ideahub S2</span>{" "}
      </h1>
      <p className="mb-8 sm:text-md max-w-[800px] text-muted-foreground">
        Esta documentação foi feita por um <a href="https://github.com/reciokaue">Kaue Recio</a>um aluno da Fatec-SO durante o período de estagio interno da faculdade, e esta aberta para edição e colaboração de quaisquer interessados buscando a melhor documentação possível deste projeto
      </p>
      <div>
        <Link
          href={`/docs${page_routes[0].href}`}
          className={buttonVariants({
            className: "px-6 !font-medium",
            size: "lg",
          })}
        >
          Começar
        </Link>
      </div>
    </div>
  );
}
