import { createBrowserRouter } from "react-router";
import { TouristPanel } from "./components/TouristPanel";
import { GuideLogin } from "./components/GuideLogin";
import { GuidePanel } from "./components/GuidePanel";
import { ContributorLogin } from "./components/ContributorLogin";
import { ContributorPanel } from "./components/ContributorPanel";
import { AdminLogin } from "./components/AdminLogin";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { FareManager } from "./components/admin/FareManager";
import { SpotPublisher } from "./components/admin/SpotPublisher";
import { GuideVerification } from "./components/admin/GuideVerification";
import { CommunityModeration } from "./components/admin/CommunityModeration";
import { UserStatusMatrix } from "./components/admin/UserStatusMatrix";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: TouristPanel,
  },
  {
    path: "/guide",
    Component: GuideLogin,
  },
  {
    path: "/guide/dashboard",
    Component: GuidePanel,
  },
  {
    path: "/contributor",
    Component: ContributorLogin,
  },
  {
    path: "/contributor/dashboard",
    Component: ContributorPanel,
  },
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
    children: [
      { index: true, Component: UserStatusMatrix },
      { path: "fares", Component: FareManager },
      { path: "spots", Component: SpotPublisher },
      { path: "guides", Component: GuideVerification },
      { path: "moderation", Component: CommunityModeration },
    ],
  },
]);
