import { TemplateRef } from "@angular/core";

export type CardVariant = "filled" | "outlined";

export interface CardProps {
  variant?: CardVariant;
  square?: boolean;
  component?: string;
}

export interface CardHeaderProps {
  title?: string;
  subheader?: string;
  avatar?: TemplateRef<any>;
  action?: TemplateRef<any>;
  titleProps?: { className?: string };
  subheaderProps?: { className?: string };
  avatarProps?: { className?: string };
  actionProps?: { className?: string };
  component?: string;
}

export interface CardActionsProps {
  disableSpacing?: boolean;
  alignment?: "start" | "end" | "center" | "space-between";
  spacing?: "compact" | "normal" | "comfortable";
  component?: string;
}

export interface CardActionAreaProps {
  disabled?: boolean;
  component?: string;
}

export interface CardContentProps {
  component?: string;
}

export interface CardMediaProps {
  src?: string;
  alt?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "3/2";
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  component?: string;
}
