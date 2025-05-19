import { sep } from "path";

export function pathToHref(filePath: string): string {
  const normalized = filePath.split(sep).join("/");
  const parts = normalized.split("/");

  const contentsIndex = parts.indexOf("contents");
  if (contentsIndex === -1 || contentsIndex === parts.length - 1)
    return "";

  const hrefParts = parts.slice(contentsIndex + 1, -1);
  return "/" + hrefParts.join("/");
}