"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfilepageComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var constants_1 = require("../../shared/components/constants");
var ProfilepageComponent = /** @class */ (function () {
    function ProfilepageComponent(userService, router, toastService, formBuilder) {
        this.userService = userService;
        this.router = router;
        this.toastService = toastService;
        this.formBuilder = formBuilder;
        this.profileForm = this.formBuilder.group({
            name: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(20)]],
            lastName: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(30)]],
            dni: ['', [forms_1.Validators.required, forms_1.Validators.pattern(/^\d{8}[A-Z]$/), forms_1.Validators.maxLength(9)]],
            phoneNumber: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(15)]],
            address: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(60)]],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email, forms_1.Validators.maxLength(40)]]
        });
    }
    ProfilepageComponent.prototype.ngOnInit = function () {
        this.user = this.userService.getUser();
    };
    ProfilepageComponent.prototype.updateProfile = function () {
        var _this = this;
        var userData = {
            name: this.user.name,
            lastName: this.user.lastName,
            dni: this.user.dni,
            phoneNumber: this.user.phoneNumber,
            address: this.user.address,
            email: this.user.email,
            id: this.user.id
        };
        this.userService.updateUserProfile(userData).subscribe(function (response) {
            _this.toastService.showToast('Profile updated successfully', constants_1.TOAST_TYPES.success);
            // Fetch the updated user profile from server
            _this.userService.getUserFromServer().subscribe(function (updatedUser) {
                _this.userService.setUser(updatedUser); //latest data
                _this.user = updatedUser;
            }, function (error) {
                console.error('Error fetching updated user data:', error);
            });
        }, function (error) {
            console.error('Error updating user:', error);
            _this.toastService.showToast('Error updating profile', constants_1.TOAST_TYPES.danger);
        });
    };
    ProfilepageComponent.prototype.logout = function () {
        this.userService.logout();
        this.toastService.showToast(constants_1.TOAST_MSGS.logout, constants_1.TOAST_TYPES.danger);
        this.router.navigate(['/']);
    };
    ProfilepageComponent = __decorate([
        core_1.Component({
            selector: 'app-profilepage',
            standalone: true,
            imports: [common_1.CommonModule, router_1.RouterModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
            templateUrl: './profilepage.component.html',
            styleUrls: ['./profilepage.component.css']
        })
    ], ProfilepageComponent);
    return ProfilepageComponent;
}());
exports.ProfilepageComponent = ProfilepageComponent;
