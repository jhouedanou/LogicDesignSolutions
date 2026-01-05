#!/bin/bash

# Script à exécuter sur le serveur PlanetHoster
# Copier-coller ce script dans le terminal SSH

echo "🚀 Configuration et Build sur PlanetHoster"
echo "==========================================="
echo ""

# Vérifier le répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: Vous devez être dans /home/fggxbsyg/public_html/new"
    echo "   Exécutez: cd /home/fggxbsyg/public_html/new"
    exit 1
fi

echo "📁 Répertoire: $(pwd)"
echo ""

# Nettoyer l'ancien build
echo "🧹 Nettoyage..."
rm -rf node_modules .output .nuxt

# Installer les dépendances
echo ""
echo "📦 Installation des dépendances..."
npm install --omit=dev

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Erreur lors de l'installation"
    echo "💡 Essayez: npm cache clean --force && npm install"
    exit 1
fi

# Vérifier que sass est installé
echo ""
echo "🔍 Vérification de sass..."
if npm list sass > /dev/null 2>&1; then
    echo "✅ sass est installé"
else
    echo "⚠️  sass manquant, installation..."
    npm install sass
fi

# Builder l'application
echo ""
echo "🔨 Build de l'application..."
npm run build:server

if [ $? -eq 0 ]; then
    echo ""
    echo "=================================="
    echo "✅ Build réussi!"
    echo ""
    echo "📊 Taille du build:"
    du -sh .output/
    echo ""
    echo "🎯 Prochaines étapes:"
    echo "   1. Tester le serveur: npm start"
    echo "   2. Ou utiliser PM2: npm run start:pm2"
    echo "   3. Vérifier les logs"
    echo ""
    echo "🌐 Votre site devrait être accessible maintenant!"
    echo "=================================="
else
    echo ""
    echo "❌ Le build a échoué"
    echo ""
    echo "🔍 Diagnostic:"
    echo "   - Vérifier les logs ci-dessus"
    echo "   - Vérifier que sass est installé: npm list sass"
    echo "   - Essayer: npm rebuild"
    echo ""
    exit 1
fi
