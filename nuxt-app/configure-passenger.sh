#!/bin/bash

# Script de configuration Passenger pour Nuxt
# À exécuter sur le serveur PlanetHoster

echo "🚂 Configuration Phusion Passenger pour Nuxt"
echo "============================================"
echo ""

# Vérifier le répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: Ce script doit être exécuté depuis /home/fggxbsyg/public_html/new"
    exit 1
fi

APP_ROOT="/home/fggxbsyg/public_html/new"
NODE_PATH="/home/fggxbsyg/nodevenv/public_html/new/22/bin/node"

echo "📁 Application Root: $APP_ROOT"
echo "🔧 Node.js Path: $NODE_PATH"
echo ""

# 1. Vérifier que le build existe
echo "1️⃣  Vérification du build..."
if [ ! -f ".output/server/index.mjs" ]; then
    echo "   ❌ Le fichier .output/server/index.mjs n'existe pas"
    echo "   💡 Exécutez d'abord: npm run build:server"
    exit 1
fi
echo "   ✅ Build trouvé"
echo ""

# 2. Créer les dossiers nécessaires
echo "2️⃣  Création des dossiers tmp et log..."
mkdir -p tmp log
chmod 755 tmp log
echo "   ✅ Dossiers créés"
echo ""

# 3. Vérifier/Créer app.js
echo "3️⃣  Vérification de app.js..."
if [ ! -f "app.js" ]; then
    echo "   ⚠️  app.js manquant, création..."
    echo "import('./.output/server/index.mjs');" > app.js
fi
echo "   ✅ app.js présent"
echo ""

# 4. Créer/Mettre à jour .htaccess
echo "4️⃣  Configuration de .htaccess..."
cat > .htaccess << 'EOF'
# Passenger Configuration
PassengerEnabled on
PassengerAppRoot /home/fggxbsyg/public_html/new
PassengerAppType node
PassengerStartupFile app.js

# Node.js Configuration
PassengerNodejs /home/fggxbsyg/nodevenv/public_html/new/22/bin/node

# Environment
SetEnv NODE_ENV production
SetEnv HOST 0.0.0.0
SetEnv PORT 3000

# Debug (activer temporairement si erreur)
PassengerFriendlyErrorPages off

# Performance
PassengerMinInstances 1
PassengerMaxPoolSize 2
PassengerMaxRequests 1000
PassengerPoolIdleTime 300

# Gestion des erreurs
ErrorDocument 500 "Internal Server Error - Check logs"
ErrorDocument 502 "Bad Gateway - Application not responding"

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
EOF

echo "   ✅ .htaccess configuré"
echo ""

# 5. Ajuster les permissions
echo "5️⃣  Ajustement des permissions..."
chmod 644 .htaccess
chmod 644 app.js
chmod 755 .
chmod -R 755 .output 2>/dev/null
echo "   ✅ Permissions configurées"
echo ""

# 6. Créer le fichier de restart
echo "6️⃣  Redémarrage de Passenger..."
touch tmp/restart.txt
echo "   ✅ Signal de restart envoyé"
echo ""

# 7. Test manuel
echo "7️⃣  Test de démarrage manuel..."
echo "   Tentative de démarrage de l'application..."

# Test avec timeout
timeout 5s node .output/server/index.mjs > /dev/null 2>&1 &
TEST_PID=$!
sleep 2

if ps -p $TEST_PID > /dev/null 2>&1; then
    echo "   ✅ L'application démarre correctement"
    kill $TEST_PID 2>/dev/null
else
    echo "   ⚠️  Le test manuel a échoué"
    echo "   💡 Vérifiez les dépendances avec: npm list"
fi
echo ""

# 8. Résumé
echo "============================================"
echo "✅ Configuration Passenger terminée!"
echo ""
echo "📋 Fichiers créés/modifiés:"
echo "   - .htaccess (configuration Passenger)"
echo "   - app.js (point d'entrée)"
echo "   - tmp/restart.txt (signal de redémarrage)"
echo "   - tmp/ et log/ (dossiers)"
echo ""
echo "🔍 Vérifications:"
echo "   - Build: $([ -f .output/server/index.mjs ] && echo '✅' || echo '❌')"
echo "   - app.js: $([ -f app.js ] && echo '✅' || echo '❌')"
echo "   - .htaccess: $([ -f .htaccess ] && echo '✅' || echo '❌')"
echo "   - tmp/: $([ -d tmp ] && echo '✅' || echo '❌')"
echo ""
echo "🌐 Prochaines étapes:"
echo "   1. Rechargez votre site dans le navigateur"
echo "   2. Si erreur, activez debug dans .htaccess:"
echo "      PassengerFriendlyErrorPages on"
echo "   3. Consultez les logs:"
echo "      tail -f log/production.log"
echo ""
echo "🆘 En cas de problème:"
echo "   - Vérifiez les logs Passenger"
echo "   - Contactez le support PlanetHoster avec Error ID"
echo "   - Consultez: FIX-PASSENGER-ERROR.md"
echo ""
echo "============================================"
