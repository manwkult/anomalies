# Anomalies API Rest

API para obtener y validar las anomalias.

### Ejecución de la aplicación localmente

Primero debemos de preparar el entorno para poder ejecutar la aplicación.

Los únicos requisitos son instalar Node y Docker.

* [Node](https://nodejs.org/es/)
* [Docker](https://docs.docker.com/get-docker/)

Vamos a ejecutar la aplicación ya que esta esta configurada para sincronizarse con la base de datos SQLite y lo primero que se hara el arrancar esta sera crear la tabla anomaly.

```sh
npm run dev
```


## Deploy
Se configuro el deploy sobre heroku a traves de Github actions

[Anomalies Validator](https://validator-anomalies-0054feeac19e.herokuapp.com/api-docs/)
