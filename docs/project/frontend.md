## Vue frontend

Le frontend est une application Angular 21.
Il affiche les écrans admin, la sécurité et la gestion des commandes.

Le chemin principal est :

`frontend/src/app/`

## Structure du dossier `frontend/`

### `.git/`

Ce dossier contient l'historique Git du frontend.
Il ne sert pas à l'exécution de l'application.

### `.idea/`

Ce dossier contient la configuration locale de l'IDE JetBrains.
Il est utile au développeur, pas au produit.

### `.angular/`

Ce dossier est généré par Angular CLI.
Il stocke du cache de build.

### `docs/`

Ce dossier contient la documentation locale.
On y trouve déjà des fiches composants et maintenant la doc projet.

### `src/`

Ce dossier contient le vrai code Angular.

### [package.json](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/package.json)

Ce fichier déclare les dépendances npm et les scripts.
Il lance `ng serve`, `ng build`, `ng test` et `ng lint`.

### [package-lock.json](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/package-lock.json)

Ce fichier bloque les versions exactes des dépendances.
Il aide à garder un build stable.

### [angular.json](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/angular.json)

Ce fichier configure Angular CLI.
Il définit les assets, les styles, le build et le serveur de développement.

### [tsconfig.json](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/tsconfig.json)

Ce fichier règle TypeScript pour tout le frontend.

### [tsconfig.app.json](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/tsconfig.app.json)

Ce fichier règle TypeScript pour l'application principale.

### [tsconfig.spec.json](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/tsconfig.spec.json)

Ce fichier règle TypeScript pour les tests.

### [eslint.config.js](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/eslint.config.js)

Ce fichier configure ESLint.
Il sert à vérifier la qualité du code.

### `.prettierrc.json` et `.prettierignore`

Ces fichiers gèrent le formatage automatique du code.

### `.editorconfig`

Ce fichier aide l'éditeur à garder un style cohérent.

### `.gitignore`

Ce fichier indique les fichiers à ne pas versionner.

### `.postcssrc.json`

Ce fichier sert à PostCSS.
Il est utilisé avec Tailwind.

### [tailwind.config.js](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/tailwind.config.js)

Ce fichier configure Tailwind CSS.

### [Dockerfile](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/Dockerfile)

Ce fichier build l'application Angular puis la sert avec Nginx.

### [vercel.json](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/vercel.json)

Ce fichier dit à Vercel de rediriger toutes les routes vers `index.html`.
C'est utile pour une SPA Angular.

### [htaccess](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/htaccess)

Ce fichier fait la même idée pour Apache.
Il force HTTPS et redirige les routes vers `index.html`.

### `node_modules/`

Ce dossier contient les dépendances installées.
Il est généré automatiquement.

### `dist/`

Ce dossier contient le build final.
Il est généré après `npm run build`.

## Structure `src/`

### [main.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/main.ts)

Ce fichier démarre Angular.
Il charge `AppModule`.

### [index.html](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/index.html)

Ce fichier est la page HTML de base.
Angular s'y monte au démarrage.

### [styles.scss](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/styles.scss)

Ce fichier porte les styles globaux.

### [tailwind.css](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/tailwind.css)

Ce fichier charge Tailwind côté application.

### `environments/`

Ce dossier contient les variables d'environnement.

### [environment.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/environments/environment.ts)

Ce fichier règle l'environnement développement.
Il contient les URLs backend, les formats de date et quelques clés Stripe.

### [environment.prod.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/environments/environment.prod.ts)

Ce fichier règle l'environnement production.
Il pointe vers les URLs HTTPS.

### `assets/`

Ce dossier contient les fichiers statiques.

### `assets/i18n/`

Ce dossier contient les traductions.
Les fichiers `ar.json`, `en.json`, `es.json` et `fr.json` servent à l'interface multilingue.

### `assets/layout/`

Ce dossier contient les styles, images et thèmes du layout.

### `assets/demo/`

Ce dossier contient des ressources de démonstration.

### `zyn/`

Ce dossier contient la configuration Nginx et les certificats SSL pour le frontend Docker.

