import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariantsConfig = {
  variants: {
    variant: {
      text: "bg-transparent hover:bg-opacity-10",
      contained: "shadow-sm",
      outlined: "border bg-transparent",
    },
    color: {
      inherit: "text-inherit hover:bg-gray-100",
      primary: {
        text: "text-blue-600 hover:bg-blue-100",
        contained: "text-white bg-blue-600 hover:bg-blue-700",
        outlined: "text-blue-600 border-blue-600 hover:bg-blue-100",
      },
      secondary: {
        text: "text-gray-600 hover:bg-gray-100",
        contained: "text-white bg-gray-600 hover:bg-gray-700",
        outlined: "text-gray-600 border-gray-600 hover:bg-gray-100",
      },
      success: {
        text: "text-green-600 hover:bg-green-100",
        contained: "text-white bg-green-600 hover:bg-green-700",
        outlined: "text-green-600 border-green-600 hover:bg-green-100",
      },
      error: {
        text: "text-red-600 hover:bg-red-100",
        contained: "text-white bg-red-600 hover:bg-red-700",
        outlined: "text-red-600 border-red-600 hover:bg-red-100",
      },
      info: {
        text: "text-blue-400 hover:bg-blue-100",
        contained: "text-white bg-blue-400 hover:bg-blue-500",
        outlined: "text-blue-400 border-blue-400 hover:bg-blue-100",
      },
      warning: {
        text: "text-yellow-500 hover:bg-yellow-100",
        contained: "text-white bg-yellow-500 hover:bg-yellow-600",
        outlined: "text-yellow-500 border-yellow-500 hover:bg-yellow-100",
      },
    },
    size: {
      small: "h-8 px-3 text-xs",
      medium: "h-10 px-4 text-sm",
      large: "h-12 px-6 text-base",
    },
    fullWidth: {
      true: "w-full",
    },
    disableElevation: {
      true: "shadow-none",
    },
  },
  defaultVariants: {
    variant: "contained",
    color: "primary",
    size: "medium",
    fullWidth: false,
    disableElevation: false,
  },
} as const;

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  buttonVariantsConfig
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;