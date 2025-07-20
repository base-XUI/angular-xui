import { CardVariant } from "./card.types";

export const cardVariants = (variant: CardVariant = "filled") => {
  const baseClasses =
    "text-card-foreground space-y-6 [&>:first-child]:pt-6 [&>:last-child]:pb-6 block";

  const variantClasses = {
    filled: "bg-card border-border border shadow-sm",
    outlined:
      "bg-transparent border border-border hover:bg-card/5 transition-colors",
  };

  return `${baseClasses} ${variantClasses[variant]}`;
};
