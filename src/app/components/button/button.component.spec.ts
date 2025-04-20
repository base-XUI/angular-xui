import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render button with default variant', () => {
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.classList.contains('bg-blue-600')).toBeTruthy();
    expect(buttonElement.classList.contains('text-white')).toBeTruthy();
    expect(buttonElement.classList.contains('hover:bg-blue-700')).toBeTruthy();
  });

  it('should render button with secondary color', () => {
    component.color = 'secondary';
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.classList.contains('bg-gray-600')).toBeTruthy();
    expect(buttonElement.classList.contains('text-white')).toBeTruthy();
    expect(buttonElement.classList.contains('hover:bg-gray-700')).toBeTruthy();
  });

  it('should render button with text variant', () => {
    component.variant = 'text';
    component.color = 'primary';
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.classList.contains('bg-transparent')).toBeTruthy();
    expect(buttonElement.classList.contains('text-blue-600')).toBeTruthy();
    expect(buttonElement.classList.contains('hover:bg-blue-100')).toBeTruthy();
  });

  it('should render button with outlined variant', () => {
    component.variant = 'outlined';
    component.color = 'primary';
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.classList.contains('bg-transparent')).toBeTruthy();
    expect(buttonElement.classList.contains('text-blue-600')).toBeTruthy();
    expect(buttonElement.classList.contains('border-blue-600')).toBeTruthy();
    expect(buttonElement.classList.contains('hover:bg-blue-100')).toBeTruthy();
  });

  it('should emit click event when clicked', () => {
    const spy = jest.spyOn(component.clicked, 'emit');
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonElement.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should not emit click event when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    const spy = jest.spyOn(component.clicked, 'emit');
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonElement.click();
    expect(spy).not.toHaveBeenCalled();
  });
});