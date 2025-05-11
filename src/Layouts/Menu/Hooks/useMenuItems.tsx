import {
  Home,
  Users,
  Book,
  BookOpen,
  BookUser,
  Tag,
  ListOrdered,
  ShoppingBasket,
} from "lucide-react";
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
    title: "Trang chủ",
    icon: <Home size={20} className="menu-icon" color="#0166FF" />,
    path: "/Home",
    role: "user",
    arrow: false,
  },

  {
    title: "Quản lý người dùng",
    icon: (
      <Users size={20} className="menu-icon" color="#0166FF" strokeWidth={3} />
    ),
    path: "/list-user",
    role: "Admin",
    arrow: false,
  },
  {
    title: "Quản lý khóa học",
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
    title: "Quản lý danh mục",
    icon: (
      <Tag size={20} className="menu-icon" color="#0166FF" strokeWidth={3} />
    ),
    path: "/list-category",
    role: "Admin",
    arrow: false,
  },
  {
    title: "Quản lý đơn hàng",
    icon: (
      <ShoppingBasket
        size={20}
        className="menu-icon"
        color="#0166FF"
        strokeWidth={3}
      />
    ),
    path: "/order-manegement",
    role: "admin",
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
