# Utilise une image Nginx légère
FROM nginx:alpine

# Copie le fichier HTML dans le dossier Nginx
COPY index.html /usr/share/nginx/html/index.html

# Expose le port 80
EXPOSE 80

# Démarre Nginx
CMD ["nginx", "-g", "daemon off;"]
```

#### **3. `.dockerignore`** (optionnel)
```
README.md
.git
.gitignore
