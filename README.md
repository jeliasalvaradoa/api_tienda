# API Tienda

---

Este proyecto es una actualizacion del repositorio de github https://github.com/jeliasalvaradoa/mybackenstore y que se desplego en https://mybackenapi.onrender.com.

## Tabla de contenido

1. [Información General](#info)
2. [Tecnología de desarrollo](#tecnologias)
3. [Instalación](#instalacion)
4. [Colaboración](#colaboracion)

## Información General

---

Este proyecto es la actualización ya que la anterior estaba realizada con commonjs y esta versión esta actualizada usando esmodule, basicamente funciona igual los endpoint son los mismos:

- /api/v1/users,
- /api/v1/profile,
- /api/v1/customers,
- /api/v1/orders/id,
- /api/v1/categories,
- /api/v1/products

La diferencia importante es que esta desarrollado para ser más escalable con inyección de dependencia usando un patrón de diseño. Se pueden proporcionar distintos orígenes de datos, como se puede ver en server-with-local.js, server-with-postgres.js (solo se usa el ejemplo con product.service.js) y server-with-sequelize, que fue el que se desarrolló por completo ya que es útil hacer uso de ORM.

Es importante mencionar que lo único que cambia son los modelos de donde se servirían los datos, pero los controllers, los routers y los schemas funcionan independientemente de donde vengan los datos. También se realizaron pruebas con MySQL en docker-compose.yml; se ve la configuración que se realizó. Básicamente, sería hacer prácticamente lo mismo que se hizo con Postgres, ya que con Sequelize solo le tengo que enviar el parámetro de la database_url. La base de datos fu cambiada de fl0.com a [supabase.com](https://supabase.com) (fl0.com ya no tiene opción free). El repositorio esta en [https://github.com/jeliasalvaradoa/api_tienda](https://github.com/jeliasalvaradoa/api_tienda) y el despliegue se hizo en [https://api-tienda.onrender.com](https://api-tienda.onrender.com) (el despligue es muy eficiente te da soporte para muchas tecnologías incluyendo Docker, recomiendo hacer uso de este contenedor el menos que tiene render.com es que solo te deja crear una database free por 90 dias; es por ello que solo desplegue la aplicación. En conclusión cada uno con sus ventajas y desventaja desde mi punto de vista.)

## Tecnología de desarrollo

---

Lista de tecnologías usadas en este proyecto:

- [Sistema operativo Debian](https://www.debian.org/distrib/index.es.html): Versión 12
- [Visual estudio code](https://code.visualstudio.com/): Version 1.84.2
- [Node JS instalación con nvm ](https://github.com/nvm-sh/nvm): Version 21.1.0
- [Librerias](https://github.com/jeliasalvaradoa/api_tienda/blob/main/package.json): Version ver packege.json
- [Contenedor Docker](https://docs.docker.com/engine/install/debian/): Versión 24.0.7
- [Postgresql](https://hub.docker.com/_/postgres): Version 13
- [Image:Postgresql 13](https://github.com/jeliasalvaradoa/api_tienda/blob/main/docker-compose.yml): Ver Docker-compose.yml
- [Mysql](https://hub.docker.com/_/mysql): Version 5
- [Sequelize ORM](https://sequelize.org/docs/v6/getting-started/): Versión 6
- [Control de Versiones local Git](https://git-scm.com/): Version 2.39.2
- [Control de Versiones en la nube github](https://github.com/jeliasalvaradoa)

## Instalación

---

**_Pasos para el deploy_**

1. Creamos una cuenta en [supabase.com](https://supabase.com)

2. En [render.com](https://api-tienda.onrender.com) después de crear la cuenta:
3. Para ser el deploy de la api hacemos click en new+ seleccionamos web service
4. Nos indicara luego que seleccionemos el repositorio puede ser de github o gitlab
5. una vez seleccionado el respositorio nos enviara a otra página en la cual debemos
6. indicar los siguientes datos

- Name: indicar nombre sel servicio web
- Region: indicar región donde se ejecutara el servicio
- Branch: indicar la rama! es ente caso seleccionamos main
- Root: Directorio es opcional! es si quieres indicar una ruta para el deploy. Por lo general es la raiz
- Runtime: seleccionamos la rutina! en este caso lo hicimos usando Docker (Debo agregar que es fantastico las cosas que se pueden hacer con docker y la facilidad que brinda para hacer diferentes tareas).

7. Aquí también se debe selccionar el plan de pago! en este caso seleccionamos free

8. OJO => luego un paso muy importante antes de presionar el boton de create web service es agregar las variables de entorno o de ambiente!
   para ello hacemos click en advanced => se desplegara un boton de Add Environment Variables con el cual debenos crear
   las variables de entorno que estan en el Dockerfile las cuales son

- NODE_ENV,
- DATABASE_URL,
- API_KEY,
- JWT_SECRET,
- SMTP_EMAIL,
- SMTP_PASSWORD
  **Actualización:** fueron agregadas las siguientes variables de entorno
- ARG DB_USER
- ARG DB_PASSWORD
- ARG DB_HOST
- ARG DB_NAME

**Nota:** asignar los valores a cada variable según corresponda

9. Luego los demas campos se dejan como estan por defecto; recomiendo no modificarlos si no sabes lo que haces a menos que seas experto

10. Finalizamos presionando el boton de Create Web Service

Se esperan unos minutos tal vez segundo y listo estara tu API REST desplegada listo para ser consumida

**Instalación Local**

1. git clone https://github.com/jeliasalvaradoa/api_tienda.git
2. cd ../path/del directorio/
3. crear .env
4. npm run migrations:run
5. npm run start

**Nota:** no se puede olvidar que se debe crear el archivo .env donde se colocan los valores de todas tus variables de ambiente sobre todo la Database_URL que indica el origen de los datos; para ello se deja en el repositorio un .env-example que indica cuales son las variables de ambiente agragar los valores que sean necesarios según el caso.

## Colaboración

---

Totalmente abierto a cualquier aporte si hay alguna recomendación de como se mejoraria el código de este proyecto.
