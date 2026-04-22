## Vue backend

Le backend est une application Spring Boot.
Il suit une structure en couches.

Le chemin principal est :

`backend-ms1/src/main/java/ma/zyn/app/`

## Structure du dossier `backend-ms1/`

### `.github/`

Ce dossier contient l'automatisation GitHub.
Le fichier important est `workflows/maven.yml`.

### `.mvn/`

Ce dossier contient le support du Maven Wrapper.
Il permet de lancer Maven sans installation globale spéciale.

### `scripts/`

Ce dossier contient des scripts utilitaires.
Le script principal est `insert_rows.sh` pour générer des données de test.

### `src/`

Ce dossier contient le vrai code du backend.

### `zyn/`

Ce dossier contient surtout les certificats SSL.
Il est utilisé pour les profils `localhost` et `prod`.

### [pom.xml](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/pom.xml)

Ce fichier décrit le projet Maven.
Il déclare Spring Boot, Spring Security, JPA, MySQL, OpenAPI, Kafka, MinIO, POI et iText.

### [mvnw](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/mvnw) et [mvnw.cmd](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/mvnw.cmd)

Ces fichiers lancent Maven Wrapper.
Ils servent à compiler et packager le backend.

### [Dockerfile](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/Dockerfile)

Ce fichier crée une image Docker du backend.
Il copie le JAR et les keystores SSL, puis lance `java -jar app.jar`.

### [DockerfileWithPackage](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/DockerfileWithPackage)

Ce fichier existe pour une variante de packaging Docker.
Il sert au déploiement.

### [ReadMe.md](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/ReadMe.md)

Ce fichier est une documentation backend locale.
Il complète le README racine.

### [output.log](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/output.log)

Ce fichier ressemble à un log d'exécution.
Il n'est pas au coeur de l'application.

## Structure du code Java

### `src/main/java/ma/zyn/app/`

C'est la racine du code Java.
On y trouve le démarrage, la config SSL, le code métier et la couche `zynerator`.

### [AppApplication.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/AppApplication.java)

Ce fichier démarre Spring Boot.
Il crée aussi un utilisateur `admin` au lancement.

Il sert à :

- lancer l'application
- configurer `ObjectMapper`
- créer le rôle admin
- créer l'utilisateur admin par défaut

### [SslConfig.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/SslConfig.java)

Ce fichier prépare un `RestTemplate` avec SSL.
Il n'est chargé qu'en profil `prod`.

### `bean/core/core/`

Ce dossier contient les entités JPA métier.
Ce sont les classes qui représentent les tables.

### [Commande.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/bean/core/core/Commande.java)

Cette entité représente une commande.
Elle contient `code`, `total`, `totalPayer`, `dateCommande`, `etatComande` et la liste des `commandeItems`.

Elle est utilisée par :

- `CommandeDao`
- `CommandeAdminServiceImpl`
- `CommandeConverter`
- `CommandeRestAdmin`

### [CommandeItem.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/bean/core/core/CommandeItem.java)

Cette entité représente une ligne de commande.
Elle contient le produit, le prix, la quantité, les commentaires et un lien vers `Commande`.

### `dao/`

Ce dossier gère l'accès aux données.
Il est séparé en critères, repositories et specifications.

### `dao/criteria/`

Ce dossier contient les classes de filtre.
Elles servent à recevoir les critères de recherche.

### [CommandeCriteria.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/dao/criteria/core/core/CommandeCriteria.java)

Ce fichier porte les filtres de recherche pour les commandes.
Il contient par exemple `codeLike`, `totalMin`, `dateCommandeFrom`.

### `dao/facade/`

Ce dossier contient les interfaces repository Spring Data JPA.

### [CommandeDao.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/dao/facade/core/core/CommandeDao.java)

Ce fichier parle directement à la base via Spring Data.
Il fournit `findByCode`, `deleteByCode` et `findAllOptimized`.

### `dao/specification/`

Ce dossier construit les requêtes dynamiques.

### [CommandeSpecification.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/dao/specification/core/core/CommandeSpecification.java)

Ce fichier transforme `CommandeCriteria` en conditions JPA.
C'est lui qui applique les filtres sur `code`, `total`, `dateCommande` et `etatComande`.

### `service/facade/`

Ce dossier contient les interfaces de service.
Il définit ce que le backend sait faire.

### `service/impl/`

Ce dossier contient l'implémentation réelle de la logique métier.

### [CommandeAdminServiceImpl.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/service/impl/admin/core/CommandeAdminServiceImpl.java)

Ce fichier gère la logique métier des commandes.
Il crée, modifie, supprime et recharge aussi les `commandeItems` liés.

Il est utilisé par `CommandeRestAdmin`.

### `ws/`

Ce dossier contient la couche web.
On y trouve les DTO, les converters et les contrôleurs REST.

### `ws/dto/`

Ce dossier contient les objets envoyés au frontend.

### [CommandeDto.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/ws/dto/core/CommandeDto.java)

Ce fichier décrit la forme JSON d'une commande.
Le frontend lit et envoie cette structure.

### `ws/converter/`

Ce dossier transforme les entités en DTO et inversement.

### [CommandeConverter.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/ws/converter/core/CommandeConverter.java)

Ce fichier convertit `Commande` vers `CommandeDto`.
Il gère aussi la conversion des lignes `commandeItems`.

### `ws/facade/admin/core/`

