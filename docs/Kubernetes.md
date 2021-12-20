# Kubernetes

## Prerequisites

This document assumes that you have `docker`, [minikube](https://minikube.sigs.k8s.io/docs/start/) and
[kubectl](https://kubernetes.io/docs/tasks/tools/) installed.

> Note: You can use something other than `minikube` to run the cluster.

## Deployment

### Deploy all services

To deploy the whole app to the cluster, run the following commands. If you want to deploy the app to a specific namespace, you can provide it as an argument.

```bash
kubectl apply -R -f deploy/k8s -n <namespace>
```

To see the status of the deployment, run the following command:

```bash
kubectl get deployments -n <namespace>
```

### Deploy specific services

You can deploy specific services by running the following commands:

```bash
kubectl apply -f deploy/k8s/global-configmap.yml -n <namespace>
```

### Remove services

After deploying the app to the cluster, you can remove the services by running the following commands:

```bash
# Remove single service
kubectl delete -f deploy/k8s/global-configmap.yml -n <namespace>

# Remove all services
kubectl delete -R -f deploy/k8s -n <namespace>
```

## Ingress configuration

To be able to access the API from outside the cluster, you need to configure the ingress by modifying the `/etc/hosts` file.

First, you need to get the IP address of the ingress controller.

```bash
kubectl get ingress -n <namespace>
```

> Note: It can take a while for the ingress to be ready.

Then, you need to add the IP address of the ingress controller to the `/etc/hosts` file.
The format for the file is:

```bash
# <ip>          <domain> [<domain> ...]
192.168.46.36   api.local
```
