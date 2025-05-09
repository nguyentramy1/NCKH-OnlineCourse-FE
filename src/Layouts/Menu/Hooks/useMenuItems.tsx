import { Home, Users, Book, BookOpen, BookUser, Tag } from "lucide-react";
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
    icon: <Home size={20} className="menu-icon" color="#0166FF" />,
    path: "/Home",
    role: "user",
    arrow: false,
  },

  {
    title: "User Management",
    icon: (
      <Users size={20} className="menu-icon" color="#0166FF" strokeWidth={3} />
    ),
    path: "/list-user",
    role: "Admin",
    arrow: false,
  },
  {
    title: "Course Management",
    icon: (
      <Book size={20} className="menu-icon" color="#0166FF" strokeWidth={3} />
    ),
    subItems: [
      {
        title: "List Course",
        path: "/list-course",
        icon: (
          <BookOpen
            size={16}
            className="menu-icon"
            color="#0166FF"
            strokeWidth={3}
          />
        ),
      },
      {
        title: "My Course",
        path: "/My-course",
        icon: (
          <BookUser
            size={16}
            className="menu-icon"
            color="#0166FF"
            strokeWidth={3}
          />
        ),
      },
    ],
    role: "Admin",
    arrow: true,
  },
  {
    title: "Category Management",
    icon: (
      <Tag size={20} className="menu-icon" color="#0166FF" strokeWidth={3} />
    ),
    path: "/list-category",
    role: "Admin",
    arrow: false,
  },
];

// Hàm lọc Options theo role
export const filterMenuItemsByRole = (
  menuItems: MenuItem[],
  userRole: string
): MenuItem[] => {
  // Nếu userRole không phải 'admin' hoặc 'user', gán mặc định là 'user'
  const normalizedRole = ["admin", "user"].includes(userRole.toLowerCase())
    ? userRole.toLowerCase()
    : "user";
  return menuItems
    .filter((item) => item.role.toLowerCase() === normalizedRole) // Lọc mục cha
    .map((item) => ({
      ...item,
      subItems: item.subItems
        ? item.subItems.filter(
            (subItem) =>
              !subItem.role ||
              subItem.role.toLowerCase() === userRole.toLowerCase()
          ) // Lọc subItems
        : undefined,
    }));
};
