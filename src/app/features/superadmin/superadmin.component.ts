import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { UtilityBarComponent } from '../../Shared/utility-bar/utility-bar.component';
import { ChangePasswordModalComponent } from '../../Shared/change-password-modal/change-password-modal.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Select } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { NotificationService } from '../../core/services/notification.service';
export interface BarOptionItem {
  id: string | number;
  label: string;
  icon?: string;
  children?: BarOptionItem[];
  customMeta?: any;
}
@Component({
  selector: 'app-superadmin',
  imports: [
    CommonModule,
    UtilityBarComponent,
    ChangePasswordModalComponent,
    ReactiveFormsModule,
    FormsModule,
    Select,
    DatePickerModule,
  ],
  templateUrl: './superadmin.component.html',
  styleUrl: './superadmin.component.scss',
})
export class SUPERADMINComponent {
  constructor(
    private authService: AuthServiceService,
    private fb: FormBuilder,
    private notify: NotificationService,
  ) {}
  isPasswordModalVisible: boolean = false;
  loggedInUser = {
    name: 'Super Admin',
    initials: 'SA',
  };

  gstatViewOptions: BarOptionItem[] = [
    { id: 'home', label: 'Home', icon: 'pi pi-home' },
    {
      id: 'suuser',
      label: 'User',
      icon: 'pi pi-user',
      children: [
        { id: 'sucreate_user', label: 'Create User' },
        { id: 'suview_user', label: 'View User' },
      ],
    },
    {
      id: 'sumenu',
      label: 'Menu',
      icon: 'pi pi-bars',
      children: [
        { id: 'sucreate_menu', label: 'Create Menu' },
        { id: 'sucreate_sub_menu', label: 'Create Submenu' },
        { id: 'suview_menu', label: 'View Menu' },
        { id: 'suview_sub_view', label: 'View Submenu' },
      ],
    },
    {
      id: 'sumasters',
      label: 'Masters',
      icon: 'pi pi-building-columns',
      children: [{ id: 'sujudge_master', label: 'Judge Master' }],
    },
  ];

  handleAccountActionEvent(actionType: string): void {
    if (actionType === 'change_password') {
      this.isPasswordModalVisible = true;
    } else if (actionType === 'logout') {
      this.authService.logout();
    }
  }
  onPasswordUpdateSaved(payload: any): void {
    console.log(
      'Parent received valid payload. Ready for HTTP request pipeline:',
      payload,
    );
    this.notify.showSuccess('Password Changed Successfully');
    // Execute backend API post operations here:
    // this.authService.changePassword(payload.username, payload.oldPassword, payload.newPassword).subscribe(...);
  }

  activeView: string = 'home';

  handleBarSelectionEvent(event: {
    parent: BarOptionItem;
    child?: BarOptionItem;
  }): void {
    if (event.child) {
      this.activeView = event.child.id as string;
      console.log(
        `Triggering Sub-Option Endpoint: ${event.child.id} under parent ${event.parent.id}`,
      );
    } else {
      this.activeView = event.parent.id as string;
      console.log(`Triggering Standard Option Endpoint: ${event.parent.id}`);
    }
    this.initializeRegistrationForm();
    this.initializeMenuCreationForm();
    this.initializeSubMenuCreationForm();
    this.initializeJudgeMasterForm();
  }
  // Add this method inside your MEMBERPBComponent class
  navigateAdminAction(actionType: string): void {
    console.log(
      `Command Center redirection triggered for token: ${actionType}`,
    );

    switch (actionType) {
      case 'create_user':
        this.activeView = 'sucreate_user';
        break;
      case 'manage_users':
        // Route user stream to user index logs table view
        break;
      case 'create_menu':
        this.activeView = 'sucreate_menu';
        break;
      case 'manage_masters':
        this.activeView = 'sujudge_master';
        break;
      default:
        console.warn(
          `Unhandled system administrative action target: ${actionType}`,
        );
    }
  }

