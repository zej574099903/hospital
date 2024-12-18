const Layout = () => import("@/layout/index.vue");

export default {
  path: "/paperless-case",
  name: "PaperlessCase",
  component: Layout,
  redirect: "/paperless-case/list",
  meta: {
    icon: "ep:document",
    title: "无纸化病例",
    rank: 2
  },
  children: [
    {
      path: "/paperless-case/list",
      name: "PaperlessCaseList",
      component: () => import("@/views/paperless-case/index.vue"),
      meta: {
        title: "病例管理"
      }
    }
  ]
} satisfies RouteConfigsTable;
