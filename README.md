# Tecnologías Web: Cliente; alu0101056944

Marcos Jesús Barrios Lorenzo, alu0101056944

## Estructura de la práctica

 - En [gulp/](gulp/) se puede encontrar la parte de **gulp**, con su propio [README.md](gulp/README.md).
 - En [parcel/](parcel/) se puede encontrar la parte de **parcel**, con su propio [README.md](parcel/README.md).

## Herramientas de desarrollo en el lado del Cliente.

- VS Code - Live Server
- Navegador
- Gestión de paquetes: *npm*, *brower*
- Control de versiones: *Git*
- Generación del proyecto:  *Yeoman*
- Automatización de tareas *Gulp*, *Grunt*

## Actividades: 

### Gulp
Realizar un proyecto web de prueba para experimentar con las herramientas que se han visto. El proyecto debe incluir un fichero index.html, 2 ficheros css, un fichero sass, 2 ficheros de scripts .js y utilizar 2 imágenes. 
Crear un repositorio para la práctica. Tener en cuenta los ficheros que deben ser ignorados.
Crear la estructura del proyecto de forma automática.
Crear un fichero de automatización de tareas en el que se prueben lo que se ha explicado:
- Concatenar los dos ficheros css
- Minificar css, 
- Hacer sourcesmaps del css
- Lance BrowserSync
- Investigar sobre paquetes para minificar imágenes y js. Automatizarlo.

### Yeoman
Crear un proyecto generado como una aplicación web básica con Yeoman.
### Parcel
Crear un proyecto que cumpla los mismos requisitos que la actividad 1, pero utilizando la herramienta [Parcel](

## Códigos de ejemplo 

### Yeoman
`npm install -g yo //instalar yeoman`    
`npm install -g generator-webapp       // Instalar el generador`  
`mkdir /home/tuUsuario/nuevoProyecto  // Crear la carpeta del proyecto`  
`cd /home/tuUsuario/nuevoProyecto      // Entrar en la carpeta proyecto`  
`yo webapp`

### Gulp
```javascript
var gulp = require('gulp');
var concatCss = require('gulp-concat-css'); //paquete a utilizar

gulp.task(“default”, function() { //tarea por defecto
gulp.src('./src/html/*.*').pipe(gulp.dest('dist'));
gulp.src('./src/css/*.*').pipe(concatCss("super.css")).pipe(gulp.dest('dist'));
gulp.src("./src/js/*.*").pipe(gulp.dest("dist"));
});
```
#### Minify Css
`npm install --save-dev gulp-minify-css`    
`var gulp = require('gulp');`  
`var browserSync = require('browser-sync').create();`  
`var minifyCss = require('gulp-minify-css);`  

`gulp.task('styles', function(){`  
`gulp.src(['src/styles/**/*.css'])`  
`.pipe(minifyCss())`  
`.pipe(gulp.dest.('dist/styles'))`  
`.pipe(browserSync.stream());`  
`});`  
`gulp.task('default', function(){`  
`browserSync.init({`  
`server:'./'});`  
`gulp.watch('*.html', browserSync.reload);`  
`});` 
## Instalar parcel:
`npm install parcel-bundler -g` 
Puedes utilizar la herramienta: [CreateApp](https://createapp.dev/) como generador del proyecto.
## Parcel en github-pages
/repo-name/ debe ser reemplazado por el nombre del repositorio. Se debe tener instalado en el proyecto ```gh-pages```
```javascript
{
  "scripts": {
    "start": "parcel serve -d dist src/index.html",
    "build": "parcel build -d build --public-url /repo-name/ src/index.html",
    "deploy": "gh-pages -d build"
  }
}
```
