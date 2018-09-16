# React build enviroment with code splitting
This is a part of npm package [code-template-generator](https://www.npmjs.com/package/code-template-generator)

|Main packages|Version|Notes|
|---|:---:|---|
|[React](https://reactjs.org/)|16.4||
|[Babel](https://babeljs.io/docs/en)|7.0|[Babel 7 released](https://babeljs.io/blog/2018/08/27/7.0.0) and [removing Babel's stage presets](https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets)|
|[Babel Loader](https://github.com/babel/babel-loader)|8.0||
|[Webpack](https://webpack.js.org/concepts/)|4.17||
|[Webpack Dev Server](https://webpack.js.org/configuration/dev-server/)|3.1||

Other packages
* [Clean for WebPack](https://github.com/johnagan/clean-webpack-plugin)
* [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin)
* [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)
* [CSS Loader](https://github.com/webpack-contrib/css-loader)
* [Style Loader](https://github.com/webpack-contrib/style-loader)

## Features
* Your source code are here `./src`:
   * HTML template `./src/index.html`
   * Styles in file `./src/styles.css`
   * Entry point `./src/index.js`
* Auto refresh whenever you make a change in your code.
* Your code compiled into directory `./dist` with three separate file extensions `*.html, *.css, *.js`.
* Directory `./dist` is deleted and then created automatic every time you run the command `npm run build`.

Tested on:
* Windows 10 (version 1803)
* MacOS High Sierra (version 10.13)
* Debian 9

## Using
* Run the command `npm i` to install all needed dependencies.
* Other commands:
    * `npm run start` - to start Webpack Dev Server
    * `npm run build` - to compile your app with production mode in Webpack into folder `./dist`
* Local web server started at `htpp://localhost:9000`

## References
* [Webpack Code Splitting](https://webpack.js.org/guides/code-splitting/)
* [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/)