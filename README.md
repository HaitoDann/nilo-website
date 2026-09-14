# Nilo — Site d'accueil

Site vitrine de la solution desktop **Nilo**, en HTML/CSS/JS pur (sans dépendance), pensé pour être hébergé sur **GitHub Pages**.

## Structure

```
index.html   → la page
style.css    → les styles (responsive + mode sombre automatique)
script.js    → menu mobile + petites interactions
.nojekyll    → indique à GitHub Pages de servir les fichiers tels quels
```

## Prévisualiser en local

Ouvre simplement `index.html` dans ton navigateur, ou lance un petit serveur :

```bash
python3 -m http.server 8000
# puis ouvre http://localhost:8000
```

## Mettre en ligne avec GitHub Pages

1. Va dans **Settings → Pages** du dépôt.
2. Section *Build and deployment*, choisis **Deploy from a branch**.
3. Sélectionne la branche (ex. `main`) et le dossier `/ (root)`, puis **Save**.
4. Le site sera accessible à l'adresse `https://haitodann.github.io/nilo-website/` après quelques instants.

## Le bouton « Télécharger »

Tous les boutons de téléchargement pointent vers :

```
https://github.com/haitodann/nilo-website/releases/latest
```

Il redirige automatiquement vers la **dernière release GitHub** du dépôt.
Pense donc à publier une release contenant les binaires (Windows / macOS / Linux).

## Personnaliser

- **Textes** : tout est dans `index.html` (présentation, fonctionnalités, FAQ).
- **Couleurs** : modifie les variables `--primary`, `--grad-1`, etc. en haut de `style.css`.
- **Nom de domaine** : ajoute un fichier `CNAME` si tu utilises un domaine personnalisé.
