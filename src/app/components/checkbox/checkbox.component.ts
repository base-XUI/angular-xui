import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  computed,
  signal,
  effect,
  booleanAttribute,
  ChangeDetectionStrategy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { LucideAngularModule } from "lucide-angular";
import { CheckboxColor, CheckboxSize, CheckboxState } from "./checkbox.types";
import { checkboxVariants } from "./variants";

@Component({
  selector: "xui-checkbox",
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: "./checkbox.component.html",
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  private _controlledCheckedState = signal<boolean | undefined>(undefined);
  private _initialCheckedState = signal<boolean>(false);

  @Input()
  set checked(value: boolean | undefined) {
    this._controlledCheckedState.set(value);
  }
  get checked(): boolean | undefined {
    return this._controlledCheckedState();
  }
  @Input({ transform: booleanAttribute })
  set defaultChecked(value: boolean) {
    this._initialCheckedState.set(value);
  }
  @Input({ transform: booleanAttribute }) public indeterminate: boolean = false;
  @Input({ transform: booleanAttribute }) public disabled: boolean = false;
  @Input({ transform: booleanAttribute }) public required: boolean = false;
  @Input() public color: CheckboxColor = "primary";
  @Input() public size: CheckboxSize = "medium";
  @Input() public id?: string;
  @Input() public name?: string;
  @Input() public value?: string | number | boolean;
  @Input() public className?: string;

  @Input() public icon: string = "";
  @Input() public checkedIcon: string = "Check";
  @Input() public indeterminateIcon: string = "Minus";

  @Output() public checkboxChange = new EventEmitter<boolean>();

  public _currentRenderedCheckedState = signal<boolean>(false);
  private _isExternallyControlled = computed(
    () => this._controlledCheckedState() !== undefined,
  );
  private _uniqueGeneratedId = `checkbox-${Date.now()}`;
  private _emitChange: (value: boolean) => void = () => {};
  private _emitTouch: () => void = () => {};

  constructor() {
    effect(() => {
      if (this._isExternallyControlled()) {
        this._currentRenderedCheckedState.set(
          this._controlledCheckedState() ?? false,
        );
      } else {
        this._currentRenderedCheckedState.set(this._initialCheckedState());
      }
    });
  }

  public readonly currentVisualState = computed<CheckboxState>(() => {
    if (this.indeterminate) return "indeterminate";
    return this._currentRenderedCheckedState() ? "checked" : "unchecked";
  });

  public readonly ariaCheckedAttribute = computed(() => {
    return this.indeterminate
      ? "mixed"
      : String(this._currentRenderedCheckedState());
  });

  public readonly iconNameToDisplay = computed(() => {
    switch (this.currentVisualState()) {
      case "indeterminate":
        return this.indeterminateIcon;
      case "checked":
        return this.checkedIcon;
      case "unchecked":
        return this.icon;
      default:
        return undefined;
    }
  });

  public readonly iconDisplaySize = computed(() => {
    switch (this.size) {
      case "small":
        return 16;
      case "large":
        return 24;
      case "medium":
      default:
        return 20;
    }
  });

  public readonly resolvedElementId = computed(
    () => this.id ?? this._uniqueGeneratedId,
  );

  public readonly checkboxContainerClasses = computed(() => {
    const baseClasses = checkboxVariants({
      color: this.color,
      size: this.size,
      state: this.currentVisualState(),
      disabled: this.disabled,
      required: this.required && this.currentVisualState() === "unchecked",
      hasIcon: this.icon !== "",
    });
    return `${baseClasses} ${this.className || ""}`.trim();
  });

  writeValue(value: boolean): void {
    this._currentRenderedCheckedState.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this._emitChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._emitTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public handleNativeInputChange(event: Event): void {
    if (this.disabled) return;

    const newValue = (event.target as HTMLInputElement).checked;
    if (!this._isExternallyControlled()) {
      this._currentRenderedCheckedState.set(newValue);
    }

    this.checkboxChange.emit(newValue);
    this._emitChange(newValue);
    this._emitTouch();
  }
}
