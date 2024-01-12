# Utilisez une image de base appropriée
FROM python:3.10.10-slim-buster

# Copiez le contenu du dossier app/ dans /app/
COPY app /app/
COPY pip /tmp/pip/

# Définissez le répertoire de travail
WORKDIR /app

RUN pip install --no-index -r /tmp/pip/requirements.txt --find-links=/tmp/pip/

# Exécutez le fichier modules.sh
# CMD ["/bin/bash", "/app/modules.sh"]

CMD ["python3","/app/app.py"]


