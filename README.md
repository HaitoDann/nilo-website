# Nilo — Site d'accueil

Site vitrine de **Nilo**, l'application desktop de gestion de projets locale (sans compte, sans serveur). HTML/CSS/JS pur, sans dépendance, hébergé sur **GitHub Pages**.

## Structure

```
index.html   → la page
style.css    → les styles (responsive + mode sombre automatique)
script.js    → menu mobile + petites interactions
assets/      → logo et icônes de l'application
.nojekyll    → sert les fichiers tels quels sur GitHub Pages
.github/workflows/deploy-pages.yml → déploiement automatique sur Pages
```

## Prévisualiser en local

```bash
python3 -m http.server 8000
# puis ouvre http://localhost:8000
```

## Mise en ligne — GitHub Pages

Le déploiement est **automatique** via GitHub Actions (`.github/workflows/deploy-pages.yml`).
À chaque push sur la branche configurée, le workflow :

1. active GitHub Pages (source = *GitHub Actions*) si nécessaire ;
2. publie le contenu du dépôt ;
3. met le site en ligne.

L'URL finale sera de la forme `https://haitodann.github.io/nilo-website/`.

> Si le tout premier déploiement échoue faute de permissions, va dans
> **Settings → Actions → General → Workflow permissions** et coche
> *Read and write permissions*, puis relance le workflow.

## Téléchargement

Les boutons pointent vers la dernière release de Nilo (`v0.15.2`) :

- Installeur : `https://github.com/HaitoDann/Nilo-releases/releases/download/v0.15.2/Nilo_0.15.2_x64-setup.exe`
- Portable : `https://github.com/HaitoDann/Nilo-releases/releases/download/v0.15.2/Nilo_0.15.2_x64_portable.exe`
- Toutes les versions : `https://github.com/HaitoDann/Nilo-releases/releases/latest`

> À chaque nouvelle version de Nilo, pense à mettre à jour le numéro `v0.15.2`
> dans `index.html` (ou remplace les liens par la page `releases/latest`).

## Personnaliser

- **Textes** : dans `index.html`.
- **Couleurs** : variables `--primary`, `--grad-1`, etc. en haut de `style.css`.
- **Domaine personnalisé** : ajoute un fichier `CNAME`.
