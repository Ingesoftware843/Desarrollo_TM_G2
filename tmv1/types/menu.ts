export type Menu = {
  id: number;
  title: string;
  path?: string;
  newTab: boolean;
  visiblePara?: string[],
  submenu?: Menu[];
};
