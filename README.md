# Proyecto tienda de cartas de Yugioh
##### Es importante que se tengan conocimientos  de MongoDB y Heroku
En el siguiente proyecto se muestra una API-REST para una tienda online de venta de cartas de Yuguioh dentro de la misma tenemos la opción de:

- Login 
- Creación de cartas (Crear-Editar-Eliminar)
- Consultas (Tus cartas, las de otros usuarios, una en específico)
- Compras
- Historial (Compras - Ventas)

# instalación
Desargas el proyecto y ejecutas la siguiente línea de código desde tu terminal
```sh
$ npm install
```
Despues creas un archivo con extensión .env con los siguientes valores dentro
DB_MONGO=mongodb+srv://usuario:contraseña@cluster0-naamb.mongodb.net/nombre-DB
SECRETA=palabrasecreta(lo que ustedes queiran)

DB_MONGO hace referencia a tu base de datos en mongo atlas,  aunque también puede ser una base de datos local  por ejemplo:
DB_MONGO=mongodb://localhost:27017/cartas

# Especificaciones para el deployment
El proyecto está listo para hacer su deployment en Heroku pero hay unas cosas a consideración estas van en relación a sus variables de entorno, entonces después de subirlo a un proyecto en heroku los pasos son los siguientes: 

- Ir al proyecto en heroku 
- Buscar “Settings ” y darle click
- Una vez dentro buscar “Reveal Config Vars”

En este punto ya podemos escribir las variables de entorno pero es recomendado que tengan su cuenta en Mongo Atlas para poder crear su base de datos de lo contrario no se podrá continuar, aunque en youtube hay videos en donde los pueden asesorar.

Del lado izquierdo va el nombre de la variable y del lado derecho va su respectivo valor

| Variable | Valor |
| ------ | ------ |
| DB_MONGO | mongodb+srv://usuario:contraseña@cluster0-naamb.mongodb.net/nombre-DB |
| SECRETA | palabrasecreta(lo que ustedes queiran) |

Nota: el nombre de las variables no puede cambiar, de quererlo hacer se tiene que hacer 
los respectivos cambios desde los distintos scripts por lo que yo como crador de este proyecto recomiendo dejarlo igual

De seguir los pasos anteriores de forma correcta pueden volver a correr la aplicación que acaban de crear y podrá funcionar de forma correcta y lista para pruebas de producción