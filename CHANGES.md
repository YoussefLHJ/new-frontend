# CHANGES.md

## 🧩 1. Root (Project Configuration)

### New

* .postcssrc.json

### Modified

* Dockerfile
* LICENSE.md
* README.md
* angular.json
* eslint.config.js
* package.json
* package-lock.json
* tsconfig.app.json
* tsconfig.json
* tsconfig.spec.json
* vercel.json

---

## 🧩 2. src/app/app

* src/app/app.module.ts

---

## 🧩 3. src/app/layout

* src/app/layout/component/app.layout.module.ts
* src/app/layout/component/app.menu.component.ts
* src/app/layout/component/app.topbar.component.html
* src/app/layout/component/app.topbar.component.ts

---

## 🧩 4. src/app/module (Admin & Security)

### Admin Core

* src/app/module/admin/activation-admin/activation-admin.component.ts
* src/app/module/admin/admin.module.ts

### Admin Config

* src/app/module/admin/view/config/appareil/create/appareil-create-admin.component.html

* src/app/module/admin/view/config/appareil/create/appareil-create-admin.component.ts

* src/app/module/admin/view/config/appareil/edit/appareil-edit-admin.component.html

* src/app/module/admin/view/config/appareil/edit/appareil-edit-admin.component.ts

* src/app/module/admin/view/config/appareil/list/appareil-list-admin.component.html

* src/app/module/admin/view/config/appareil/list/appareil-list-admin.component.ts

* src/app/module/admin/view/config/appareil/view/appareil-view-admin.component.html

* src/app/module/admin/view/config/batiment/create/batiment-create-admin.component.html

* src/app/module/admin/view/config/batiment/create/batiment-create-admin.component.ts

* src/app/module/admin/view/config/batiment/edit/batiment-edit-admin.component.html

* src/app/module/admin/view/config/batiment/edit/batiment-edit-admin.component.ts

* src/app/module/admin/view/config/batiment/list/batiment-list-admin.component.html

* src/app/module/admin/view/config/batiment/list/batiment-list-admin.component.ts

* src/app/module/admin/view/config/batiment/view/batiment-view-admin.component.html

* src/app/module/admin/view/config/commune/create/commune-create-admin.component.html

* src/app/module/admin/view/config/commune/create/commune-create-admin.component.ts

* src/app/module/admin/view/config/commune/edit/commune-edit-admin.component.html

* src/app/module/admin/view/config/commune/edit/commune-edit-admin.component.ts

* src/app/module/admin/view/config/commune/list/commune-list-admin.component.html

* src/app/module/admin/view/config/commune/list/commune-list-admin.component.ts

* src/app/module/admin/view/config/commune/view/commune-view-admin.component.html

* src/app/module/admin/view/config/config-admin.module.ts

### Admin Releve

* src/app/module/admin/view/releve/lot-releve/create/lot-releve-create-admin.component.html

* src/app/module/admin/view/releve/lot-releve/create/lot-releve-create-admin.component.ts

* src/app/module/admin/view/releve/lot-releve/edit/lot-releve-edit-admin.component.html

* src/app/module/admin/view/releve/lot-releve/edit/lot-releve-edit-admin.component.ts

* src/app/module/admin/view/releve/lot-releve/list/lot-releve-list-admin.component.html

* src/app/module/admin/view/releve/lot-releve/list/lot-releve-list-admin.component.ts

* src/app/module/admin/view/releve/lot-releve/view/lot-releve-view-admin.component.html

* src/app/module/admin/view/releve/tournee-lot-releve/create/tournee-lot-releve-create-admin.component.html

* src/app/module/admin/view/releve/tournee-lot-releve/create/tournee-lot-releve-create-admin.component.ts

* src/app/module/admin/view/releve/tournee-lot-releve/edit/tournee-lot-releve-edit-admin.component.html

* src/app/module/admin/view/releve/tournee-lot-releve/edit/tournee-lot-releve-edit-admin.component.ts

* src/app/module/admin/view/releve/tournee-lot-releve/list/tournee-lot-releve-list-admin.component.html

* src/app/module/admin/view/releve/tournee-lot-releve/list/tournee-lot-releve-list-admin.component.ts

