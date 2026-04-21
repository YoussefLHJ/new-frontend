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
						label: 'Commande Management',
						icon: 'pi pi-wallet',
						items: [
								  {
									label: 'Liste commande item',
									icon: 'pi pi-fw pi-plus-circle',
									routerLink: ['/app/admin/core/commande-item/list']
								  },
								  {
									label: 'Liste commande',
									icon: 'pi pi-fw pi-plus-circle',
									routerLink: ['/app/admin/core/commande/list']
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
                  const roleModel = (this as unknown as Record<string, MenuItem[]>)['model' + roleName];
                  if (roleModel) {
                      this.model = roleModel;
                  }
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
