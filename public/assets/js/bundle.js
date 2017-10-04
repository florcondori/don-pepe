(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
const render = (root)=>{
	root.empty();
	const update = ()=>render(root);
	const wrapper = $("<div class='wrapper'></div>");

	wrapper.append(Header(update));
	
	if(state.page !== null){
		wrapper.append(state.page(update));
	}else{
		wrapper.append(Welcome);
		wrapper.append(Stock(update));
	}

	root.append(wrapper);
};

const state = {
	products: null,
	user: null,
	productSelected: null,
	bag: [],
	page: null
};

$(_=>{

	$.getJSON('/api/products/', data =>{
		state.products = data;
		
		const root = $(".root");
		render(root);

	});

});
const Header = (update)=>{
	const header = $("<header class='container-fluid'></header>");
	const row = $("<div class='row'></div>");
	const sub1 = $("<div class='col-xs-8 text-center'></div>");
	const aReturn = $("<a href='#' class='return'><i class='glyphicon glyphicon-chevron-left'></i></a>");
	const logo = $("<span><strong>Don Pepe</strong></span>");
	const sub2 = $("<div class='col-xs-4 text-right'></div>");
	const aSignIn = $("<a href='#' class='sign-in'><i class='glyphicon glyphicon-user'></i></a>");
	const aBag = $("<a href='#' class='bag'><i class='glyphicon glyphicon-shopping-cart'></i><span class=''></span></a>");
	const aClose = $("<a href='#' class='close'><i class='glyphicon glyphicon-remove'></i></a>");
	aReturn.hide();
	aClose.hide();

	const inicio = ()=>{
		state.productSelected = null;
		state.page = null;
		update();
	};

	aReturn.on("click", (e)=>{
		e.preventDefault();
		inicio();
	});

	aClose.on("click", (e)=>{
		e.preventDefault();
		inicio();
	});

	aBag.on("click", (e)=>{
		e.preventDefault();
		console.log("ver bag");
		state.page = MyBag;
		update();
	});

	sub1.append(aReturn);
	sub1.append(logo);

	sub2.append(aSignIn);
	sub2.append(aBag);
	sub2.append(aClose);

	row.append(sub1);
	row.append(sub2);
	header.append(row);

	return header;	
};

const MyBag = ()=>{
	$(_=>{
		$(".close").show();
		$(".bag").hide();
		$(".sign-in").hide();
	});
	console.log(state.bag);
	const divContainer = $("<div class='conatiner-fluid'></div>");

	$.each(state.bag, (i, obj)=>{
		let div = $("<div class='row' id=${obj.id}></div>");
		let divImg = $("<div class='col-xs-3'></div>");
		let img = $(`<img src='assets/img/${obj.img}' />`);
		let divDescription = $("<div class='col-xs-9'></div>");
		let sub1 = $("<div class='col-xs-12'></div>");
		let name = $(`<span>${obj.name}<span>`);
		let aRemove = $("<a href='#'><i class='glyphicon glyphicon-trash'></i></a>");
		let sub2 = $("<div class='col-xs-12'></div>");
		let select = $("<select></select>");
		for(var i=1; i<=obj.cant; i++){
			let option = $(`<option value='${i}'>${i}</option>`);
			if(i == obj.valueSelected){
				option.prop("selected", true);	
			} 
			select.append(option);
		};

		let purchase = parseInt(select.val()) * parseFloat(obj.precio);
		let price = $(`<span class='sub-total'>${purchase}</span>`);	

		select.on("change", (e)=>{			
			state.bag.filter( el => el.id == obj.id)[0].valueSelected = $(e.currentTarget).val();
			
			$(e.currentTarget).next().text(parseInt($(e.currentTarget).val())*parseFloat(obj.precio));
		});

		aRemove.on("click", (e)=>{
			e.preventDefault();
			$(e.currentTarget).closest(".row").remove();
			const id = $(e.currentTarget).closest(".row").prop("id");
			let indx;
			state.bag.forEach((obj, index)=>{
				if(obj.id == id){
					indx = index;
				}
			});
			state.bag.splice(indx,1);
		});

		divImg.append(img);

		sub1.append(name);
		sub1.append(aRemove);
		sub2.append(select);
		sub2.append(price);

		divDescription.append(sub1);
		divDescription.append(sub2);

		div.append(divImg);
		div.append(divDescription);

		divContainer.append(div);
	});

	const divTotal = $("<div class='row'></div>");
	const col12T = $("<div class='col-xs-12'></div>");
	const span = $("<span>Total</span>");
	const total = $("<span>0</span>");
	const divCheckout = $("<div class='row'></div>");
	const col12C = $("<div class='col-xs-12'></div>");
	const aCheckout = $("<a href='#'>Checkout <i class='glyphicon glyphicon-chevron-right'></i></a>");

	let totalStateBag = state.bag.map( el => parseInt(el.valueSelected) * parseFloat(el.precio) )
								 .reduce((sum, actual) => sum + parseFloat(actual), 0);
	total.text(totalStateBag);
	//actualizar el total cuando hay cambios en cada producto
	$(()=>{
		$("select").on("change", (e)=>{			
			let precios = [];
			$(".sub-total").each((i,el)=>{
				precios.push(parseFloat($(el).text()));
			});

			total.text(precios.reduce((sum, actual)=> sum + parseFloat(actual), 0));
		});
	});

	col12C.append(aCheckout);
	divCheckout.append(col12C);

	col12T.append(span);
	col12T.append(total);
	divTotal.append(col12T);
	
	divContainer.append(divTotal);
	divContainer.append(divCheckout);

	return divContainer;
};
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
		if(state.bag.length == 0){
			state.bag.push(Object.assign({}, state.productSelected,{valueSelected: valueSelected}));
		}else{
			let inBag;
			state.bag.forEach((obj, indx)=>{
				if(obj.id == state.productSelected.id){
					inBag = indx;
				}
			});

			if(inBag !== undefined ){
				state.bag.forEach((obj, indx)=>{
					if(obj.id == state.productSelected.id){
						obj.valueSelected = parseInt(obj.valueSelected) + parseInt(valueSelected);
					}
				});
				
			}else{
				state.bag.push(Object.assign({}, state.productSelected,{valueSelected: valueSelected}));
			}
		}

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
},{}]},{},[1])