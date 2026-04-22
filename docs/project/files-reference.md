## Référence des fichiers importants

Ce document donne une fiche courte des fichiers les plus utiles.
Le but est de savoir rapidement à quoi sert chaque fichier.

## Fichiers racine

### [README.md](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/README.md)

Rôle : expliquer le projet complet.
Utilisation : lu par les développeurs au démarrage.
Fonctionnement : décrit la stack, l'architecture et les commandes.

### [CLAUDE.md](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/CLAUDE.md)

Rôle : guider un assistant de code.
Utilisation : support de travail, pas logique métier.
Fonctionnement : décrit l'architecture et les commandes utiles.

### [insert-rows.sh](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/insert-rows.sh)

Rôle : raccourci pour l'insertion de données.
Utilisation : lancé depuis la racine.
Fonctionnement : redirige vers `backend-ms1/scripts/insert_rows.sh`.

### [.claude/settings.local.json](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/.claude/settings.local.json)

Rôle : stocker des permissions locales d'outil.
Utilisation : interne au développement.
Fonctionnement : autorise certaines commandes shell.

## Fichiers backend

### [backend-ms1/pom.xml](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/pom.xml)

Rôle : déclarer le build Maven et les dépendances Java.
Utilisation : lu pendant `mvn compile`, `mvn test` et `mvn package`.
Fonctionnement : charge Spring Boot, JPA, Security, MySQL, OpenAPI, etc.

### [backend-ms1/src/main/java/ma/zyn/app/AppApplication.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/AppApplication.java)

Rôle : point d'entrée du backend.
Utilisation : lancé au démarrage de Spring Boot.
Fonctionnement : démarre l'application et crée un admin par défaut.

### [backend-ms1/src/main/java/ma/zyn/app/SslConfig.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/SslConfig.java)

Rôle : configurer SSL pour les appels sortants.
Utilisation : actif seulement en profil `prod`.
Fonctionnement : charge un keystore et construit un `RestTemplate` sécurisé.

### [backend-ms1/src/main/java/ma/zyn/app/bean/core/core/Commande.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/bean/core/core/Commande.java)

Rôle : représenter la table `commande`.
Utilisation : partout dans la couche métier backend.
Fonctionnement : stocke les champs principaux et la relation avec `CommandeItem`.

### [backend-ms1/src/main/java/ma/zyn/app/bean/core/core/CommandeItem.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/bean/core/core/CommandeItem.java)

Rôle : représenter la table `commande_item`.
Utilisation : liée à `Commande`.
Fonctionnement : porte les détails d'une ligne de commande.

### [backend-ms1/src/main/java/ma/zyn/app/dao/facade/core/core/CommandeDao.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/dao/facade/core/core/CommandeDao.java)

Rôle : accès base de données des commandes.
Utilisation : appelé par `CommandeAdminServiceImpl`.
Fonctionnement : s'appuie sur Spring Data JPA.

### [backend-ms1/src/main/java/ma/zyn/app/dao/criteria/core/core/CommandeCriteria.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/dao/criteria/core/core/CommandeCriteria.java)

Rôle : porter les filtres de recherche backend.
Utilisation : reçu depuis le frontend.
Fonctionnement : garde les valeurs de filtre simples.

### [backend-ms1/src/main/java/ma/zyn/app/dao/specification/core/core/CommandeSpecification.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/dao/specification/core/core/CommandeSpecification.java)

Rôle : transformer les critères en requête JPA.
Utilisation : appelé par le service de commande.
Fonctionnement : ajoute les prédicats selon les champs remplis.

### [backend-ms1/src/main/java/ma/zyn/app/service/impl/admin/core/CommandeAdminServiceImpl.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/service/impl/admin/core/CommandeAdminServiceImpl.java)

Rôle : gérer la logique métier des commandes.
Utilisation : appelé par le contrôleur REST.
Fonctionnement : crée, modifie, supprime et synchronise les lignes liées.

### [backend-ms1/src/main/java/ma/zyn/app/ws/dto/core/CommandeDto.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/ws/dto/core/CommandeDto.java)

Rôle : format de transport des commandes.
Utilisation : envoyé au frontend.
Fonctionnement : expose les champs sous forme simple JSON.

### [backend-ms1/src/main/java/ma/zyn/app/ws/converter/core/CommandeConverter.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/ws/converter/core/CommandeConverter.java)