  // Change the return type from ': OnInit' to ': void'
  ngOnInit(): void {
    this.initializeRegistrationForm();
    this.initializeMenuCreationForm();
    this.initializeSubMenuCreationForm();
    this.initializeJudgeMasterForm();
  }
  //Create User
  userForm!: FormGroup;
  locationOptions = [
    { label: 'Principal Bench - New Delhi', value: 'delhi_pb' },
    { label: 'Regional Bench - Mumbai', value: 'mumbai_rb' },
    { label: 'Regional Bench - Chennai', value: 'chennai_rb' },
    { label: 'Regional Bench - Kolkata', value: 'kolkata_rb' },
  ];
  genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];
  courtOptions = [
    { label: 'Court Room No. 1 (Division Bench)', value: 'court_01' },
    { label: 'Court Room No. 2 (Single Bench)', value: 'court_02' },
    { label: 'Court Room No. 3 (Registrar Court)', value: 'court_03' },
  ];
  initializeRegistrationForm(): void {
    this.userForm = this.fb.group({
      location: [null, Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      gender: [null, Validators.required],
      court: [null, Validators.required],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ], // Validates standard 10-digit numeric numbers
    });
  }
  isFieldInvalid(fieldName: string): boolean {
    const control = this.userForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onRegisterSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched(); // Highlights any missed fields automatically
      return;
    }

    console.log(
      'Form submission successful. Sending payload to your API pipe:',
      this.userForm.value,
    );
    this.notify.showSuccess(
      'Form submission successful. Sending payload to your API pipe:',
    );
    // Execute backend posting operations here. Then reset gracefully:
    this.userForm.reset();
  }

  // create menu
  menuForm!: FormGroup;
  hasSubmenuOptions = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ];
  displayOptions = [
    { label: 'True (Visible)', value: true },
    { label: 'False (Hidden)', value: false },
  ];
  initializeMenuCreationForm(): void {
    this.menuForm = this.fb.group({
      menuName: ['', [Validators.required, Validators.minLength(3)]],
      hasSubmenu: [null, Validators.required],
      menuLink: [''], // Will handle conditional validation rules dynamically below
      priority: ['', [Validators.pattern('^[0-9]*$')]],
      display: [null, Validators.required],
    });

    // Watch the 'hasSubmenu' field for value changes programmatically
    this.menuForm
      .get('hasSubmenu')
      ?.valueChanges.subscribe((hasSubmenu: boolean | null) => {
        const menuLinkControl = this.menuForm.get('menuLink');

        if (menuLinkControl) {
          if (hasSubmenu === false) {
            // If NO submenu exists, the terminal node link path becomes strictly required
            menuLinkControl.setValidators([
              Validators.required,
              Validators.minLength(2),
            ]);
            // Pre-populate with base directory structure prefix if empty
            if (!menuLinkControl.value) {
              menuLinkControl.setValue('nclt/');
            }
          } else {
            // If it HAS a submenu, clear out any link validation rules and clear value
            menuLinkControl.clearValidators();
            menuLinkControl.setValue('');
          }
          // Force angular validation cycles to re-evaluate the inputs layout pipeline cleanly
          menuLinkControl.updateValueAndValidity();
        }
      });
  }
  isMenuFieldInvalid(fieldName: string): boolean {
    const control = this.menuForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
  onMenuSubmit(): void {
    if (this.menuForm.invalid) {
      this.menuForm.markAllAsTouched();
      return;
    }

    console.log(
      'Menu schema validation passed. Dispatching tree mapping parameters:',
      this.menuForm.value,
    );
    this.notify.showSuccess(
      'Menu schema validation passed. Dispatching tree mapping parameters:',
    );
    // Execute backend posting operations here. Then reset gracefully:
    this.menuForm.reset();
  }

  //sub-menu
  subMenuForm!: FormGroup;
  parentMenuOptions = [
    { label: 'User Management', value: 'parent_user' },
    { label: 'Menu Configuration', value: 'parent_menu' },
    { label: 'Notice Board', value: 'parent_notice' },
    { label: 'Global Masters Table', value: 'parent_masters' },
  ];

  initializeSubMenuCreationForm(): void {
    this.subMenuForm = this.fb.group({
      parentMenu: [null, Validators.required],
      subMenuName: ['', [Validators.required, Validators.minLength(3)]],
      link: ['GSTAT/', [Validators.required, Validators.minLength(7)]], // Initialized safely with required string prefix template rule
      priority: ['', [Validators.pattern('^[0-9]*$')]],
      display: [null, Validators.required],
    });
  }

  isSubMenuFieldInvalid(fieldName: string): boolean {
    const control = this.subMenuForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubMenuSubmit(): void {
    if (this.subMenuForm.invalid) {
      this.subMenuForm.markAllAsTouched();
      return;
    }

    console.log(
      'Sub-Menu profile schema verified successfully. Shipping to API pipeline:',
      this.subMenuForm.value,
    );
    // Execute backend mapping operations here. Then reset gracefully back to baseline defaults:
    // this.subMenuForm.reset({ link: 'GSTAT/' });
  }

  //judge
  judgeMasterForm!: FormGroup;

  designationOptions = [
    { label: 'Member(Judicial)', value: 'Member(Judicial)' },
    { label: 'Member(Technical)', value: 'Member(Technical)' },
  ];

  initializeJudgeMasterForm(): void {
    this.judgeMasterForm = this.fb.group({
      designation: [null, Validators.required],
      judgeName: ['', [Validators.required, Validators.minLength(3)]],
      seniority: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // Must match a clean positive integer number index ranking
      dateOfRetirement: [null, Validators.required],
    });
  }

  isJudgeFieldInvalid(fieldName: string): boolean {
    const control = this.judgeMasterForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onJudgeMasterSubmit(): void {
    if (this.judgeMasterForm.invalid) {
      this.judgeMasterForm.markAllAsTouched();
      return;
    }

    // Capture the raw form data payload state cleanly
    const formPayload = { ...this.judgeMasterForm.value };

    // Formatting PrimeNG date object into standard YYYY-MM-DD string before sending to your backend API
    if (formPayload.dateOfRetirement instanceof Date) {
      formPayload.dateOfRetirement = formPayload.dateOfRetirement
        .toISOString()
        .split('T')[0];
    }

    console.log(
      'Judge Master verification passed. Sending roster record update payload:',
      formPayload,
    );
    // Execute backend posting operations here. Then reset gracefully back to baseline defaults:
    // this.judgeMasterForm.reset();
  }
}
