import { Image } from "@mantine/core";
import appIcon from "../../assets/logo-icon.svg";
export const AppLogo = () => {
  return <Image src={appIcon} style={{ width: "70px", height: "70px" }} />;
};
