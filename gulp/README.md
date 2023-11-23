# Using Gulp

I installed `yeoman``:

![console yo -v command output](docs/yeoman%20generator%20installation%20proof.PNG)

Then I did `npm install -g generator-webapp`.

Then I did `yo webapp`.

Chose to add `sass` and to override package.json and all files necessary.

`modernizr` detects my webbrowser's capabilities.

I changed from `node v21` to `node v13` due to compatibility reasons using `nvm`.

Created an own [gulpfile.js](gulpfile.js) after renaming the original to [gulpfile-original.js](gulpfile-original.js)

Then I inserted content into [bar.css](app/styles/bar.css) and [foo.css](app/styles/foo.css) for the css concatenation gulp tasks.

Attempted to use ECMASCRIPT module with gulp, but due to babel not finding babel/register and others, I just went with CommonJS.

A simple move default task was programmed. I had to either `return` from the task, or mark the callback as an async function. I managed to move a file from a source folder to a destination folder.

I used the `gulp-concat-css` plugin to extend the default task with a pipeline that takes all css files in `app/styles` and calls `concatCss` and finally `dest` to mke a `concatenated.css` file.

I then had problems with sass because `gulp-sass` is documented for `node-sass` or for a way to use Dart Sass (the primary implementation of sass, the one that is a ruby gem) so ended up searching and using the `gulp-dart-sass` plugin from npm which worked straight away. A `series()` function is passed as second parameter to the `task` gulp method call to be able to execute first the `compilesass` task and then the `default` task.

Then I added a `minifyCss()` step into the default task after installing the pacakge `gulp-minify-css`. It worked straight away too.

Note on sourcemaps:

>> Me: What is a webbrowser's sourcemap?
>
>> Chatgpt:
>>
>> A source map (or sourcemap) in the context of web development refers to a file that maps the code of a compressed and minified file back to its original source code. Minification is a process where developers reduce the size of their code by removing unnecessary characters like whitespace, comments, and renaming variables to shorter names. This is done to improve the performance of web pages by reducing the size of the files that need to be downloaded.
>>
>> However, when debugging issues in a production environment, it can be challenging to work with minified and compressed code because it's hard to read and understand. This is where source maps come in.
>>
>> A source map provides a mapping between the minified/compiled code and the original source code. This mapping allows developers to debug and trace issues in their original, human-readable code, even if the code served to the browser is minified. Source maps are typically generated as separate files and are referenced by the browser.
>>
>> When using a modern web browser's developer tools, if source maps are available, the browser can use them to reconstruct the original source code while debugging. This makes the debugging process much more manageable for developers, as they can work with code that is easier to understand and navigate.
>>
>> Source maps are commonly used in the context of JavaScript, CSS, and other web technologies that involve minification or compilation of code. They are an essential tool in the web development workflow, aiding in the development and debugging process.

I installed `gulp-sourcemaps` and basically called `init()` and `write()` after I imbetween the minification.

I checked the functioning of `watch`, which simply either returns an object to which an `on` can be called from to listen to specific events, and whose callback (second argument) receives the `path` and the `fs.Stats` arguments, and then I learned about `task`, which simply creates a new task object and adds it to an internal registry that knows the tasks (it's name, it's function, ...). Finally, `series` is just a wrapper with extra steps to fetch a task function array from the registry for the normal js series function, which is the one returned, normally the `seriesSettled` version which does not stop ona single fail. I also noticed that gulp's code is old and really scattered through various npm modules, and it uses `bach` module which i feel is just an old version of JS's `async/`.

> Sobre browserSync
>
>> (...)
>>
>>3. Start Browsersync
>>
>>A basic use is to watch all CSS files in the css directory and update connected browsers if a change >>occurs. Navigate your terminal window to a project and run the appropriate command:
>>Static sites
>>
>>**If you’re only using .html files, you’ll need to use the server mode. Browsersync will start a mini-server and provide a URL to view your site**.
>
> - [https://browsersync.io/](https://browsersync.io/)
