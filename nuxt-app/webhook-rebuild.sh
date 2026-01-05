#!/bin/bash

# Script de rebuild automatique pour PlanetHoster
# À placer dans le dossier nuxt-app sur le serveur

LOCKFILE="../public_html/rebuild.lock"
LOGFILE="../public_html/webhook-rebuild.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOGFILE"
}

# Vérifier si un rebuild est déjà en cours
if [ -f "$LOCKFILE" ]; then
    log "⏸️  Un rebuild est déjà en cours, abandon."
    exit 0
fi

# Créer le fichier de lock
touch "$LOCKFILE"

log "🚀 Début du rebuild du site..."

# Aller dans le dossier du projet
PROJECT_DIR="/home/fggxbsyg/public_html/new"
cd "$PROJECT_DIR" || {
    log "❌ Impossible d'accéder au dossier $PROJECT_DIR"
    rm -f "$LOCKFILE"
    exit 1
}

log "📁 Répertoire de travail: $(pwd)"

# Pull les derniers changements (si vous utilisez Git)
# log "📥 Pull des derniers changements..."
# git pull origin main

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    log "📦 Installation des dépendances..."
    npm install >> "$LOGFILE" 2>&1
fi

# Build du site statique
log "🔨 Génération du site statique..."
npm run build >> "$LOGFILE" 2>&1

# Vérifier si le build a réussi
if [ $? -eq 0 ]; then
    log "✅ Build réussi!"

    # Copier les fichiers statiques vers le dossier public
    log "📂 Copie des fichiers vers public_html..."

    # Sauvegarder le webhook PHP avant de copier
    cp ../public_html/webhook-rebuild.php /tmp/webhook-rebuild.php.bak 2>/dev/null

    # Copier les nouveaux fichiers (sans supprimer le webhook)
    rsync -av --exclude='webhook-rebuild.php' --exclude='webhook-rebuild.log' --exclude='rebuild.lock' .output/public/ ../public_html/ >> "$LOGFILE" 2>&1

    # Restaurer le webhook si nécessaire
    if [ ! -f "../public_html/webhook-rebuild.php" ]; then
        cp /tmp/webhook-rebuild.php.bak ../public_html/webhook-rebuild.php 2>/dev/null
    fi

    log "🎉 Déploiement terminé avec succès!"
    rm -f "$LOCKFILE"
    exit 0
else
    log "❌ Erreur lors du build"
    rm -f "$LOCKFILE"
    exit 1
fi
