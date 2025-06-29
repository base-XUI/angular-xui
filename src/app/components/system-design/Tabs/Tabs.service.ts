import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class TabsService {
  private _value = new BehaviorSubject<any>(null);
  private _orientation = new BehaviorSubject<"horizontal" | "vertical">(
    "horizontal",
  );
  private _variant = new BehaviorSubject<
    "standard" | "scrollable" | "fullWidth"
  >("standard");
  private _indicatorColor = new BehaviorSubject<"primary" | "secondary">(
    "primary",
  );
  private _textColor = new BehaviorSubject<"inherit" | "primary" | "secondary">(
    "inherit",
  );

  readonly value$: Observable<any> = this._value.asObservable();
  readonly orientation$: Observable<"horizontal" | "vertical"> =
    this._orientation.asObservable();
  readonly variant$: Observable<"standard" | "scrollable" | "fullWidth"> =
    this._variant.asObservable();
  readonly indicatorColor$: Observable<"primary" | "secondary"> =
    this._indicatorColor.asObservable();
  readonly textColor$: Observable<"inherit" | "primary" | "secondary"> =
    this._textColor.asObservable();

  setValue(value: any): void {
    this._value.next(value);
  }

  getValue(): any {
    return this._value.value;
  }

  setOrientation(orientation: "horizontal" | "vertical"): void {
    this._orientation.next(orientation);
  }

  getOrientation(): "horizontal" | "vertical" {
    return this._orientation.value;
  }

  setVariant(variant: "standard" | "scrollable" | "fullWidth"): void {
    this._variant.next(variant);
  }

  getVariant(): "standard" | "scrollable" | "fullWidth" {
    return this._variant.value;
  }

  setIndicatorColor(color: "primary" | "secondary"): void {
    this._indicatorColor.next(color);
  }

  getIndicatorColor(): "primary" | "secondary" {
    return this._indicatorColor.value;
  }

  setTextColor(color: "inherit" | "primary" | "secondary"): void {
    this._textColor.next(color);
  }

  getTextColor(): "inherit" | "primary" | "secondary" {
    return this._textColor.value;
  }
}
