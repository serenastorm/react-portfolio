import DietaryInformation from "./DietaryInformation/DietaryInformation";
import ItemReordering from "./ItemReordering/ItemReordering";
import ModularItem from "./ModularItem/ModularItem";
import ProductImages from "./ProductImages/ProductImages";

export const NewFeaturesSections = {
  DietaryInformation,
  ItemReordering,
  ModularItem,
  ProductImages,
};

export const NewFeaturesListItems = [
  "Adding dietary information for add-ons (e.g. sauces)",
  "Adding the ability to promote certain items & add discounts",
  "Expanding customisation options; both for the visual aspect and the language",
  "QR code customisation",
  "Printing & shipping QR codes to restaurant (e.g. tables stickers)",
  "Point of Sale integration so users don’t need to manually enter orders into their systems",
  {
    title: "Payments handling",
    copy: "Note: this is probably the highest priority item as this would remove the risk of people putting fake orders through",
  },
  {
    title: "Autocomplete & suggestions based on existing items",
    copy: "For example, if a user adds an item in the ‘Burritos’ menu category with bacon and onions as add-ons, suggest these add-ons for the next item in the Burritos section",
  },
  "Loading and error states improvements",
  {
    title: "Adding search function for orders",
    copy: "Allowing users to search for table numbers, item names, etc",
  },
];
