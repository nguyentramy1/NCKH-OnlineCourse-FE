import PersonsIcon from "../../../Assets/Image/person.png";
import ListIcon from "../../../Assets/Image/project.svg";
import ManageDepart from "../../../Assets/Image/my project.svg";
import Project from "../../../Assets/Image/project.svg"
import Home from "../../../Assets/Image/home.svg"
import PJResults from "../../../Assets/Image/pj-result.svg"
import AllProject from "../../../Assets/Image/file-multiple.svg"
import User from "../../../Assets/Image/User.svg"
import Campaign from "../../../Assets/Image/campain.svg"
import Statistics from "../../../Assets/Image/Statistic.svg"

interface subItems {
  title: string;
  path: string;
  role?: string;
  icon?: JSX.Element;
  
}

export interface MenuItem {
  title: string;
  icon: JSX.Element;
  subItems?: subItems[];
  role: string;
  path?: string;
  arrow: boolean;
}


export const useMenuItems = (): MenuItem[] => [
  {
    title: "Home",
    icon: <img src={Home} alt="Home" />,
    path:"/Home",
    role:"user",
    arrow: false
  },
  {
    title: "Project Management",
    icon: <img src={Project} alt="Project Management" />,
    subItems: [
      { title: "My Project", path: "/my-project" },
      { title: "Project Participated", path: "/list-project" },  
    ],
    role: "User",
    arrow: true
  },
  {
    title: "Project result",
    icon: <img src={PJResults} alt="Project result" />,
    path:"/ProjectResult",
    role:  "User",
    arrow: false
  },
  {
    title: "All project",
    icon: <img src={AllProject} alt="All project" />,
    path:"/ProjectResult",
    role:  "User",
    arrow: false
  },
  {
    title: "User Management",
    icon: <img src={User} alt="User" />,
    subItems: [
      { title: "List Account", path: "/list-project" },
    ],
    role: "Admin",
    arrow: true
  },
  {
    title: "Project Management",
    icon: <img src={Project} alt="Project" />,
    subItems: [
      { title: "List Project", path: "/list-project" },
      { title: "My Project", path: "/My-project" },  
    ],
    role: "Admin",
   arrow: true
  },
  {
    title: "Campaign Management",
    icon: <img src={Campaign} alt="Campaign" />,
    subItems: [{ title: "List Campaign", path: "/list-Campaign" }],
    role:  "Admin",
    arrow: true
  },
  {
    title: "Statistics management",
    icon: <img src={Statistics} alt="Statistics" />,
    subItems: [{ title: "Statistics", path: "/list-Statistics" }],
    role:  "Admin",
    arrow: true
  },
];

// Hàm lọc Options theo role
export const filterMenuItemsByRole = (
  menuItems: MenuItem[],
  userRole: string
): MenuItem[] => {
  // Nếu userRole không phải 'admin' hoặc 'user', gán mặc định là 'user'
  const normalizedRole = ["admin", "user"].includes(userRole.toLowerCase()) ? userRole.toLowerCase() : "user";
  return menuItems
    .filter((item) => item.role.toLowerCase() === normalizedRole) // Lọc mục cha
    .map((item) => ({
      ...item,
      subItems: item.subItems
        ? item.subItems.filter(
            (subItem) =>
              !subItem.role || subItem.role.toLowerCase() === userRole.toLowerCase()
          ) // Lọc subItems
        : undefined,
    }));
};
