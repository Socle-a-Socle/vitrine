# Socle à Socle — site vitrine

Site statique pour GitHub Pages.

## Ajouter des photos

Placez vos photos dans :

`images/`

Formats : JPG, JPEG, PNG, WEBP, GIF, AVIF.

Les photos sont automatiquement détectées lors du déploiement.

Les premières photos sont également affichées **dès l'arrivée sur la page**, dans le bloc d'accueil.

Pour contrôler les photos mises en avant, utilisez des noms comme :

- `01.jpg`
- `02.jpg`
- `03.jpg`
- `04.jpg`

## Modifier le texte

Tous les textes sont dans :

`config.js`

Le HTML n'a pas besoin d'être modifié.

## Mise en ligne

1. Créez un dépôt GitHub.
2. Placez le contenu de ce projet à la racine.
3. Poussez la branche `main`.
4. GitHub → Settings → Pages → Source : **GitHub Actions**.
5. Le workflow publie automatiquement le site.

Après chaque `git push`, les nouvelles photos sont prises en compte.

## Aucun serveur

Le site est entièrement statique :
HTML + CSS + JavaScript.

GitHub Pages suffit.
