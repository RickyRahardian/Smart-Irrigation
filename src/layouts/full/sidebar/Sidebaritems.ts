export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
}

import { uniqueId } from "lodash";

const SidebarContent: MenuItem[] = [
  {
    heading: "HOME",
    children: [
      {
        name: "Dashboard",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/",
      },
      {
        name: "Sawah 1",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/region1",
      },
      {
        name: "Sawah 2",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/region2",
      },
      {
        name: "Sawah 3",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/region3",
      },
      {
        name: "Sawah 4",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/region4",
      },
      {
        name: "Sawah 5",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/region5",
      },
      {
        name: "Sawah 6",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/region6",
      },
      {
        name: "Sawah 7",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/region7",
      },
      {
        name: "Sawah 8",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/region8",
      },
      {
        name: "Sawah 9",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/region9",
      },
      {
        name: "Sawah 10",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/region10",
      },
    ],
  },
  // {
  //   heading: "UTILITIES",
  //   children: [
  //     {
  //       name: "Typography",
  //       icon: "solar:text-circle-outline",
  //       id: uniqueId(),
  //       url: "/ui/typography",
  //     },
  //     {
  //       name: "Table",
  //       icon: "solar:bedside-table-3-linear",
  //       id: uniqueId(),
  //       url: "/ui/table",
  //     },
  //     {
  //       name: "Form",
  //       icon: "solar:password-minimalistic-outline",
  //       id: uniqueId(),
  //       url: "/ui/form",
  //     },
  //     {
  //       name: "Shadow",
  //       icon: "solar:airbuds-case-charge-outline",
  //       id: uniqueId(),
  //       url: "/ui/shadow",
  //     },
  //   ],
  // },
  {
    heading: "AUTH",
    children: [
      {
        name: "Login",
        icon: "solar:login-2-linear",
        id: uniqueId(),
        url: "/auth/login",
      },
      {
        name: "Register",
        icon: "solar:shield-user-outline",
        id: uniqueId(),
        url: "/auth/register",
      },
    ],
  },
  {
    heading: "EXTRA",
    children: [
      {
        name: "Icons",
        icon: "solar:smile-circle-outline",
        id: uniqueId(),
        url: "/icons/solar",
      },
      {
        name: "Sample Page",
        icon: "solar:notes-minimalistic-outline",
        id: uniqueId(),
        url: "/sample-page",
      },
    ],
  },
];

export default SidebarContent;