## Structure `src/app/`

### [app.module.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/app.module.ts)

C'est le module racine Angular.
Il déclare les dépendances globales, les interceptors, la traduction, PrimeNG et le `SpinnerComponent`.

### [app-routing.module.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/app-routing.module.ts)

Ce fichier définit les routes principales.
Il envoie vers :

- landing
- login admin
- register admin
- changement de mot de passe
- zone protégée `/app`

### [app.component.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/app.component.ts)

Ce fichier est le composant racine.
Il héberge l'application.

### [app.component.html](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/app.component.html)

Ce template affiche la structure racine.

## Dossier `layout/`

Ce dossier contient la coquille visuelle de l'application.
On y trouve la topbar, la sidebar et le layout principal.

### `layout/component/`

Ce dossier contient les composants visuels du layout.

### [app.layout.component.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/layout/component/app.layout.component.ts)

Ce fichier pilote la structure principale de l'application connectée.
Il ouvre et ferme le menu, et réagit aux changements de route.

### `app.topbar.component.ts`

Ce fichier gère la barre du haut.

### `app.sidebar.component.ts`

Ce fichier gère le menu latéral.

### `app.menu.component.ts` et `app.menuitem.component.ts`

Ces fichiers gèrent l'affichage des entrées de menu.

### `app.footer.component.ts`

Ce fichier gère le pied de page.

### `app.configurator.ts` et `app.floatingconfigurator.ts`

Ces fichiers gèrent la personnalisation visuelle.

### `layout/service/`

Ce dossier contient la logique partagée du layout.

### [layout.service.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/layout/service/layout.service.ts)

Ce service garde l'état du menu, du thème et du mode d'affichage.

## Dossier `module/`

Ce dossier contient les modules métier Angular.

### `module/admin/`

Ce dossier contient l'admin principal.
Il regroupe l'authentification admin et les écrans métier.

### [admin.module.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/module/admin/admin.module.ts)

Ce module assemble les écrans admin, les composants UI et les sous-modules métier.

### [admin-routing.module.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/module/admin/admin-routing.module.ts)

Ce fichier organise les routes admin.
Il charge le dashboard, le module `core` et le module `security`.

### `login-admin/`, `register-admin/`, `change-password-admin/`, `activation-admin/`, `forget-password-admin/`

Ces dossiers contiennent les écrans d'authentification et de compte.
Chaque dossier a généralement :

- un fichier `.ts`
- un template `.html`
- parfois un `.css`

### `module/admin/view/core/`

Ce dossier contient les écrans métier principaux.

### [core-admin.module.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/module/admin/view/core/core-admin.module.ts)

Ce module déclare les composants métier comme `CommandeListAdminComponent`.

### [core-admin-routing.module.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/module/admin/view/core/core-admin-routing.module.ts)

Ce fichier déclare les routes métier :

- `commande/list`
- `commande-item/list`
- quelques routes de sécurité réutilisées

### `commande/`

Ce dossier contient les écrans de commande.
Il est découpé en `create`, `edit`, `list`, `view`.

### `commande-item/`

Ce dossier contient les écrans des lignes de commande.
Il suit la même structure.

## Dossier `module/security/`

Ce dossier contient l'administration de la sécurité.

### [security.module.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/module/security/security.module.ts)

Ce module regroupe les écrans utilisateurs, rôles et permissions.

### [security-routing.module.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/module/security/security-routing.module.ts)

Ce fichier déclare les routes de la sécurité.
Il expose surtout les écrans `list`.

### `user/`, `role/`, `action-permission/`, `model-permission/`, `model-permission-utilisateur/`

Ces dossiers contiennent les écrans CRUD de sécurité.

## Dossier `pages/`

Ce dossier contient les pages génériques et les composants réutilisables.

### `pages/components/data-grid/`

C'est une bibliothèque interne de composants CRUD.
Elle sert beaucoup dans `commande`.

Sous-dossiers importants :

- `list/`
- `create/`
- `edit/`
- `view/`
- `shared/`
- `services/`
- `models/`

