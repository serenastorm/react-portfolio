import Responsiveness0 from "./responsiveness0.jpg";
import Responsiveness1 from "./responsiveness1.jpg";

import MobileSideBar from "./datePicker-mobile-sidebar.jpg";
import MobileDashboard from "./datePicker-mobile-dashboard.jpg";
import MobileCalendar from "./datePicker-mobile-calendar.png";
import MobileHeaderWithoutPicker from "./datePicker-mobile-header-without-picker.png";
import MobileHeaderWithPicker from "./datePicker-mobile-header-with-picker.png";
import MobileButtons30Days from "./datePicker-mobile-buttons-30days.png";
import MobileButtonsToday from "./datePicker-mobile-buttons-today.png";
import MobileButtonsNone from "./datePicker-mobile-buttons-none.png";

export const ResponsivenessImages = {
  Desktop: [Responsiveness0, Responsiveness1],
  Mobile: {
    SideBar: MobileSideBar,
    Dashboard: MobileDashboard,
    Header: {
      WithoutPicker: MobileHeaderWithoutPicker,
      WithPicker: MobileHeaderWithPicker,
    },
    Calendar: MobileCalendar,
    Buttons: {
      Today: MobileButtonsToday,
      DatePicker: MobileButtons30Days,
      NoneSelected: MobileButtonsNone,
    },
  },
};