* src/app/module/admin/view/releve/tournee-lot-releve/view/tournee-lot-releve-view-admin.component.html

* src/app/module/admin/view/releve/tournee-releve-compteur/create/tournee-releve-compteur-create-admin.component.html

* src/app/module/admin/view/releve/tournee-releve-compteur/create/tournee-releve-compteur-create-admin.component.ts

* src/app/module/admin/view/releve/tournee-releve-compteur/edit/tournee-releve-compteur-edit-admin.component.html

* src/app/module/admin/view/releve/tournee-releve-compteur/edit/tournee-releve-compteur-edit-admin.component.ts

* src/app/module/admin/view/releve/tournee-releve-compteur/list/tournee-releve-compteur-list-admin.component.html

* src/app/module/admin/view/releve/tournee-releve-compteur/list/tournee-releve-compteur-list-admin.component.ts

* src/app/module/admin/view/releve/tournee-releve-compteur/view/tournee-releve-compteur-view-admin.component.html

* src/app/module/admin/view/releve/tournee-releve-detail/create/tournee-releve-detail-create-admin.component.html

* src/app/module/admin/view/releve/tournee-releve-detail/create/tournee-releve-detail-create-admin.component.ts

* src/app/module/admin/view/releve/tournee-releve-detail/edit/tournee-releve-detail-edit-admin.component.html

* src/app/module/admin/view/releve/tournee-releve-detail/edit/tournee-releve-detail-edit-admin.component.ts

* src/app/module/admin/view/releve/tournee-releve-detail/list/tournee-releve-detail-list-admin.component.html

* src/app/module/admin/view/releve/tournee-releve-detail/list/tournee-releve-detail-list-admin.component.ts

* src/app/module/admin/view/releve/tournee-releve-detail/view/tournee-releve-detail-view-admin.component.html

* src/app/module/admin/view/releve/unite-releve/create/unite-releve-create-admin.component.html

* src/app/module/admin/view/releve/unite-releve/create/unite-releve-create-admin.component.ts

* src/app/module/admin/view/releve/unite-releve/edit/unite-releve-edit-admin.component.html

* src/app/module/admin/view/releve/unite-releve/edit/unite-releve-edit-admin.component.ts

* src/app/module/admin/view/releve/unite-releve/list/unite-releve-list-admin.component.html

* src/app/module/admin/view/releve/unite-releve/list/unite-releve-list-admin.component.ts

* src/app/module/admin/view/releve/unite-releve/view/unite-releve-view-admin.component.html

* src/app/module/admin/view/releve/zone-agence-releve/create/zone-agence-releve-create-admin.component.html

* src/app/module/admin/view/releve/zone-agence-releve/create/zone-agence-releve-create-admin.component.ts

* src/app/module/admin/view/releve/zone-agence-releve/edit/zone-agence-releve-edit-admin.component.html

* src/app/module/admin/view/releve/zone-agence-releve/edit/zone-agence-releve-edit-admin.component.ts

* src/app/module/admin/view/releve/zone-agence-releve/list/zone-agence-releve-list-admin.component.html

* src/app/module/admin/view/releve/zone-agence-releve/list/zone-agence-releve-list-admin.component.ts

* src/app/module/admin/view/releve/zone-agence-releve/view/zone-agence-releve-view-admin.component.html

* src/app/module/admin/view/releve/zone-ville-region-releve/create/zone-ville-region-releve-create-admin.component.html

* src/app/module/admin/view/releve/zone-ville-region-releve/create/zone-ville-region-releve-create-admin.component.ts

* src/app/module/admin/view/releve/zone-ville-region-releve/edit/zone-ville-region-releve-edit-admin.component.html

* src/app/module/admin/view/releve/zone-ville-region-releve/edit/zone-ville-region-releve-edit-admin.component.ts

* src/app/module/admin/view/releve/zone-ville-region-releve/list/zone-ville-region-releve-list-admin.component.html

* src/app/module/admin/view/releve/zone-ville-region-releve/list/zone-ville-region-releve-list-admin.component.ts

* src/app/module/admin/view/releve/zone-ville-region-releve/view/zone-ville-region-releve-view-admin.component.html

