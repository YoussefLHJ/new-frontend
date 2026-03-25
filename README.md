## 🧩 1. Root (Project Configuration & DevOps)

### New Files

* .postcssrc.json

### Modified Files

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

## 🧩 2. src/app/app (Core App Module)

### Modified Files

* src/app/app.module.ts

---

## 🧩 3. src/app/layout (UI Layout Layer)

### Modified Files

* src/app/layout/component/app.layout.module.ts
* src/app/layout/component/app.menu.component.ts
* src/app/layout/component/app.topbar.component.html
* src/app/layout/component/app.topbar.component.ts

---

## 🧩 4. src/app/module/admin (Admin Features)

### Core Admin

* src/app/module/admin/activation-admin/activation-admin.component.ts
* src/app/module/admin/admin.module.ts

### Config Module

* src/app/module/admin/view/config/**

Includes:

* appareil/*
* batiment/*
* commune/*
* config-admin.module.ts

### Releve Module

* src/app/module/admin/view/releve/**

Includes:

* lot-releve/*
* tournee-lot-releve/*
* tournee-releve-compteur/*
* tournee-releve-detail/*
* unite-releve/*
* zone-agence-releve/*
* zone-ville-region-releve/*
* zone-ville-releve/*
* releve-admin.module.ts

---

## 🧩 5. src/app/module/security (Security & Access Control)

### Core Module

* src/app/module/security/security.module.ts

### Features

* action-permission/*
* model-permission/*
* model-permission-utilisateur/*
* role/*
* user/*

---

## 🧩 6. src/app/shared (Shared Models & Criteria)

### Criteria

* src/app/shared/criteria/config/*
* src/app/shared/criteria/releve/*

### Models

* src/app/shared/model/config/*
* src/app/shared/model/releve/*

---

## 🧩 7. src/app/zynerator (Framework / Abstract Layer)

### Controllers

* src/app/zynerator/controller/AbstractCreateController.ts
* src/app/zynerator/controller/AbstractEditController.ts
* src/app/zynerator/controller/AbstractListController.ts
* src/app/zynerator/controller/AbstractViewController.ts

### Services

* src/app/zynerator/service/AbstractService.ts

### Security Services

* src/app/zynerator/security/shared/service/Auth.service.ts
* src/app/zynerator/security/shared/service/Role.service.ts
* src/app/zynerator/security/shared/service/Token.service.ts

### Utilities

* src/app/zynerator/util/export.service.ts

---

## 🧩 8. src/assets (Styling & UI Resources)

### Untracked Files

* src/assets/styles.scss
* src/assets/tailwind.css

---

# ✅ Screens

![Changes 1.png](changes_screens/Changes%201.png)

![Changes 2.png](changes_screens/Changes%202.png)

![Changes 3.png](changes_screens/Changes%203.png)

![Changes 4.png](changes_screens/Changes%204.png)

---
