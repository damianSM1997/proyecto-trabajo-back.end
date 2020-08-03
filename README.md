# Proyecto tienda de cartas de Yugioh
##### Es importante que se tengan conocimientos  de MongoDB y Heroku

![imgGitHub](https://user-images.githubusercontent.com/29550322/89142581-71dfb980-d50d-11ea-8e2e-782c9745ff23.jpg)

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


#  Peticiones
A continuación se presentará la descripción para poder hacer peticiones http desde Postman, algo muy importante es que para poder ocupar el formato JSON en el body se tiene que agregar en el “Header”  lo siguiente:
| KEY | VALUE |
| ------ | ------ |
| Content-Type | application/json |

En la sección de body pasas a la pestaña RAW  y eliges el tipo de formato JSON y puedes continuar con lo siguiente
## Login Metodo POST
### {{url}}/api/usuarios
En donde  {{url}} representa el url de tu host, sea este local o remoto
Todos los campos son obligatorios y la sintaxis para agregar un cliente es la siguiente :
>{
>  "nombre": "Nombre",
>   "email": "Correo@correo.com",
>   "password": "1234567"
>}

La contraseña está encriptada por lo que las contraseñas de sus futuros usuarios estara segura, este proseso se hizo con la librería bcryp 
En caso de cualquier error les marcara el mensaje de porque no se pudo hacer, Falto algun campo o lo que se ingresa como correo ni siquiera es un correo etc.

# Autenticación Metodo POST
## {{url}}/api/auth
Para la autenticación de un usuarioLa sintaxis es la siguiente 

>{
>   "email": "marco@correo.com",
>   "password": "1234567"
>}

Y de cumplir los condiciones para que sea correcta entonces mandará a imprimir un token dicho token es de suma importancia porque en él se encuentra la información del usuario al que posteriormente se le podrán asignar acciones que este puede realizar, y que por lo tanto se tiene que copiar para las futuras acciones o en caso contrario para no repetir una y otra vez se recomienda hacer un script en postman que lo haga por nosotros

Ejemplo de lo que retorna y se debe de copiar

>{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjoiNWYyNDk4ZWYyOWJkODQwMWI1NjBiMjRlIn0sImlhdCI6MTU5NjQxNzYyNiwiZXhwIjoxNjAwMDE3NjI2fQ.g7hFnWADWkQ_As2q-sdaokmfsañlsado"
>}

# Cartas
Un usuario puede crear una carta o editarla pero también puede eliminarla, pero solo el usuario creador de la carta puede acceder a esas acciones por lo tanto es fundamental en el “Header” la siguiente información:
| KEY | VALUE |
| ------ | ------ |
| x-auth-token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjoiNWYyNDk4ZWYyOWJkODQwMWI1NjBiMjRlIn0sImlhdCI6MTU5NjQxNzYyNiwiZXhwIjoxNjAwMDE3NjI2fQ.g7hFnWADWkQ_As2q-sdaokmfsañlsado |
##### Nota: El nombre de la variable no debe de cambiar y es fundamentan para las siguientes acciones 

# Creación Metodo POST
## {{url2}}/api/items
La sintaxis para agregar una carta es la siguiente:

>{
    "titulo": "exodia",
    "precio": 99,
    "descripcion": "hla bla bla bla bla",
    "tipo": "Dragon",
    "disponibles": 10,
    "img": "Imagen en base 64"    
}

Algo que se tiene que tomar a consideración es que la imagen debe de ingresarse en base 64, esto se puede hacer desde la siguiente página: https://www.base64-image.de/ 
Solo suben la imagen y copian el largo código que les dará  al darle click en “show code” todo menos el tipo de imagen y la base, ejemplo de lo que no se debe de copiar: “data:image/png;base64”
Si no se escribe alguno de los siguientes campos entonces la solicitud no procederá y te marcara un error en donde se va a hacer mención del campo que olvidaste escribir

# Update Metodo PUT
## {{url}}/api/items/idCartaAEditar
Primero se tiene que obtener el id de la carta a editar, es aquí donde entra la importancia del token, por que de lo contrario cualquiera puede editar o eliminar la carta pero con el token auténticas que tu eres el creador de la carta y por lo tanto puedes hacer cambios.
supongamos que ya se tiene el id de la carta en cuestión y que está agregado al url, ejemplo: {{url}}/api/items/5f2487e529bd8401b560b2
La sintaxis para cambiar un valor es la misma que para crearla pero aqui solo ocupas los valores que deseas cambiar 
>{
    "titulo": "exodia",
    "precio": 99,
    "descripcion": "hla bla bla bla bla",
    "tipo": "Dragon",
    "disponibles": 10,
    "img": "Imagen en base 64"    
}

ejemplo: 

>{
    "titulo": "exodia",
    "precio": 150,
    "descripcion": "hla bla bla bla bla",
    "tipo": "Dios jajaja",   
}

Aquí se cambio el precio y el tipo, además de no ser el creador de la carta aparecerá el error correspondiente a que no eres el creador de la carta.
SI todo es correcto los nuevos valores te aparecerán como respuesta en formato JSON

# Eliminacion Metodo DELETE
## {{url}}/api/items/idCartaAEliminar

En este no se incluye nada en el Body de postman lo único que requiere es el id de la carta que se desea eliminar, al igual que en el caso anterior de no ser el dueño de carta entonces te marcara el error de que no eres el dueño de la carta y la petición no se realizará 

ejemplo : {{url}}/api/items/5f21f90fb8b3216a52677f
En todos los casos anteriores de no existir la carta entonces no se podrá realizar petición alguna 

# Consultas 
En el caso de todas las consultas no se requiere agregar nada en el body y todo se hace desde el url que se envíe por el método GET pero como se dijo anteriormente se debe de agregar la informacion corespondiente en el ”Header”  ejemplo: 
| KEY | VALUE |
| ------ | ------ |
| x-auth-token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjoiNWYyNDk4ZWYyOWJkODQwMWI1NjBiMjRlIn0sImlhdCI6MTU5NjQxNzYyNiwiZXhwIjoxNjAwMDE3NjI2fQ.g7hFnWADWkQ_As2q-sdaokmfsañlsado |

# Consultar tus cartas
## {{url}}/api/consultas/

Esto retorna todas las cartas que tienes disponibles como usuario

# Consultar las cartas de otro usuario
## {{url}}/api/consultas/idDelOtroUsuario
En este se requiere agregar el id del usuario al que se requiera consultar las cartas que tiene disponibles, si se desea ver alguno desde MongoDB Compás aparece registrado en Ítems como “creador” En caso de que agregue un id no válido mostrará el mensaje de ese usuario no existe 

# Consultar una carta específica
## {{url}}/api/consultas/especifico/idCartaEspecifica

Este es igual al de arriba pero aquí se agrega el id de la carta especifica a buscar y de no existir carta alguna entonces retornara el error de que la carta no existe 

# Compras Metodo POST
## {{url}}/api/compras/idDelaCarta
En este método se requiere del id de la carta que se desea comprar, además en la parte del body se tiene que especificar el método de pago de la siguiente forma: 

>{
   "tipoPago": "efectivo"       
}

SI no se especifica el tipo de pago entonces la petición no procede,  de la misma forma si el id introducido en el link no existe marcara un error corespondiente.

# Historial
Como se mencionó anteriormente en la parte de “Header”  de postman se introduce el token de autenticación del usuario además de ser necesario la parte que valida el formato JSON, de lo contrario, a que se le estaría pidiendo la información del historial de este caso.
Tomando en cuenta la información anterior se puede seguir con lo siguiente.
# Historial de Compras Metodo GET
## {{url}}/api/historial/compras

De realizar los pasos de forma correcta entonces se podrá tener la información del historial de compras del usuario, de no tener nada como respuesta se obtendrá un arreglo vacío.

# Historial de Ventas Metodo GET
## {{url}}/api/historial/ventas
De realizar los pasos de forma correcta entonces se podrá tener la información del historial de ventas  del usuario, de no tener nada como respuesta se obtendrá un arreglo vacío. 






