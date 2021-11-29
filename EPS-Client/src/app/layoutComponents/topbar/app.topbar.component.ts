import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from '../main/app.main.component';
import { AuthenticationHandlerService } from '../../modules/auth/services/authenticationhandler.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-topbar',
	template: `
        <div class="layout-topbar">
			<div class="layout-topbar-wrapper">
                <div class="layout-topbar-left">
					<div class="layout-topbar-logo-wrapper">
						<a href="#" class="layout-topbar-logo">
							<img src="assets/layout/images/logo-pulse.png" alt="mirage-layout" />
							<span class="app-name">Agency Pulse</span>
						</a>
					</div>

					<a href="#" class="sidebar-menu-button" (click)="app.onMenuButtonClick($event)">
						<i class="pi pi-bars"></i>
					</a>

					<a href="#" class="topbar-menu-mobile-button" (click)="app.onTopbarMobileMenuButtonClick($event)">
						<i class="pi pi-ellipsis-v"></i>
					</a>
                </div>
                <div class="layout-topbar-right fadeInDown">
					<ul class="layout-topbar-actions">
						<li #profile class="topbar-item profile-item" [ngClass]="{'active-topmenuitem': app.activeTopbarItem === profile}">
							<a href="#" (click)="app.onTopbarItemClick($event,profile)">
                            <span class="profile-image-wrapper">
                                <img src="assets/layout/images/topbar/avatar-placeholder.png" alt="mirage-layout" />
                            </span>
								<span class="profile-info-wrapper">
                                <h3>{{userDisplayName}}</h3>
                            </span>
							</a>
							<ul class="profile-item-submenu fadeInDown">
								<li class="layout-submenu-footer">
									<button class="signout-button" (click)="onSignOut()">{{'APPMODULE.TOPBAR.SIGNOUT' | translate}}</button>
								</li>
							</ul>
						</li>
						<!--<li>
							<a href="#" class="layout-rightpanel-button" (click)="app.onRightPanelButtonClick($event)">
								<i class="pi pi-arrow-left"></i>
							</a>
						</li>-->
                    </ul>

					<ul class="profile-mobile-wrapper">
						<li #mobileProfile class="topbar-item profile-item" [ngClass]="{'active-topmenuitem': app.activeTopbarItem === mobileProfile}">
							<a href="#" (click)="app.onTopbarItemClick($event,mobileProfile)">
                            <span class="profile-image-wrapper">
                                <img src="assets/layout/images/topbar/avatar-placeholder.png" alt="mirage-layout" />
                            </span>
								<span class="profile-info-wrapper">
                                <h3>{{userDisplayName}}</h3>
                            </span>
							</a>
							<ul class="fadeInDown">
								<li class="layout-submenu-footer">
									<button class="signout-button" (click)="onSignOut()">{{'APPMODULE.TOPBAR.SIGNOUT' | translate}}</button>
								</li>
							</ul>
						</li>
					</ul>
                </div>
            </div>
        </div>
    `
})
export class AppTopBarComponent implements OnInit {

	activeItem: number;
	userDisplayName: string;

	constructor(public app: AppMainComponent, private authenticationHandlerService: AuthenticationHandlerService,
		private router: Router) {

	}

	ngOnInit(): void {
		this.userDisplayName = this.authenticationHandlerService.getUserDisplayName();
	}

	mobileMegaMenuItemClick(index) {
		this.app.megaMenuMobileClick = true;
		this.activeItem = this.activeItem === index ? null : index;
	}

	onSignOut() {

		this.authenticationHandlerService.logout();
		this.router.navigate(["/login"]);
	}

}
