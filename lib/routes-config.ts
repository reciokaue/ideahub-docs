// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true;
  items?: EachRoute[];
};


const oldRoutes = [
  {
    title: "Getting Started",
    href: "/getting-started",
    noLink: true,
    items: [
      { title: "Introduction", href: "/introduction" },
      {
        title: "Installation",
        href: "/installation",
        items: [
          { title: "Laravel", href: "/laravel" },
          { title: "React", href: "/react" },
          { title: "Gatsby", href: "/gatsby" },
        ],
      },
    ],
  },
  {
    title: "Server Actions",
    href: "/server-actions",
    noLink: true,
    items: [
      { title: "getSession", href: "/getSession" },
      { title: "getToken", href: "/getToken" },
    ],
  },
]

export const ROUTES: EachRoute[] = [
  {
    title: "Introdução",
    href: "/introduction",
    // noLink: true,
    // items: [],
  },
  {
    title: "Software",
    href: "/software",
    noLink: true,
    items: [
      {
        title: "HarmonyOS",
        href: "/harmonyos",
        items: [
          {title: "Painel de controle", href: '/control-painel'},
          {title: "Gestos", href: '/gestures'}
        ]
      },
      { title: "Windows", href: "/windows" },
    ],
  },
  {
    title: "Aplicativos",
    href: "/apps",
    noLink: true,
    items: [
      { title: "White board", href: "/white-board" },
      { title: "Ideashare", href: "/ideashare" },
      { title: "AppGallery", href: "/appgallery" },
      { title: "Browser", href: "/browser" },
      { title: "Files", href: "/files" },
    ],
  },
  { title: "Projeção de tela", href: "/projection" },
  {
    title: "Modos de uso",
    href: "/usage-modes",
    // noLink: true,
    items: [],
  },
  {
    title: "Hardware",
    href: "/hardware",
    // noLink: true,
    items: [
      { title: "Ideahub", href: "/ideahub" },
      { title: "OPS", href: "/ops" },
    ],
  },
  {
    title: "Example Routes",
    href: '/old',
    noLink: true,
    items: oldRoutes
  }
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();

