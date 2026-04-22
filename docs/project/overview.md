## Vue d'ensemble

Ce dépôt contient une application de gestion de commandes.
Le projet est séparé en deux parties :

- `backend-ms1/` : API Spring Boot en Java.
- `frontend/` : application Angular pour l'interface.

Le domaine principal tourne autour de deux objets :

- `Commande` : une commande.
- `CommandeItem` : une ligne de commande.

Le projet contient aussi une partie sécurité pour gérer :

- les utilisateurs
- les rôles
- les permissions de modèle
- les permissions d'action

## Comment le frontend et le backend travaillent ensemble

Le frontend envoie des requêtes HTTP au backend.
Le backend répond avec du JSON.

Exemple simple :

1. L'utilisateur ouvre la page de liste des commandes dans Angular.
2. Le composant Angular appelle `CommandeAdmin.service.ts`.
3. Ce service appelle l'API backend `/api/admin/commande/find-paginated-by-criteria`.
4. Le backend lit les critères, cherche les données en base, puis renvoie une liste paginée.
5. Le frontend affiche le résultat dans le composant `data-grid`.

## Flux d'authentification

1. Le frontend appelle `POST /login`.
2. Le backend vérifie le nom d'utilisateur et le mot de passe.
3. Le backend renvoie un token JWT.
4. Le frontend stocke ce token dans `localStorage`.
5. Le frontend renvoie ce token dans les requêtes suivantes grâce à `jwt.interceptor.ts`.

## Dossiers racine du dépôt

### `backend-ms1/`

Ce dossier contient toute la partie serveur.
On y trouve le code Spring Boot, la configuration, les scripts, les certificats et les fichiers de build Maven.

### `frontend/`

Ce dossier contient toute la partie interface utilisateur.
On y trouve le code Angular, les composants UI, les modules admin et sécurité, les assets et les fichiers de build npm.

### `.claude/`

Ce dossier contient des réglages locaux pour l'outil de développement utilisé dans ce dépôt.
Ce n'est pas du code métier.

## Fichiers racine du dépôt

### [README.md](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/README.md)

Ce fichier explique le projet à haut niveau.
Il décrit l'architecture, la stack technique et le lancement.

### [CLAUDE.md](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/CLAUDE.md)

Ce fichier donne des consignes à un assistant de code.
Il explique la structure du projet et quelques commandes utiles.

### [insert-rows.sh](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/insert-rows.sh)

Ce script racine sert de raccourci.
Il lance en fait `backend-ms1/scripts/insert_rows.sh`.

### [commande_insertion.log](/home/yousseflhj/EMSI/PFE/Ressources/Développement/Examplaires%20Projets/Project/commande_insertion.log)

Ce fichier ressemble à un fichier de log généré pendant une insertion de données.
Il ne porte pas la logique métier.

## Fichiers et dossiers techniques secondaires

Ces éléments existent pour l'outil, le build ou l'historique du dépôt :

- `.claude/settings.local.json`
- `frontend/.git/`
- `frontend/.idea/`
- `frontend/node_modules/`
- `frontend/dist/`
- `frontend/.angular/`
- `backend-ms1/target/`

Ils sont utiles pour le développement, mais ils ne portent pas la logique fonctionnelle du projet.

## Résumé simple

- Le backend gère la base de données, la sécurité et les API.
- Le frontend gère les écrans, la navigation et l'affichage.
- Les deux parties communiquent par HTTP avec des DTO JSON.
- Le module `commande` est le coeur métier visible dans ce dépôt.
