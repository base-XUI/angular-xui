import {
  Signal,
  WritableSignal,
  TemplateRef,
  Type,
  EventEmitter,
  ElementRef,
} from "@angular/core";
import { VariantProps } from "class-variance-authority";

export type TooltipPlacement =
  | "auto-end"
  | "auto-start"
  | "auto"
  | "bottom-end"
  | "bottom-start"
  | "bottom"
  | "left-end"
  | "left-start"
  | "left"
  | "right-end"
  | "right-start"
  | "right"
  | "top-end"
  | "top-start"
  | "top";

export type TooltipColor =
  | "gray"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info";

export interface TooltipEvent {
  type: string;
  target: EventTarget | null;
  currentTarget: EventTarget | null;
  preventDefault(): void;
  stopPropagation(): void;
}

export interface TooltipTemplateContext {
  $implicit: any;
  tooltip: TooltipBaseProps;
}

export interface TooltipSlots {
  tooltip?: TemplateRef<TooltipTemplateContext>;
  popper?: TemplateRef<any>;
  transition?: TemplateRef<any>;
  arrow?: TemplateRef<any>;
}

export interface TooltipComponents {
  Tooltip?: Type<any>;
  Popper?: Type<any>;
  Arrow?: Type<any>;
  Transition?: Type<any>;
}

export interface TooltipSlotProps {
  tooltip?: Record<string, any>;
  popper?: Record<string, any>;
  transition?: Record<string, any>;
  arrow?: Record<string, any>;
}

export interface TooltipBaseProps extends VariantProps<any> {
  title?: string | Signal<string>;
  arrow?: boolean | Signal<boolean>;
  disabled?: boolean | Signal<boolean>;

  disableFocusListener?: boolean | Signal<boolean>;
  disableHoverListener?: boolean | Signal<boolean>;
  disableInteractive?: boolean | Signal<boolean>;
  disableTouchListener?: boolean | Signal<boolean>;

  placement?: TooltipPlacement | Signal<TooltipPlacement>;
  open?: boolean | Signal<boolean>;

  enterDelay?: number | Signal<number>;
  enterNextDelay?: number | Signal<number>;
  enterTouchDelay?: number | Signal<number>;
  leaveDelay?: number | Signal<number>;
  leaveTouchDelay?: number | Signal<number>;

  followCursor?: boolean | Signal<boolean>;

  onOpen?: EventEmitter<TooltipEvent>;
  onClose?: EventEmitter<TooltipEvent>;

  id?: string | Signal<string>;

  slots?: TooltipSlots;
  slotProps?: TooltipSlotProps;

  components?: TooltipComponents;

  styles?: Record<string, any> | Signal<Record<string, any>>;
  classes?: string | string[] | Signal<string | string[]>;
}

export interface TooltipSignalProps {
  title: WritableSignal<string | undefined>;
  arrow: WritableSignal<boolean>;
  disabled: WritableSignal<boolean>;

  disableFocusListener: WritableSignal<boolean>;
  disableHoverListener: WritableSignal<boolean>;
  disableInteractive: WritableSignal<boolean>;
  disableTouchListener: WritableSignal<boolean>;

  placement: WritableSignal<TooltipPlacement>;
  open: WritableSignal<boolean>;

  enterDelay: WritableSignal<number>;
  enterNextDelay: WritableSignal<number>;
  enterTouchDelay: WritableSignal<number>;
  leaveDelay: WritableSignal<number>;
  leaveTouchDelay: WritableSignal<number>;

  followCursor: WritableSignal<boolean>;

  onOpen: EventEmitter<TooltipEvent>;
  onClose: EventEmitter<TooltipEvent>;

  id: WritableSignal<string | undefined>;

  slots?: TooltipSlots;
  slotProps?: TooltipSlotProps;
  components?: TooltipComponents;

  styles: WritableSignal<Record<string, any>>;
  classes: WritableSignal<string | string[]>;
}

export interface TooltipInputs {
  title: string | undefined;
  arrow: boolean;
  disabled: boolean;
  disableFocusListener: boolean;
  disableHoverListener: boolean;
  disableInteractive: boolean;
  disableTouchListener: boolean;
  placement: TooltipPlacement;
  open: boolean;
  enterDelay: number;
  enterNextDelay: number;
  enterTouchDelay: number;
  leaveDelay: number;
  leaveTouchDelay: number;
  followCursor: boolean;
  id: string | undefined;
  styles: Record<string, any>;
  classes: string | string[];
}

export interface TooltipOutputs {
  onOpen: EventEmitter<TooltipEvent>;
  onClose: EventEmitter<TooltipEvent>;
}

export type TooltipConfig = TooltipBaseProps & {
  hostElement?: ElementRef<HTMLElement>;
  triggerElement?: ElementRef<HTMLElement>;
};