### `pages/uikit/`

Ce dossier contient des composants de formulaire réutilisables.
Exemples :

- `app-input`
- `app-input-number`
- `app-select`
- `app-datepicker`
- `app-textarea`
- `app-dialog-form`

### `pages/pipe/`

Ce dossier contient les pipes partagés.
Exemple : `signal-translate.pipe.ts`.

### `pages/service/`

Ce dossier contient des services de démonstration ou de support pour l'interface.

### `pages/dashboard/`

Ce dossier contient la page dashboard et ses widgets.

### `pages/landing/`

Ce dossier contient la page publique d'accueil.

### `pages/notfound/`

Ce dossier contient la page 404.

### [pages.routes.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/pages/pages.routes.ts)

Ce fichier renvoie vers `notfound` pour les routes inconnues.

## Dossier `shared/`

Ce dossier contient le code partagé métier.

### `shared/model/`

Ce dossier contient les modèles frontend.

### [Commande.model.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/shared/model/core/Commande.model.ts)

Ce fichier représente une commande côté Angular.
Il correspond au JSON du backend.

### `shared/criteria/`

Ce dossier contient les critères de recherche frontend.

### [CommandeCriteria.model.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/shared/criteria/core/CommandeCriteria.model.ts)

Ce fichier porte les filtres envoyés au backend pour la recherche des commandes.

### `shared/service/`

Ce dossier contient les services API métier.

### [CommandeAdmin.service.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/shared/service/admin/core/CommandeAdmin.service.ts)

Ce service appelle les endpoints backend des commandes.
Il gère aussi l'état local de la liste, de la fenêtre create, edit et view.

## Dossier `zynerator/`

Ce dossier est la couche générique du frontend.
Il contient la sécurité, les services de base, les utilitaires et le spinner.

### `zynerator/security/`

Ce dossier gère l'authentification frontend.

### [Auth.service.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/zynerator/security/shared/service/Auth.service.ts)

Ce service gère le login, le register, l'activation du compte et l'utilisateur connecté.

### [Token.service.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/zynerator/security/shared/service/Token.service.ts)

Ce service stocke et lit le token JWT dans `localStorage`.

### [auth.guard.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/zynerator/security/guards/auth.guard.ts)

Ce guard bloque les routes si l'utilisateur n'est pas connecté.

### [jwt.interceptor.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/zynerator/security/interceptors/jwt.interceptor.ts)

Cet interceptor ajoute l'en-tête `Authorization` à chaque requête HTTP.

### `zynerator/service/`

Ce dossier contient les services abstraits partagés.

### [AbstractService.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/zynerator/service/AbstractService.ts)

Ce fichier factorise les appels CRUD communs.
Il sert de base à beaucoup de services.

### [ServiceLocator.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/zynerator/service/ServiceLocator.ts)

Ce fichier donne un accès central à l'injecteur Angular.

### `zynerator/spinner/`

Ce dossier gère l'indicateur de chargement.

### [http.interceptor.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/zynerator/spinner/http.interceptor.ts)

Ce fichier montre et cache le loader autour des requêtes HTTP.

### [loading.service.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/zynerator/spinner/loading.service.ts)

Ce service garde l'état `loading`.

### `zynerator/util/`

Ce dossier contient des outils communs.

### [Export.service.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/zynerator/util/Export.service.ts)

Ce service exporte des tableaux en Excel, CSV et PDF.
Le `data-grid` l'utilise pour les exports.

## Flux simple d'une action frontend

Pour la liste des commandes :

1. La route charge `CommandeListAdminComponent`.
2. Le composant utilise `app-data-grid-list`.
3. `app-data-grid-list` passe en mode serveur.
4. `CommandeAdmin.service.ts` appelle le backend.
5. Le tableau affiche les lignes et les filtres.

Pour le login :

1. `LoginAdminComponent` appelle `Auth.service.ts`.
2. `Auth.service.ts` envoie `POST /login`.
3. `Token.service.ts` garde le JWT.
4. `jwt.interceptor.ts` renvoie ce token dans les requêtes suivantes.
