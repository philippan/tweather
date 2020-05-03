const cool = require('cool-ascii-faces');

const path = require('path');

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('../../webpack.prod.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
}));

app.listen(port);

module.exports = app;


const returnHistory = (request, response) => {

		let history = JSON.stringify({
				roadmap: "Saving weather history is on our roadmap."
		});

		console.log("Tried to fetch history");

		response.send(history);

}

app.get('/history', returnHistory);