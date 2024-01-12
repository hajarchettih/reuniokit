#!/bin/bash

# Supprimer tous les déploiements commençant par "chart"
deployments=$(kubectl get deployments -o name | grep "^deployment.apps/chart" | cut -d'/' -f2)
for deployment in $deployments; do
    kubectl delete deployment "$deployment"
done

# Supprimer tous les ingress commençant par "chart"
ingresses=$(kubectl get ing -o name | grep "^ingress.networking.k8s.io/chart" | cut -d'/' -f2)
for ingress in $ingresses; do
    kubectl delete ingress "$ingress"
done

services=$(kubectl get services -o name | grep "^service/chart" | cut -d'/' -f2)
for service in $services; do
    kubectl delete service "$service"
done

# Supprimer toutes les releases
releases=$(helm ls --all --short | grep "^service/chart")
for release in $releases; do
    helm delete "$release"
done

helm ls --all --short | grep "^chart" | xargs -L1 helm delete

# Déployer l'application - le nom "chartyt" peut être changé. Il faut changer les "grep" pour correspondre au nouveau nom.
helm install chartyt -f ./values.yaml ./chart