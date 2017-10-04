const ProductSelected = (update)=>{
	$(_=>{
		$(".return").show();
	});
	
	const div = $("<div class='container-fluid'></div>");
	const row = $("<div class='row'></div>");
	const col5 = $("<div class='col-xs-12 col-sm-5'></div>");
	const img = $(`<img src='assets/img/${state.productSelected.img}' />`);
	const col7 = $("<div class='col-xs-12 col-sm-7'></div>");
	const title = $(`<h4>${state.productSelected.name}</h4>`);
	const price = $(`<span>${state.productSelected.precio}</span>`);
	const sub1 = $("<div class='col-xs-12'></div>");
	const selectTag = $("<select></select>");
	for(var i=1; i<=state.productSelected.cant; i++){
		let option = $(`<option value='${i}'>${i}</option>`);

		selectTag.append(option);
	};

	const btnAddBag = $("<button>Comprar</button>");

	const addBag = (value)=>{
		state.bag.push(
				{	name: state.productSelected.name,
					id: state.productSelected.id,
					img: state.productSelected.img,
					precio: state.productSelected.precio,
					cant: state.productSelected.cant,
					valueSelected: value
				});	
	};

	btnAddBag.on("click", (e)=>{
		e.preventDefault();
		let spanBadge = $(".bag").find('span');
		let valueSelected = selectTag.val();

		if(spanBadge.text()){
			spanBadge.text(parseInt(spanBadge.text()) + parseInt(valueSelected));
		}else{
			spanBadge.addClass('badge').text(valueSelected);
		}

		//Verificar si el producto seleccionado esta en el carrito de compras antes de guardarlo en el
		//Si no hay ningun producto hacer push defrente
		if(state.bag.length == 0){
			addBag(valueSelected);

		}else{

			let inBag;
			state.bag.forEach((obj, indx)=>{
				if(obj.id == state.productSelected.id){
					inBag = indx;
				}
			});
			//Si el producto ya esta en el carrito, solo alteramos su valor seleccionado
			if(inBag !== undefined ){
				state.bag.forEach((obj, indx)=>{
					if(obj.id == state.productSelected.id){
						obj.valueSelected = parseInt(obj.valueSelected) + parseInt(valueSelected);
					}
				});
				
			}else{
				addBag(valueSelected);
			}
		}
		//Despues de un segundo se muestra el carrito de compras
		setTimeout(()=>{
			state.page = MyBag;
			update();

		}, 1000);
		
	});

	sub1.append(selectTag);
	sub1.append(btnAddBag);

	col5.append(img);
	col7.append(title);
	col7.append(price);
	col7.append(sub1);

	row.append(col5);
	row.append(col7);

	div.append(row); 

	return div;
};