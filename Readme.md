# Instalación de los modules o dependencias.


```npm install```

Express: framework de NodeJs.

## Complementos de express.

express handlebars: Para integrar un motor de plantillas dentro de express; es un motor de plantillas es una forma de extender el html.

express-session: para crear sessiones dentro del servidor.

method-override: Extender la funcionalidad de los formularios; esto para enviar metedos http(put, get, delete ect.).

mongoose: Para conectarme a MongoDB.

passport: para auntenticacion de usuario.

passport-local: para auntenticacion de usuario.

bcryptjs: cifrado de contraseña.

connect-flash: enviar mensajes a multiples vistas.

# Estructura del backend

## Funciones de las carpetas en src

views: Almacena todos los archivos que se envian al servidor, todas las vistas html.

routes: Las rutas de nuestro servidor.

public: Archivos estaticos(Imagenes, funtes,css, script, ect).

models: El modelo o la forma que guarda en la base de datos.

helpers: Funciones que el servidor pueda utilizar. Estas funciones pueden ser reutilizadas en cualquier parte.

config: Almacenar archivos (configuración de la base de datos), variables de configuración o como están configurados los modulos.
