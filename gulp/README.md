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
