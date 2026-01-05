#!/bin/bash

# Script de préparation avant déploiement
# À exécuter EN LOCAL sur votre Mac avant de déployer

echo "🔧 Préparation pour le déploiement"
echo "=================================="
echo ""

# Vérifier que nous sommes dans le bon dossier
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json non trouvé"
    exit 1
fi

# 1. Fusionner les assets CSS et JS
echo "📦 Fusion des assets CSS et JS..."
npm run merge-assets

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de la fusion des assets"
    exit 1
fi

echo "✅ Assets fusionnés"
echo ""

# 2. Convertir les images en WebP
echo "🖼️  Conversion des images en WebP..."
npm run convert-images

if [ $? -ne 0 ]; then
    echo "⚠️  Avertissement: La conversion des images a échoué"
    echo "   Continuez si les images WebP existent déjà"
else
    echo "✅ Images converties"
fi

echo ""

# 3. Vérifier que les fichiers mergés existent
echo "🔍 Vérification des fichiers générés..."
MISSING=0

if [ ! -f "public/assets/css/merged-vendors.min.css" ]; then
    echo "   ❌ merged-vendors.min.css manquant"
    MISSING=1
else
    echo "   ✅ merged-vendors.min.css"
fi

if [ ! -f "public/assets/js/merged-vendors.min.js" ]; then
    echo "   ❌ merged-vendors.min.js manquant"
    MISSING=1
else
    echo "   ✅ merged-vendors.min.js"
fi

if [ $MISSING -eq 1 ]; then
    echo ""
    echo "❌ Certains fichiers générés sont manquants"
    exit 1
fi

echo ""
echo "=================================="
echo "✅ Préparation terminée avec succès!"
echo ""
echo "📝 Prochaines étapes:"
echo "   1. Committez les fichiers générés (merged-vendors.*)"
echo "   2. Déployez avec: ./deploy.sh"
echo "   OU transférez via FTP"
echo ""
