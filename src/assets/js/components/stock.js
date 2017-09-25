const Stock = (update)=>{

	const div = $("<div class='container'></div>");

	$.each(state.products,(i, producto) =>{
		let panel = $("<div class='panel panel-default row' id='${producto.id}'></div>");
		let panelBody = $("<div class='panel-body col-xs-12'></div>");
		let divImg = $("<div class='col-xs-12 col-sm-5'></div>");
		let img = $(`<img src='assets/img/${producto.img}' class='img-responsive' /'>`);
		let divDetalle = $("<div class='col-xs-12 col-sm-7'></div>");
		let nombre = $(`<h3>${producto.name}</h3>`);
		let precio = $(`<h4 class='pull-right'>${producto.precio}</h4>`);
		let cant = $(`<p>Stock: ${producto.cant} unid.</p>`);

		panel.on("click", (e) => {
			state.productSelected = producto;
			state.page = ProductSelected;
			update();
		});

		divImg.append(img);
		divDetalle.append(nombre);
		divDetalle.append(precio);
		divDetalle.append(cant);

		panelBody.append(divImg);
		panelBody.append(divDetalle);

		panel.append(panelBody);

		div.append(panel);
	});
	return div;
};