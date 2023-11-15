# API Tienda
***
Este proyecto es una actualizacion del repositorio de github https://github.com/jeliasalvaradoa/mybackenstore y que se desplego en https://mybackenapi.onrender.com.

## Table of Contents
1. [Información General](#info)
2. [Tecnología de desarrollo](#tecnologias)
3. [Instalación](#instalacion)
4. [Colaboración](#colaboracion)

## Información General
***
Este proyecto es la actualización ya que la anterior estaba realizada con commonjs y esta versión esta actualizada usando esmodule, basicamente funciona igual los endpoint son los mismos:
* /api/v1/users,
* /api/v1/profile,
* /api/v1/customers,
* /api/v1/orders/id,
* /api/v1/categories,
* /api/v1/products
Pero la diferencia importante es que esta desarrollado para ser mas escalable con inyección de dependencia usando un patrón de diseño donde se puede proporcionar distintos origenes de datos como se puede ver en server-with-local.js, server-with-postgres.js (solo se usa el ejemplo con product.service.js) y server-with-sequelize que fue el que se desarrollo por completo ya que es útil hacer uso de ORM; es importante, mencionar que lo unico que cambia es los modelos de donde se servirian los datos, pero los controllers, los routers, los schemas funcionan indpendientemente de donde vengan los datos; tambien se realizaron prueba con mysql en docker-compose.yml se ve la configuracion que se realizó basicamente seria hacer lo practicamente lo mismo con que se hizo con postgres ya que con sequelize solo le tengo que enviar el parámetro de la database_url. la base de datos se desplego en [fl0.com](https://app.fl0.com) aunque la base de datos se desplego en fl0.com (te da una opción free y hasta ahora no tiene limite de tiempo por lo que sirve para mas tiempo de prueba ), los repositorios están en gitgub y el despliqugue se hizo en [render.com]  (https://api-tienda.onrender.com)
## Tecnología de desarrollo
***
Lista de tecnologías usadas en este proyecto:
* [Sistema operativo Debian](https://www.debian.org/distrib/index.es.html): Versión 12 
* [Visual estudio code](https://code.visualstudio.com/): Version 1.84.2
* [Node JS instalación con nvm ](https://github.com/nvm-sh/nvm): Version 21.1.0
* [Librerias](https://github.com/jeliasalvaradoa/api_tienda/blob/main/package.json): Version ver packege.json
* [Contenedor Docker](https://docs.docker.com/engine/install/debian/): Versión 12 
* [Postgresql](https://hub.docker.com/_/postgres): Version 13
* [Image:Postgresql 13](https://github.com/jeliasalvaradoa/api_tienda/blob/main/docker-compose.yml): Ver Docker-compose.yml
* [Mysql](https://hub.docker.com/_/mysql): Version 5
* [Sequelize ORM](https://sequelize.org/docs/v6/getting-started/): Versión 6
* [Control de Versiones local Git](https://git-scm.com/): Version 2.39.2
* [Sistema de Versiones en la nube github](https://github.com/jeliasalvaradoa): versión

## Instalación
***
***Pasos para el deploy*** 
1. Creamos una cuenta en [fl0.com](https://app.fl0.com) 
en tu usuario aparecera dos opciones Your appsManage your apps and databases.
**Development** permite crear una app y una database gratis y **Production** es paga 
en Development +Add new donde seleccionaremos Postgres database aqui lo unico que se agrega es el nombre de la base de datos los demas datos los asigna fl0 automaticamente y la puedes ver en Connection info: 

*Hostname

*Port

*Database

*User

*Password

*Database URL: Esta URL la debemos copiar para pasarla como variables de ambiente

2. En [render.com]  (https://api-tienda.onrender.com) después de crear la cuenta:


3. Para ser el deploy  de la api hacemos click en new+ seleccionamos web service
4. Nos indicara luego que seleccionemos el repositorio puede ser de github o gitlab 
5. una vez seleccionado el respositorio nos enviara a otra página en la cual debemos 
6. indicar los siguientes datos
* Name: indicar nombre sel servicio web 
* Region: indicar región donde se ejecutara el servicio
* Branch: indicar la rama! es ente caso seleccionamos main
* Root: Directorio es opcional! es si quieres indicar una ruta para el deploy. Por lo general es la raiz 
* Runtime: seleccionamos la rutina! en este caso lo hciomos usando Docker (Debo agregar que es fantastico las cosas que se pueden hacer con docker y la facilidad que brinda para hacer diferentes tareas).

7. Aquí también se debe selccionar el plan de pago! en este caso seleccionamos free

8. OJO => luego un paso muy importante antes de presionar el boton de create web service es agregar las variables de entorno o de ambiente!
para ello hacemos click en advanced => se desplegara un boton de Add Environment Variables con el cual debenos crear 
las variables de entorno que estan en el Dockerfile las cuales son 
 
* NODE_ENV,
* DATABASE_URL,
* API_KEY,
* JWT_SECRET,
* SMTP_EMAIL,
* SMTP_PASSWORD

**Nota:** asignar los valores  a cada variable según corresponda

9. Luego los demas campos se dejan como estan por defecto; recomiendo no modificarlos si no sabes lo que haces a menos que seas experto

10. Finalizamos presionando el boton de Create Web Service

Se esperan unos minutos tal vez segundo y listo estara tu API REST desplegada listo para ser consumida

**Instalación Local**

1. git clone https://github.com/jeliasalvaradoa/api_tienda.git
2. cd ../path/del directorio/
3. crear .env
3. npm run migrations:run
4. npm run start   

**Nota:** no se puede olvidar que se debe crear el archivo .env  donde se colocan los valores de todas tus variables de ambiente sobre todo la Database_URL que indica el origen de los datos. para ello se deja en el repositorio un .env-example que indica cuales son las variables de ambiente agragar los valores que sean necesarios según el caso.

## Colaboración
***
Totalmente abierto a cualquier aporte si hay alguna recomendación de como se mejoraria el código de este proyecto.