Rôle : convertir entité et DTO.
Utilisation : appelé par `CommandeRestAdmin`.
Fonctionnement : fait les conversions aller-retour et copie les listes liées.

### [backend-ms1/src/main/java/ma/zyn/app/ws/facade/admin/core/CommandeRestAdmin.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/ws/facade/admin/core/CommandeRestAdmin.java)

Rôle : exposer les API admin des commandes.
Utilisation : appelé par Angular.
Fonctionnement : reçoit la requête, appelle le service, puis renvoie un DTO.

### [backend-ms1/src/main/java/ma/zyn/app/zynerator/security/config/WebSecurityConfig.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/zynerator/security/config/WebSecurityConfig.java)

Rôle : protéger les routes backend.
Utilisation : chargé automatiquement par Spring Security.
Fonctionnement : ouvre les routes publiques et protège `/api/admin/**`.

### [backend-ms1/src/main/java/ma/zyn/app/zynerator/security/ws/facade/AuthController.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/zynerator/security/ws/facade/AuthController.java)

Rôle : gérer login, register et activation.
Utilisation : appelé par `Auth.service.ts` côté frontend.
Fonctionnement : valide la demande, crée l'utilisateur ou renvoie un JWT.

### [backend-ms1/src/main/java/ma/zyn/app/zynerator/security/service/impl/UserServiceImpl.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/zynerator/security/service/impl/UserServiceImpl.java)

Rôle : gérer les utilisateurs backend.
Utilisation : utilisé par la sécurité et l'authentification.
Fonctionnement : encode le mot de passe, crée le compte et charge l'utilisateur pour Spring Security.

### [backend-ms1/src/main/resources/application.properties](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/resources/application.properties)

Rôle : config commune backend.
Utilisation : chargée au démarrage.
Fonctionnement : règle logs, Kafka, MinIO, Actuator et profil actif.

### [backend-ms1/src/main/resources/application-dev.properties](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/resources/application-dev.properties)

Rôle : config dev.
Utilisation : chargée si `PROFILE=dev`.
Fonctionnement : pointe vers MySQL local.

### [backend-ms1/src/main/resources/application-prod.properties](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/resources/application-prod.properties)

Rôle : config prod.
Utilisation : chargée si `PROFILE=prod`.
Fonctionnement : ajoute SSL et des valeurs serveur.

### [backend-ms1/src/main/resources/db/changelog-master.xml](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/resources/db/changelog-master.xml)

Rôle : centraliser les migrations base.
Utilisation : support de migration.
Fonctionnement : inclut les fichiers `Commande.xml` et `CommandeItem.xml`.

### [backend-ms1/src/main/resources/opena-pi.yaml](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/resources/opena-pi.yaml)

Rôle : documenter l'API avec un fichier YAML.
Utilisation : support documentaire.
Fonctionnement : décrit quelques endpoints et schémas.

### [backend-ms1/.github/workflows/maven.yml](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/.github/workflows/maven.yml)

Rôle : automatisation CI.
Utilisation : GitHub Actions.
Fonctionnement : compile, teste et package le backend.

### [backend-ms1/src/main/resources/deploy/docker-compose/docker-compose.yml](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/resources/deploy/docker-compose/docker-compose.yml)

Rôle : lancer plusieurs services Docker.
Utilisation : déploiement local ou serveur.
Fonctionnement : déclare base, backend et frontend.

### [backend-ms1/scripts/insert_rows.sh](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/scripts/insert_rows.sh)

Rôle : injecter des commandes de test.
Utilisation : support pour remplir la base.
Fonctionnement : génère du SQL puis l'exécute.

## Fichiers frontend

### [frontend/package.json](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/package.json)

Rôle : déclarer les dépendances et scripts npm.
Utilisation : lu par npm.
Fonctionnement : pilote le build Angular.

### [frontend/angular.json](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/angular.json)

Rôle : config Angular CLI.
Utilisation : lu par `ng serve` et `ng build`.
Fonctionnement : définit les assets, styles et profils de build.

### [frontend/src/main.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/main.ts)

Rôle : démarrer Angular.
Utilisation : point d'entrée frontend.
Fonctionnement : charge `AppModule`.

### [frontend/src/environments/environment.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/environments/environment.ts)

Rôle : config développement.
Utilisation : lue par les services Angular.
Fonctionnement : fournit les URLs backend et les formats.

