# Socle à Socle — Site V4

Cette version utilise **Jekyll**, le générateur intégré à GitHub Pages.

## Ajouter des photos

Il suffit de déposer n'importe quelle image dans le dossier :

```text
rsc/
```

Exemples :

```text
rsc/IMG_2026.jpg
rsc/table-necromunda.webp
rsc/photo vendredi.png
rsc/mon-decors.jpeg
```

Aucune liste à modifier.
Aucune convention de nommage.
Aucun script Python.
Aucun GitHub Action personnalisé.

Formats pris en charge :

- JPG / JPEG
- PNG
- WEBP
- GIF
- AVIF

Les 4 premières images, triées par nom de fichier, sont utilisées dans la mosaïque d'accueil.
Toutes les images sont affichées dans la galerie.

## GitHub Pages

1. Envoie tout le contenu du projet dans ton dépôt GitHub.
2. Va dans **Settings → Pages**.
3. Dans **Build and deployment**, choisis **Deploy from a branch**.
4. Sélectionne ta branche principale (`main`) et le dossier `/ (root)`.
5. Enregistre.

GitHub Pages lance Jekyll automatiquement. À chaque fois que tu ajoutes ou supprimes une image dans `rsc/` et que tu pousses la modification, la galerie est reconstruite automatiquement.

## Important : ouverture locale

Cette version doit être visualisée via GitHub Pages ou via un serveur Jekyll local.

Un double-clic sur `index.html` ne peut pas fonctionner correctement, car le fichier contient des balises Liquid (`{% ... %}`) qui sont transformées par Jekyll lors du déploiement.

## Modifier les textes

Tous les textes du site restent centralisés dans :

```text
config.js
```

Le lien Discord est également dans `config.js`.


## Agrandir les photos

Toutes les photos de la galerie et du bandeau d'accueil sont cliquables.

Le clic ouvre un carrousel plein écran avec :

- photo précédente / suivante ;
- compteur de photos ;
- fermeture avec la croix ou `Échap` ;
- navigation au clavier avec `←` et `→` ;
- swipe gauche/droite sur mobile.

Aucune bibliothèque externe n'est utilisée.


## SEO / Référencement Google

La V6 ajoute :

- un titre Google ciblé sur `association`, `wargame`, `figurines`, `modélisme` et `Toulouse` ;
- une meta description optimisée ;
- une URL canonique ;
- les balises Open Graph et Twitter pour de beaux aperçus lors du partage ;
- des données structurées Schema.org de type `Organization` ;
- `robots.txt` ;
- `sitemap.xml` ;
- des textes visibles retravaillés naturellement autour du wargame, des figurines et du modélisme à Toulouse ;
- des textes alternatifs plus descriptifs sur les images ;
- une image de partage `social-card.png`.

### Important : renseigner l'URL du site

Dans `_config.yml`, renseigne l'URL réelle après la première mise en ligne.

Exemple avec un domaine personnalisé :

```yml
url: "https://www.socleasocle.fr"
baseurl: ""
```

Exemple avec un dépôt GitHub Pages :

```yml
url: "https://mon-compte.github.io"
baseurl: "/socle-a-socle"
```

Cela permet à la balise canonique, au sitemap et aux aperçus sociaux d'utiliser les bonnes URL absolues.

### Après la mise en ligne

Pour accélérer l'apparition dans Google :

1. ajoute le site dans **Google Search Console** ;
2. valide la propriété ;
3. soumets `https://TON-SITE/sitemap.xml` ;
4. utilise l'inspection d'URL pour demander l'indexation de la page d'accueil ;
5. cherche quelques liens locaux vers le site : annuaire associatif, maison de quartier, partenaires, communautés de jeux et de figurines à Toulouse.

Le site ne contient volontairement pas de balise `meta keywords` : les mots-clés utiles sont placés naturellement dans les titres et le contenu visible.
