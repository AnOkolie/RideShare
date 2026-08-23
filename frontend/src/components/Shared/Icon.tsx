import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { type IconProps } from "@tabler/icons-react";
type props = {
  IconType: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
};
export const Icon = ({ IconType }: props) => {
  return <IconType />;
};