### [frontend/src/environments/environment.prod.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/environments/environment.prod.ts)

Rôle : config production.
Utilisation : remplacée au build prod.
Fonctionnement : pointe vers les URLs HTTPS.

### [frontend/src/app/app.module.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/app.module.ts)

Rôle : module racine Angular.
Utilisation : chargé dès le démarrage.
Fonctionnement : déclare modules globaux, interceptors, i18n et thème PrimeNG.

### [frontend/src/app/app-routing.module.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/app-routing.module.ts)

Rôle : router principal.
Utilisation : utilisé par Angular Router.
Fonctionnement : sépare les routes publiques et la zone `/app`.

### [frontend/src/app/layout/component/app.layout.component.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/layout/component/app.layout.component.ts)

Rôle : layout protégé de l'application.
Utilisation : utilisé pour la zone connectée.
Fonctionnement : affiche topbar, sidebar et contenu central.

### [frontend/src/app/layout/service/layout.service.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/layout/service/layout.service.ts)

Rôle : gérer l'état visuel du layout.
Utilisation : partagé par les composants de layout.
Fonctionnement : stocke menu, thème et mode overlay.

### [frontend/src/app/module/admin/admin.module.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/module/admin/admin.module.ts)

Rôle : module admin principal.
Utilisation : chargé avec les écrans admin.
Fonctionnement : assemble auth, sécurité et écrans métier.

### [frontend/src/app/module/admin/admin-routing.module.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/module/admin/admin-routing.module.ts)

Rôle : routes admin.
Utilisation : navigation interne Angular.
Fonctionnement : charge dashboard, `core` et `security`.

### [frontend/src/app/module/admin/view/core/core-admin.module.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/module/admin/view/core/core-admin.module.ts)

Rôle : module métier principal.
Utilisation : contient `commande` et `commande-item`.
Fonctionnement : déclare les composants list/create/edit/view.

### [frontend/src/app/module/admin/view/core/core-admin-routing.module.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/module/admin/view/core/core-admin-routing.module.ts)

Rôle : routes métier.
Utilisation : navigation vers les listes métier.
Fonctionnement : expose `commande/list` et `commande-item/list`.

### [frontend/src/app/module/security/security.module.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/module/security/security.module.ts)

Rôle : module sécurité Angular.
Utilisation : gestion admin des utilisateurs et permissions.
Fonctionnement : regroupe les écrans CRUD de la sécurité.

### [frontend/src/app/module/security/security-routing.module.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/module/security/security-routing.module.ts)

Rôle : routes de sécurité.
Utilisation : navigation dans la partie sécurité.
Fonctionnement : expose les routes `list` pour user, role et permissions.

### [frontend/src/app/shared/model/core/Commande.model.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/shared/model/core/Commande.model.ts)

Rôle : modèle Angular d'une commande.
Utilisation : utilisé par les composants et services.
Fonctionnement : garde les propriétés de l'objet côté UI.

### [frontend/src/app/shared/criteria/core/CommandeCriteria.model.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/shared/criteria/core/CommandeCriteria.model.ts)

Rôle : modèle de filtre Angular.
Utilisation : envoyé au backend pour la recherche.
Fonctionnement : stocke les bornes min, max et les textes de filtre.

### [frontend/src/app/shared/service/admin/core/CommandeAdmin.service.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/shared/service/admin/core/CommandeAdmin.service.ts)

Rôle : service API des commandes.
Utilisation : appelé par les composants admin de commande.
Fonctionnement : envoie les requêtes HTTP CRUD au backend.

### [frontend/src/app/zynerator/service/AbstractService.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/zynerator/service/AbstractService.ts)

Rôle : base commune pour les services API.
Utilisation : héritée par plusieurs services.
Fonctionnement : factorise le CRUD, l'import Excel et la pagination.

### [frontend/src/app/zynerator/security/shared/service/Auth.service.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/zynerator/security/shared/service/Auth.service.ts)

Rôle : service de connexion.
Utilisation : appelé par les écrans login/register/activation.
Fonctionnement : appelle le backend, stocke l'état de connexion et redirige l'utilisateur.

### [frontend/src/app/zynerator/security/shared/service/Token.service.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/zynerator/security/shared/service/Token.service.ts)

