FROM nginx:alpine

COPY index.html /usr/share/nginx/html/index.html

RUN echo 'server { \
    listen 10000; \
    server_name _; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 10000

CMD ["nginx", "-g", "daemon off;"]
```

## 📝 Étapes pour corriger :

1. **Va sur GitHub** : https://github.com/nexusproject2077/quantum-converter
2. **Clique sur `Dockerfile`** (ou `dockerfile`)
3. **Clique sur le crayon ✏️** (Edit this file)
4. **SUPPRIME TOUT** le contenu actuel
5. **COLLE UNIQUEMENT** le code ci-dessus (sans les backticks ```)
6. **Scroll en bas** et clique **"Commit changes"**

## ⚠️ Ce qu'il NE FAUT PAS mettre :

❌ Pas de ` ``` ` (backticks)
❌ Pas de texte explicatif
❌ Pas de commentaires markdown
❌ Pas de "```dockerfile" au début

## ✅ Ce qu'il FAUT mettre :

Juste ces 14 lignes, rien d'autre :
```
FROM nginx:alpine

COPY index.html /usr/share/nginx/html/index.html

RUN echo 'server { \
    listen 10000; \
    server_name _; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 10000

CMD ["nginx", "-g", "daemon off;"]
