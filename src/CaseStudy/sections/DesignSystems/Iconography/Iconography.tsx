import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ActionIcons } from "CaseStudy/assets/DesignSystem/Icons/Actions";
import { NavigationIcons } from "CaseStudy/assets/DesignSystem/Icons/Navigation";
import { DuotoneIcons } from "CaseStudy/assets/DesignSystem/Icons/Duotone";
import {
  scrollAnimationVariants,
  scrollAnimationWrapperProps,
} from "helpers/animations";

import "./Iconography.scss";
import { Tips } from "CaseStudy/components";

type IconProps = {
  el: ReactNode;
  label: string;
};

type IconsProps = {
  category: "Navigation" | "Action" | "Duotone";
  icons: IconProps[];
};

const Icons = ({ category, icons }: IconsProps) => {
  return (
    <motion.div className="icons-category" {...scrollAnimationWrapperProps}>
      <motion.p className="listItem" variants={scrollAnimationVariants({})}>
        {category} icons
      </motion.p>

      <ul className="icons">
        {icons.map((icon, iconIndex) => (
          <li className="icon-hasCaption" key={icon.label}>
            <motion.span
              className={`cardWithIcon-icon cardWithIcon-icon-is${category}`}
              variants={scrollAnimationVariants({
                duration: 1,
                delay: iconIndex * 0.1,
              })}
            >
              {icon.el}
            </motion.span>
            <motion.p
              variants={scrollAnimationVariants({
                duration: 1,
                delay: iconIndex * 0.1 + 0.05,
              })}
            >
              {icon.label}
            </motion.p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const Iconography = () => {
  return (
    <>
      <Icons
        category="Navigation"
        icons={[
          { el: <NavigationIcons.Home />, label: "Home" },
          { el: <NavigationIcons.QrCode />, label: "QR Codes" },
          { el: <NavigationIcons.Menu />, label: "Menus" },
          { el: <NavigationIcons.Orders />, label: "Orders" },
          { el: <NavigationIcons.Settings />, label: "Settings" },
          { el: <NavigationIcons.Info />, label: "Help" },
          { el: <NavigationIcons.Logout />, label: "Sign out" },
        ]}
      />
      <Icons
        category="Action"
        icons={[
          { el: <ActionIcons.Confirm />, label: "Confirm" },
          { el: <ActionIcons.CopyToClipboard />, label: "Copy to clipboard" },
          { el: <ActionIcons.Delete />, label: "Delete" },
          { el: <ActionIcons.Edit />, label: "Edit" },
          { el: <ActionIcons.OpenInNewTab />, label: "Open in new tab" },
          { el: <ActionIcons.Preview />, label: "Preview" },
          { el: <ActionIcons.Reload />, label: "Reload" },
          { el: <ActionIcons.SendEmail />, label: "Send email" },
          {
            el: <ActionIcons.ShowPassword isHidden />,
            label: "Show password",
          },
          {
            el: <ActionIcons.ShowPassword />,
            label: "Hide password",
          },
          { el: <ActionIcons.ViewMore />, label: "View more" },
          { el: <ActionIcons.Close />, label: "Close" },
        ]}
      />
      <Icons
        category="Duotone"
        icons={[
          { el: <DuotoneIcons.EcoFriendly />, label: "Eco-friendly" },
          { el: <DuotoneIcons.Schedule />, label: "Schedule" },
          { el: <DuotoneIcons.Menus />, label: "Menus" },
          { el: <DuotoneIcons.Analytics />, label: "Analytics" },
          { el: <DuotoneIcons.Contactless />, label: "Contactless" },
          { el: <DuotoneIcons.Orders />, label: "Orders" },
          { el: <DuotoneIcons.Restaurants />, label: "Restaurants" },
          { el: <DuotoneIcons.QRCode />, label: "QR Codes" },
        ]}
      />
      <Tips copy="Animations can be overwhelming, so on the actual website, the icons above only animate on hover." />
    </>
  );
};

export default Iconography;
