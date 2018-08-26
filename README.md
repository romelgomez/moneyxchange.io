# Prueba Técnica From End Equipu 2018

[Link-demo](https://peruve.com/) para ver el resultado de esta prueba (Válido por 2 semanas, desde el primer commit, luego será removido).  

## Nota de la instalación

Es una App Angular 6, Express 4, en la carpeta /dist está el proyecto Angular `catolica` y el server Express `server`, ambos deben ejecutarse para que la app funcione bien, ya que la api que se comunica el con el servicio rest, se levanta en el Server Express y no en el proyecto Angular, al ejecutar `ng serve`, la app no conectara con el servicio rest, es el server Express JS el que presta este servicio, es un proxy.

La llave de acceso que requiere la api [https://fixer.io/](https://fixer.io/) para conectar esta definida como variable de entorno en el server, no está definida en este repositorio git. Por seguridad, es el estándar.

```text
Set an env var FIXER_API_KEY for security

Open a terminal (by pressing CtrlAltT)
sudo -H nano /etc/environment
Type your password
Edit the text file just opened:
e.g. just write FIXER_API_KEY='api_key' in a new line
Save it
Once saved, logout and login again.
Your required changes are made.
```

El archivo gulpfile.js, están los comandos, que levantan la app en local, cómo un server de desarrollo o producción, más sin embargo es para probar solo en local, la configuración en el server de producción están especificadas en este repositorio [https://github.com/romelgomez/digital-ocean-how-to-set-up-a-nodejs-application-for-production-on-ubuntu-16.04](https://github.com/romelgomez/digital-ocean-how-to-set-up-a-nodejs-application-for-production-on-ubuntu-16.04)

## Detalles de la prueba

Pre requisitos:

    - Instalar Node.js
    - Una cuenta en Github, Github o Bitbucket

Tecnologías sugeridas

    - Angular/ AngularJS / React / Vue
    - Webpack / Gulp
    - Typescript / ES&
    - Bootstrap / Bulma / Semantic UI
    - Sass/Less

### Contexto

Un equipo de emprendedores está diseñando el modelo de negocio de su startup “link….”

El principal problema que tienen en este momento es el desarrollo de su landing page con un formulario que le permita a sus usuarios cotizar el tipo de cambio ofrecidos por ellos. 

La startup está localizada en España, y por el momento solo ofrecen cambio de divisas para Estados Unidos,  es decir el tipo de cambio es solo entre Euros y Dòlares americanos. Ten en cuenta que ellos piensan expandirse y añadir más divisas progresivamente. 

Los requerimientos que deben cubrir el landing page son los siguientes: 

#### 1. Cotizar desde Euros a Dólares americanos.

Criterio de aceptación: Si se ingresa un valor numérico (con hasta cuatro decimales inclusive) en la caja de texto indicada, se deberá obtener el precio del Euro mediante un servicio rest y mostrar el valor convertido a dólares en una caja de texto no editable.

#### 2. Mostrar el precio de divisas de Euro a otras divisas

Criterio de aceptación: En la parte inferior al formulario de cotización se debe mostrar una lista en dos columnas con los valores de las divisas extranjeras frente al Euro obtenidos desde un servicio rest. 

El equipo de UX ha propuesto un wireframe para el landing page, indicando los dos inputs, él de Euros editable y el de dólares no editables. Adicionalmente se propone un botón para realizar el cálculo, en el principio  se pensó usar el evento keyup del input, pero resultó muy compleja la interacción en los user test. Es muy importante el formato del los inputs, se deben reflejar los valores con formato moneda con su respectivo símbolo, punto para separar los decimales y coma para separar los miles. En cuanto a responsive design, el equipo de UX sole pide que al verse en dispositivos móviles, los elementos input ocupen el 100% de la pantalla, es decir que sean fluidos. El wireframe se encuentra adjunto en el apartado “Wireframe”

…

 Ayuda:
[https://github.com/fixerAPI/fixer](https://github.com/fixerAPI/fixer)
