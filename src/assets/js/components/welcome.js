const Welcome = ()=>{
	const div = $("<div class='container-fluid'></div>");
	const row = $("<div class='row'></div>");
	const col12 = $("<div class='col-xs-12 text-center'></div>");
	const h2 = $("<h2>Abierto</h2>");
	const horario = $("<p>9:00 am - 9:00 pm</p>");
	const direccion = $("<p>Av. Los Jasmines 345</p>");

	col12.append(h2);
	col12.append(horario);
	col12.append(direccion);

	row.append(col12);
	div.append(row);
	
	return div;
};