# neural-works-pomodoro

## Documentación

Entrega de desafío Full Stack Developer por Benjamín Ayancán (beayancan@uc.cl)

El trabajo consistió en la implementación de creación, visualizacion y edición de temporizadores Pomodoro, junto con una interfaz que permita ver de forma simple las próximas tareas. La aplicación, está implementada con React y Typescript para frontend, mientras que se utiliza Express junto con variables por servicios para el manejo de backend y la base de datos.

La entrega incluye:
* Una página de login del usuario a utilzar
* Una página principal con el despliegue de los Pomodoros creados por el usuario, junto con un acceso a cada uno
* Una barra de status para saber cuanto falta para el siguiente Pomodoro
* La posibilidad de creación de un nuevo Pomodoro

Consideraciones:
* La aplicación se ejecuta sólo de forma local, tanto frontend como backend. La base de datos se maneja como variable local para simular la interacción
* Se tomó la información mínima para un Pomodoro, con su tiempo de trabajo, tiempo de descanso y hora de inicio. No considera restricciones en ninguno de las tres variables
* En vez de utilizar una barra de progreso circular, se optó por un temporizador que se actualiza cada minuto y señala cuánto falta para el inicio del siguiente Pomodoro. Esto, para simplificar la interfaz y no confunda el progreso dependiendo del Pomodoro (por ejemplo: si faltan 10 minutos o 1 hora el avance será diferente)
* Se utiliza un usuario para identificar cuales Pomodoros le pertenecen, diseño inicial consideraba varios usuarios, pero por tiempo se simplificó la implementación.
* No se implementó el crud de usuario en la aplicación

Mejoras
* Hacer deploy de las partes involucradas: frontend, backend y la base de datos.
* Uso de un gestor de estados como Redux para el manejo de la disponibilización de información en frontend
* Manejo de autenticación para el uso de multiples usuarios.
* Manejo de validaciones en los formularios y valores según definiciones de alcance
* Acceso a los Pomodoros de otros usuarios y la posibilidad de suscribirse a estos de forma individual

## Cómo utilizarlo

Desde la terminal de comando, en la carpeta base del proyecto se deben correr

> yarn install

Luego, abrir dos terminales y ejecutar en una de ellas

> yarn build-server

> yarn start-server

Mientras que en la terminal, se debe ejecutar:

> yarn build-client

> yarn start-client

La instalación e inicio del `client` puede tomar algunos segundos en ejecutarse.

---

Alternativamente, dentro de la carpeta `server` correr en una terminal

> yarn install

> yarn start

Y luego, en otra terminal dentro de la carpeta `client` utilizar

> yarn install

> yarn start

---

Al iniciar la aplicación, se debe ingresar un correo de usuario válido, por ejemplo `uno@email.com`. Lo que identificará que se trata de los pomodoros del usuario con ese correo.
