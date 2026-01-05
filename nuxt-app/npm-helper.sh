#!/bin/bash

# Script helper pour exécuter les commandes npm dans le bon répertoire
# Usage: ./npm-helper.sh <commande>
# Exemple: ./npm-helper.sh "run build"

PROJECT_DIR="/home/fggxbsyg/public_html/new"

# Vérifier si le dossier existe
if [ ! -d "$PROJECT_DIR" ]; then
    echo "❌ Erreur: Le dossier $PROJECT_DIR n'existe pas"
    echo "💡 Veuillez ajuster la variable PROJECT_DIR dans ce script"
    exit 1
fi

# Se déplacer dans le dossier du projet
cd "$PROJECT_DIR" || {
    echo "❌ Impossible d'accéder au dossier $PROJECT_DIR"
    exit 1
}

echo "📁 Répertoire de travail: $(pwd)"
echo "🔧 Exécution de: npm $@"
echo ""

# Exécuter la commande npm
npm "$@"