Rôle : gérer le token JWT.
Utilisation : utilisé par `Auth.service.ts` et `jwt.interceptor.ts`.
Fonctionnement : lit et écrit le token dans `localStorage`.

### [frontend/src/app/zynerator/security/guards/auth.guard.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/zynerator/security/guards/auth.guard.ts)

Rôle : protéger les routes frontend.
Utilisation : mis dans les routes Angular.
Fonctionnement : refuse l'accès si l'utilisateur n'est pas authentifié.

### [frontend/src/app/zynerator/security/interceptors/jwt.interceptor.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/zynerator/security/interceptors/jwt.interceptor.ts)

Rôle : ajouter le JWT aux requêtes.
Utilisation : activé globalement dans `AppModule`.
Fonctionnement : clone la requête et ajoute `Authorization`.

### [frontend/src/app/zynerator/spinner/http.interceptor.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/zynerator/spinner/http.interceptor.ts)

Rôle : afficher le loader pendant les requêtes.
Utilisation : activé globalement.
Fonctionnement : appelle `LoadingService.show()` puis `hide()`.

### [frontend/src/app/zynerator/spinner/loading.service.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/zynerator/spinner/loading.service.ts)

Rôle : garder l'état de chargement.
Utilisation : lu par le spinner global.
Fonctionnement : diffuse un booléen RxJS.

### [frontend/src/app/zynerator/util/Export.service.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/zynerator/util/Export.service.ts)

Rôle : exporter des tableaux.
Utilisation : appelé par le `data-grid`.
Fonctionnement : construit des fichiers Excel, CSV et PDF.

### [frontend/src/app/pages/components/data-grid/index.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/pages/components/data-grid/index.ts)

Rôle : point d'export de la bibliothèque `data-grid`.
Utilisation : importé par les modules métier.
Fonctionnement : regroupe les composants, modèles et services.

### [frontend/src/app/pages/components/data-grid/models/data-grid.models.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/pages/components/data-grid/models/data-grid.models.ts)

Rôle : définir les types du `data-grid`.
Utilisation : utilisé par les composants de liste et de filtre.
Fonctionnement : déclare `ColumnConfig`, `ServerColumnConfig`, `FilterCondition`, etc.

### [frontend/src/app/pages/uikit/commun-create.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/pages/uikit/commun-create.ts)

Rôle : regrouper les imports nécessaires aux formulaires de création.
Utilisation : importé dans les composants `create`.
Fonctionnement : renvoie une liste de composants et modules Angular.

### [frontend/src/app/pages/uikit/commun-edit.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/pages/uikit/commun-edit.ts)

Rôle : même idée pour les écrans d'édition.
Utilisation : importé dans les composants `edit`.
Fonctionnement : évite de répéter les imports.

### [frontend/src/app/pages/uikit/commun-view.ts](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/src/app/pages/uikit/commun-view.ts)

Rôle : même idée pour les écrans de lecture.
Utilisation : importé dans les composants `view`.
Fonctionnement : centralise les composants de consultation.

### [frontend/Dockerfile](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/Dockerfile)

Rôle : créer et servir l'application frontend en Docker.
Utilisation : déploiement.
Fonctionnement : build Angular puis Nginx avec profil SSL.

### [frontend/vercel.json](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/vercel.json)

Rôle : config Vercel.
Utilisation : hébergement SPA.
Fonctionnement : redirige toutes les routes vers `index.html`.

### [frontend/htaccess](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/frontend/htaccess)

Rôle : config Apache.
Utilisation : hébergement classique.
Fonctionnement : active HTTPS et le fallback Angular.

## Fichiers générés ou de support

### `frontend/.git/`, `frontend/.idea/`, `frontend/.angular/`

Rôle : support technique local.
Utilisation : Git, IDE, cache Angular.
Fonctionnement : pas de logique métier.

### `frontend/node_modules/` et `frontend/dist/`

Rôle : dépendances et build final.
Utilisation : install et production.
Fonctionnement : générés automatiquement.

### `backend-ms1/.mvn/` et `backend-ms1/target/`

Rôle : support Maven et build Java.
Utilisation : compilation et packaging.
Fonctionnement : majoritairement générés ou outillage.

### `backend-ms1/zyn/ssl/` et `frontend/src/zyn/ssl/`

Rôle : certificats SSL.
Utilisation : profils `localhost` et `prod`.
Fonctionnement : utilisés surtout avec Docker et Nginx.