Ce dossier contient les contrôleurs REST pour l'admin.

### [CommandeRestAdmin.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/ws/facade/admin/core/CommandeRestAdmin.java)

Ce fichier expose les endpoints HTTP des commandes.
Il reçoit les requêtes du frontend et appelle le service.

Endpoints importants :

- liste
- création
- modification
- suppression
- recherche par critères
- pagination

### `util/`

Ce dossier contient des utilitaires métiers simples.

### [DbUtils.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/util/DbUtils.java)

Ce fichier aide à lancer des requêtes JDBC simples.
Il semble surtout utile pour des tests ou des scripts.

## Le dossier `zynerator/`

Ce dossier est une couche framework interne.
Il évite de réécrire les mêmes bases dans chaque projet.

### `zynerator/controller/`

Contient des contrôleurs abstraits réutilisables.

### `zynerator/converter/`

Contient les bases communes pour les converters.

### `zynerator/criteria/`

Contient les critères de base partagés.

### `zynerator/dto/`

Contient les DTO de base comme `BaseDto`, `AuditBaseDto`, `PaginatedList`.

### `zynerator/security/`

C'est le coeur de la sécurité backend.
On y trouve les beans utilisateur, les rôles, le JWT, les services et les endpoints d'authentification.

### [WebSecurityConfig.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/zynerator/security/config/WebSecurityConfig.java)

Ce fichier protège les routes.
Il autorise les endpoints publics comme `/login` et bloque `/api/admin/**` pour les utilisateurs admin.

### [AuthController.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/zynerator/security/ws/facade/AuthController.java)

Ce fichier gère l'inscription, l'activation du compte et la connexion.
Il renvoie le token JWT au frontend après un login réussi.

### [UserServiceImpl.java](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/java/ma/zyn/app/zynerator/security/service/impl/UserServiceImpl.java)

Ce fichier gère la création des utilisateurs et le hash du mot de passe.
Il implémente aussi `loadUserByUsername` pour Spring Security.

### `zynerator/service/`

Contient les services abstraits génériques.
Les services métier comme `CommandeAdminServiceImpl` s'appuient dessus.

### `zynerator/repository/`

Contient les repositories abstraits communs.

### `zynerator/specification/`

Contient les classes de base pour les filtres dynamiques JPA.

### `zynerator/util/`

Contient beaucoup d'outils communs.
Par exemple : dates, export, listes, chaînes, pagination.

### `zynerator/export/`

Contient la logique liée à l'export PDF et aux rapports.

### `zynerator/transverse/cloud/`

Contient la logique MinIO pour l'upload cloud.

### `zynerator/transverse/emailling/`

Contient la logique email.
Elle est utilisée dans l'inscription et l'activation.

### `zynerator/transverse/data/`

Contient des outils de dump et de sauvegarde de base.

## Structure `src/main/resources/`

### [application.properties](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/resources/application.properties)

Ce fichier contient la configuration commune.
On y trouve le port, les logs, Kafka, MinIO, Actuator et le profil actif.

### [application-dev.properties](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/resources/application-dev.properties)

Ce fichier contient la configuration développement.
Il pointe vers MySQL `ordermanagement` et active `ddl-auto=update`.

### [application-prod.properties](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/resources/application-prod.properties)

Ce fichier contient la configuration production.
Il ajoute aussi le keystore SSL et des valeurs MinIO.

### `db/`

Ce dossier contient les fichiers de migration base de données.

### [changelog-master.xml](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/resources/db/changelog-master.xml)

Ce fichier central inclut les changements pour `Commande` et `CommandeItem`.

### `db/migration/changelog/core/`

Ce dossier contient les XML de création ou mise à jour des tables métier.

### `deploy/`

Ce dossier contient des fichiers de déploiement.

### [docker-compose.yml](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/resources/deploy/docker-compose/docker-compose.yml)

Ce fichier déclare une base PostgreSQL, le backend et le frontend.
Il sert au déploiement Docker complet.

### `fonts/`

Ce dossier contient des polices.
Elles servent surtout aux exports PDF.

### `template/`

Ce dossier contient des templates `.vm`.
Ils servent à produire des documents ou exports.

### `loging/`

Ce dossier contient une configuration de logs plus avancée.
On y trouve des fichiers pour Logstash et un Docker Compose.

### [logback.xml](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/resources/logback.xml)

Ce fichier règle le logging standard du backend.

### [logback-test.xml](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/resources/logback-test.xml)

Ce fichier règle les logs pendant les tests.

### [opena-pi.yaml](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/backend-ms1/src/main/resources/opena-pi.yaml)

Ce fichier décrit une documentation OpenAPI manuelle.
Il donne un exemple simple des ressources `commande` et `commandeItem`.

## Dossier `src/test/`

Ce dossier est réservé aux tests.
Dans le dépôt lu ici, il n'apporte pas de logique métier visible.

## Dossier `zyn/ssl/`

Ce dossier contient les certificats et keystores SSL.
Il existe en version `localhost` et `prod`.

## Flux simple d'une requête backend

Pour une liste de commandes :

1. `CommandeRestAdmin` reçoit la requête HTTP.
2. Il lit un `CommandeCriteria`.
3. `CommandeAdminServiceImpl` appelle `CommandeSpecification`.
4. `CommandeDao` interroge la base.
5. `CommandeConverter` transforme les entités en DTO.
6. Le backend renvoie la réponse JSON au frontend.
