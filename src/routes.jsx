import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  HomeModernIcon,
  AcademicCapIcon,
  PhoneArrowDownLeftIcon,
  NewspaperIcon,
  DocumentArrowUpIcon,
  FilmIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Intro from "./pages/intro/Intro";
import Church from "./pages/church/Church";
import Guide from "./pages/guide/Guide";
import News from "./pages/news/News";
import Enroll from "./pages/enroll/Enroll";
import Worship from "./pages/worship/Worship";
import Manage from "./pages/manage/Manage";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "notifactions",
        path: "/notifactions",
        element: <Notifications />,
      },
      {
        icon: <HomeModernIcon {...icon} />,
        name: "교회 홈",
        path: "/church",
        element: <Church />,
      },
      {
        icon: <AcademicCapIcon {...icon} />,
        name: "소개",
        path: "/intro",
        element: <Intro />,
      },
      {
        icon: <PhoneArrowDownLeftIcon {...icon} />,
        name: "안내",
        path: "/guide",
        element: <Guide />,
      },
      {
        icon: <NewspaperIcon {...icon} />,
        name: "소식",
        path: "/news",
        element: <News />,
      },
      {
        icon: <DocumentArrowUpIcon {...icon} />,
        name: "신청",
        path: "/enroll",
        element: <Enroll />,
      },
      {
        icon: <FilmIcon {...icon} />,
        name: "예배 동영상",
        path: "/worship",
        element: <Worship />,
      },
      {
        icon: <PencilSquareIcon {...icon} />,
        name: "교적 관리",
        path: "/manage",
        element: <Manage />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
