import { RootRoute, Route } from "@tanstack/react-router";
import { DinosaurList } from "./components/DinosaurList.tsx";
import { DinosaurDetail } from "./components/DinosaurDetail.tsx";
import { Layout } from "./components/Layout.tsx";

const rootRoute = new RootRoute({
  component: Layout,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: DinosaurList,
});

const dinosaurRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "dinosaur/$name",
  component: DinosaurDetail,
});

export const routeTree = rootRoute.addChildren([indexRoute, dinosaurRoute]);
