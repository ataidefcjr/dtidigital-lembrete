#!/bin/bash

# Diretório do starter
STARTER_DIR="$(pwd)"

# Diretório do backend
BACKEND_DIR="$STARTER_DIR/backend"

# Verifica se as dependências ja estão instaladas
if [ ! -d "$STARTER_DIR/node_modules" ]; then
  echo "Instalando dependências do Front-End...."
  npm install
else
  echo "Dependências Front-End já instaladas."
fi

echo "Iniciando o Front-End"
npm start &

if [ ! -d "$BACKEND_DIR/node_modules" ]; then
  echo "Instalando dependências do Back-End..."
  cd "$BACKEND_DIR"
  npm install
  cd "$STARTER_DIR" 
else
  echo "Dependências já instaladas do backend."
fi

# Executa node server.js em segundo plano no diretório backend
echo "Iniciando o Back-End..."
cd "$BACKEND_DIR"
node server.js &