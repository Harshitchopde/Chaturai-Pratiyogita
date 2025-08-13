import { ACCOUNT_TYPE } from "../utils/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/instructor",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Quizzes",
    path: "/dashboard/my-quiz",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Quiz",
    path: "/dashboard/add-quiz",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscAdd",
  },
  {
    id:5,
    name: "Quiz Studio",
    path: "/quiz-studio",
    icon: "VscLinkExternal",
    newTab:true,
    type:ACCOUNT_TYPE.INSTRUCTOR,
  }
  ];

