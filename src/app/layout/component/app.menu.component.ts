import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import {LayoutService} from 'src/app/layout/service/layout.service';
import {RoleService} from "src/app/zynerator/security/shared/service/Role.service";
import {AppComponent} from "src/app/app.component";
import {AuthService} from "src/app/zynerator/security/shared/service/Auth.service";
import {Router} from "@angular/router";
import {AppLayout} from "./app.layout.component";
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
  model: MenuItem[] = [];
  modelanonymous: MenuItem[] = [];
    modelAdmin: MenuItem[] = [];
constructor(public layoutService: LayoutService, public app: AppComponent, public appMain: AppLayout, private roleService: RoleService, private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.modelAdmin =
      [
                {
                    label: 'Home',
                    items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/app/admin'] }]
                },
				{
                    label: 'Pages',
                    icon: 'pi pi-fw pi-briefcase',
                    items: [
					  {
						label: 'Releve',
						icon: 'pi pi-wallet',
						items: [
                                {
                                    label: 'New releve',
                                    icon: 'pi pi-th-large',
                                    routerLink: ['/app/admin/releve/new-releve/list']
                                },
								  {
									label: 'Liste lot releve',
									icon: 'pi pi-th-large',
									routerLink: ['/app/admin/releve/lot-releve/list']
								  },
								  {
									label: 'Liste tournee releve compteur',
									icon: 'pi pi-map-marker',
									routerLink: ['/app/admin/releve/tournee-releve-compteur/list']
								  },
								  {
									label: 'Liste tournee lot releve',
									icon: 'pi pi-map-marker',
									routerLink: ['/app/admin/releve/tournee-lot-releve/list']
								  },
								  {
									label: 'Liste tournee releve detail',
									icon: 'pi pi-map-marker',
									routerLink: ['/app/admin/releve/tournee-releve-detail/list']
								  },
								  {
									label: 'Liste unite releve',
									icon: 'pi pi-map-marker',
									routerLink: ['/app/admin/releve/unite-releve/list']
								  },
								  {
									label: 'Liste zone agence releve',
									icon: 'pi pi-map-marker',
									routerLink: ['/app/admin/releve/zone-agence-releve/list']
								  },
								  {
									label: 'Liste zone ville releve',
									icon: 'pi pi-map-marker',
									routerLink: ['/app/admin/releve/zone-ville-releve/list']
								  },
								  {
									label: 'Liste zone ville region releve',
									icon: 'pi pi-map-marker',
									routerLink: ['/app/admin/releve/zone-ville-region-releve/list']
								  },
						]
					  },
					  {
						label: 'Technique',
						icon: 'pi pi-wallet',
						items: [
								  {
									label: 'Liste appareil',
									icon: 'pi pi-check',
									routerLink: ['/app/admin/config/appareil/list']
								  },
								  {
									label: 'Liste batiment',
									icon: 'pi pi-check',
									routerLink: ['/app/admin/config/batiment/list']
								  },
						]
					  },
					  {
						label: 'Commune',
						icon: 'pi pi-wallet',
						items: [
								  {
									label: 'Liste commune',
									icon: 'pi pi-check',
									routerLink: ['/app/admin/config/commune/list']
								  },
						]
					  },

				   {
					  label: 'Security Management',
					  icon: 'pi pi-wallet',
					  items: [
						  {
							  label: 'List User',
							  icon: 'pi pi-fw pi-plus-circle',
							  routerLink: ['/app/admin/security/user/list']
						  },
						  {
							  label: 'List Model',
							  icon: 'pi pi-fw pi-plus-circle',
							  routerLink: ['/app/admin/security/model-permission/list']
						  },
						  {
							  label: 'List Action Permission',
							  icon: 'pi pi-fw pi-plus-circle',
							  routerLink: ['/app/admin/security/action-permission/list']
						  },
					  ]
				  }
			]
	    }
    ];

        if (this.authService.authenticated) {
            if (this.authService.authenticatedUser.roleUsers) {
              this.authService.authenticatedUser.roleUsers.forEach(role => {
                  const roleName: string = this.getRole(role.role.authority);
                  this.roleService._role.next(roleName.toUpperCase());
                  eval('this.model = this.model' + this.getRole(role.role.authority));
              })
            }
        }
  }

    getRole(text: any){
        const [role, ...rest] = text.split('_');
        return this.upperCaseFirstLetter(rest.join(''));
    }

    upperCaseFirstLetter(word: string) {
      if (!word) { return word; }
      return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }


}
