#!/bin/bash

# Script de déploiement automatique vers PlanetHoster
# Usage: ./deploy.sh

# Configuration
SERVER="fggxbsyg@votre-serveur.com"  # ⚠️ À MODIFIER avec votre vrai serveur
REMOTE_DIR="/home/fggxbsyg/public_html/new"

echo "🚀 Déploiement vers PlanetHoster"
echo "================================"
echo ""

# Vérifier que nous sommes dans le bon dossier
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json non trouvé"
    echo "💡 Veuillez exécuter ce script depuis la racine du projet"
    exit 1
fi

# Vérifier que les fichiers essentiels existent
echo "📋 Vérification des fichiers essentiels..."
MISSING_FILES=0

if [ ! -f "merge-assets.cjs" ]; then
    echo "   ❌ merge-assets.cjs manquant"
    MISSING_FILES=1
fi

if [ ! -f "convert-images.cjs" ]; then
    echo "   ❌ convert-images.cjs manquant"
    MISSING_FILES=1
fi

if [ ! -f "nuxt.config.ts" ]; then
    echo "   ❌ nuxt.config.ts manquant"
    MISSING_FILES=1
fi

if [ $MISSING_FILES -eq 1 ]; then
    echo ""
    echo "❌ Certains fichiers essentiels sont manquants"
    exit 1
fi

echo "   ✅ Tous les fichiers essentiels sont présents"
echo ""

# Demander confirmation
read -p "📤 Voulez-vous déployer vers $SERVER ? (o/N) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[OoYy]$ ]]; then
    echo "❌ Déploiement annulé"
    exit 0
fi

# Synchroniser les fichiers
echo "📤 Transfert des fichiers..."
rsync -avz --progress \
  --exclude 'node_modules' \
  --exclude '.output' \
  --exclude '.nuxt' \
  --exclude '.git' \
  --exclude '.DS_Store' \
  --exclude '*.log' \
  --exclude '.env.local' \
  ./ $SERVER:$REMOTE_DIR/

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du transfert des fichiers"
    exit 1
fi

echo ""
echo "✅ Fichiers transférés avec succès"
echo ""

# Demander si on doit installer et builder
read -p "🔨 Voulez-vous installer les dépendances et builder ? (o/N) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[OoYy]$ ]]; then
    echo "📦 Installation des dépendances et build sur le serveur..."
    ssh $SERVER "cd $REMOTE_DIR && npm install && npm run build"
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 Déploiement terminé avec succès!"
        echo ""
        echo "📝 Prochaines étapes:"
        echo "   1. Vérifiez les logs: ssh $SERVER 'tail -f /home/fggxbsyg/public_html/webhook-rebuild.log'"
        echo "   2. Testez votre site"
    else
        echo ""
        echo "⚠️  Le build a échoué. Consultez les logs sur le serveur."
        echo "   ssh $SERVER 'cd $REMOTE_DIR && npm run build'"
    fi
else
    echo ""
    echo "✅ Fichiers transférés. N'oubliez pas de builder sur le serveur:"
    echo "   ssh $SERVER"
    echo "   cd $REMOTE_DIR"
    echo "   npm install"
    echo "   npm run build"
fi

echo ""
echo "================================"
echo "✨ Script terminé"