* src/app/module/admin/view/releve/zone-ville-releve/create/zone-ville-releve-create-admin.component.html

* src/app/module/admin/view/releve/zone-ville-releve/create/zone-ville-releve-create-admin.component.ts

* src/app/module/admin/view/releve/zone-ville-releve/edit/zone-ville-releve-edit-admin.component.html

* src/app/module/admin/view/releve/zone-ville-releve/edit/zone-ville-releve-edit-admin.component.ts

* src/app/module/admin/view/releve/zone-ville-releve/list/zone-ville-releve-list-admin.component.html

* src/app/module/admin/view/releve/zone-ville-releve/list/zone-ville-releve-list-admin.component.ts

* src/app/module/admin/view/releve/zone-ville-releve/view/zone-ville-releve-view-admin.component.html

* src/app/module/admin/view/releve/releve-admin.module.ts

### Security

* src/app/module/security/action-permission/create/action-permission-create.component.html

* src/app/module/security/action-permission/edit/action-permission-edit.component.html

* src/app/module/security/action-permission/list/action-permission-list.component.html

* src/app/module/security/action-permission/view/action-permission-view.component.html

* src/app/module/security/model-permission/create/model-permission-create.component.html

* src/app/module/security/model-permission/edit/model-permission-edit.component.html

* src/app/module/security/model-permission/list/model-permission-list.component.html

* src/app/module/security/model-permission/view/model-permission-view.component.html

* src/app/module/security/model-permission-utilisateur/create/model-permission-user-create.component.html

* src/app/module/security/model-permission-utilisateur/edit/model-permission-user-edit.component.html

* src/app/module/security/model-permission-utilisateur/list/model-permission-user-list.component.html

* src/app/module/security/model-permission-utilisateur/view/model-permission-user-view.component.html

* src/app/module/security/role/create/role-create.component.html

* src/app/module/security/role/edit/role-edit.component.html

* src/app/module/security/role/list/role-list.component.html

* src/app/module/security/role/view/role-view.component.html

* src/app/module/security/user/create/user-create.component.html

* src/app/module/security/user/edit/user-edit.component.html

* src/app/module/security/user/list/user-list.component.html

* src/app/module/security/user/list/user-list.component.ts

* src/app/module/security/user/view/user-view.component.html

* src/app/module/security/user/view/user-view.component.ts

* src/app/module/security/security.module.ts

---

## 🧩 5. src/app/shared

* src/app/shared/criteria/config/AppareilCriteria.model.ts

* src/app/shared/criteria/config/BatimentCriteria.model.ts

* src/app/shared/criteria/releve/LotReleveCriteria.model.ts

* src/app/shared/criteria/releve/TourneeReleveCompteurCriteria.model.ts

* src/app/shared/criteria/releve/UniteReleveCriteria.model.ts

* src/app/shared/criteria/releve/ZoneAgenceReleveCriteria.model.ts

* src/app/shared/model/config/Appareil.model.ts

* src/app/shared/model/config/Batiment.model.ts

* src/app/shared/model/config/Commune.model.ts

* src/app/shared/model/releve/LotReleve.model.ts

* src/app/shared/model/releve/TourneeLotReleve.model.ts

* src/app/shared/model/releve/TourneeReleveCompteur.model.ts

* src/app/shared/model/releve/TourneeReleveDetail.model.ts

* src/app/shared/model/releve/UniteReleve.model.ts

* src/app/shared/model/releve/ZoneAgenceReleve.model.ts

* src/app/shared/model/releve/ZoneVilleRegionReleve.model.ts

---

## 🧩 6. src/app/zynerator

* src/app/zynerator/controller/AbstractCreateController.ts
* src/app/zynerator/controller/AbstractEditController.ts
* src/app/zynerator/controller/AbstractListController.ts
* src/app/zynerator/controller/AbstractViewController.ts
* src/app/zynerator/service/AbstractService.ts
* src/app/zynerator/security/shared/service/Auth.service.ts
* src/app/zynerator/security/shared/service/Role.service.ts
* src/app/zynerator/security/shared/service/Token.service.ts
* src/app/zynerator/util/export.service.ts

---

## 🧩 7. src/assets

* src/assets/styles.scss
* src/assets/tailwind.css
