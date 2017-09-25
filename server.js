const express = require('express');
const api = require('./api');

const app = express();

app.get('/api/products/', (require, resolve)=>{
	let products = api.products();

	products.then( result =>{
		console.log(`Obteniendo los productos de firebase ${result.length}`);
		resolve.status(200).json(result);
	});
});

app.use('/', express.static('public/'));

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), ()=>{
	console.log('Node App is running on port', app.get('port'));
});