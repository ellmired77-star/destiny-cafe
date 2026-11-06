/* Destiny Cafe on-site Order & Custom Order form — posts to never-miss-owner-text /order */
(function(){
var API = window.DESTINY_CHAT_API_URL || "";
var TEL="(725) 325-7583", TELH="tel:+17253257583";
var L=function(){return document.documentElement.classList.contains('es')?'es':'en'};
var BAKERY=[
 {id:'cookies',en:'Sourdough Chocolate Chip Cookies (half dozen)',es:'Galletas de chispas de chocolate (media docena)',price:10},
 {id:'focaccia',en:'Cinnamon Roll Focaccia (9x13 tray)',es:'Focaccia de rollo de canela (bandeja 9x13)',price:12},
 {id:'biscuits',en:'Sourdough Biscuits (4 count)',es:'Biscuits de masa madre (4 unidades)',price:8},
 {id:'brownieTray',en:'Peppermint Mocha Brownies (8x8 tray)',es:'Brownies peppermint mocha (bandeja 8x8)',price:15},
 {id:'brownieOne',en:'Peppermint Mocha Brownie (individual)',es:'Brownie peppermint mocha (individual)',price:4}
];
var COFFEE=[
 {id:'revelation',en:'Revelation (12 oz)',es:'Revelation (12 oz)',p12:4.88,p16:null},
 {id:'honey',en:'Land of Milk & Honey Latte',es:'Land of Milk & Honey Latte',p12:6.50,p16:7.50},
 {id:'psalms',en:'Psalms',es:'Psalms',p12:4.88,p16:5.42},
 {id:'caramel',en:'Caramel Truffle House Brew',es:'Caramel Truffle House Brew',p12:4.88,p16:5.42},
 {id:'peppermint',en:'Peppermint Mocha (Hot or Iced)',es:'Peppermint Mocha (Caliente o Frío)',p12:6.50,p16:7.50}
];
var MILKS=[{id:'',en:'No milk add-on',es:'Sin leche extra',price:0},{id:'whole',en:'Organic Whole +$0.75',es:'Entera orgánica +$0.75',price:0.75},{id:'almond',en:'Almond +$0.75',es:'Almendra +$0.75',price:0.75},{id:'hh',en:'Half & Half +$0.75',es:'Half & Half +$0.75',price:0.75}];
var SYRUPS=[{id:'',en:'No syrup add-on',es:'Sin sirope extra',price:0},{id:'hv',en:'Honey Vanilla +$0.65',es:'Miel y vainilla +$0.65',price:0.65},{id:'maple',en:'Maple +$0.65',es:'Maple +$0.65',price:0.65},{id:'wc',en:'White Chocolate +$0.65',es:'Chocolate blanco +$0.65',price:0.65},{id:'pep',en:'Peppermint +$0.65',es:'Menta +$0.65',price:0.65}];
var qty={}, coffee={};

function money(n){return '$'+(Math.round(n*100)/100).toFixed(2)}
function total(){
 var t=0;
 BAKERY.forEach(function(i){t+=(qty[i.id]||0)*i.price});
 COFFEE.forEach(function(i){
  var c=coffee[i.id]||{q:0,size:'12',milk:'',syrup:''};
  if(!c.q)return;
  var base=c.size==='16'?(i.p16!=null?i.p16:i.p12):i.p12;
  var milk=(MILKS.find(function(m){return m.id===c.milk})||MILKS[0]).price;
  var sy=(SYRUPS.find(function(m){return m.id===c.syrup})||SYRUPS[0]).price;
  t+=c.q*(base+milk+sy);
 });
 return t;
}
function refreshTotal(){
 var el=document.getElementById('dc-order-total');
 if(el)el.textContent=money(total());
}

function buildModal(){
 if(document.getElementById('dc-order-lb'))return;
 var d=document.createElement('div');
 d.id='dc-order-lb';d.className='lb dc-order-lb';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');
 d.innerHTML='<div class="lb-in dc-order-in"><button type="button" class="lb-x" id="dc-order-x" aria-label="Close">×</button>'+
  '<h2 class="dc-order-title"><span class="en">Order &amp; Custom Order</span><span class="es">Pedido y Pedido Especial</span></h2>'+
  '<p class="dc-order-sub"><span class="en">Build your order here — the owners get a text right away and text you back to confirm &amp; arrange payment.</span><span class="es">Arme su pedido aquí — las dueñas reciben un texto de inmediato y le escriben para confirmar y coordinar el pago.</span></p>'+
  '<form id="dc-order-form" class="dc-order-form"></form></div>';
 document.body.appendChild(d);
 d.addEventListener('click',function(e){if(e.target===d)closeOrder()});
 document.getElementById('dc-order-x').onclick=closeOrder;
 renderForm();
}
function renderForm(){
 var f=document.getElementById('dc-order-form');
 var html='';
 html+='<fieldset><legend><span class="en">Winter Bakery</span><span class="es">Panadería de Invierno</span></legend>';
 BAKERY.forEach(function(i){
  qty[i.id]=qty[i.id]||0;
  html+='<div class="dc-row" data-id="'+i.id+'"><div class="dc-row-t"><b class="en">'+i.en+'</b><b class="es">'+i.es+'</b><span>'+money(i.price)+'</span></div>'+
   '<div class="dc-qty"><button type="button" data-act="-" data-id="'+i.id+'">−</button><span id="q-'+i.id+'">0</span><button type="button" data-act="+" data-id="'+i.id+'">+</button></div></div>';
 });
 html+='</fieldset>';
 html+='<fieldset><legend><span class="en">Specialty Coffee</span><span class="es">Café de Especialidad</span></legend>';
 COFFEE.forEach(function(i){
  coffee[i.id]=coffee[i.id]||{q:0,size:'12',milk:'',syrup:''};
  var sizes=i.p16==null?'<span class="dc-chip on">12 oz</span>':'<label class="dc-chip"><input type="radio" name="sz-'+i.id+'" value="12" checked> 12 oz</label><label class="dc-chip"><input type="radio" name="sz-'+i.id+'" value="16"> 16 oz</label>';
  html+='<div class="dc-row coffee" data-cid="'+i.id+'"><div class="dc-row-t"><b class="en">'+i.en+'</b><b class="es">'+i.es+'</b><span>'+money(i.p12)+(i.p16!=null?' / '+money(i.p16):'')+'</span></div>'+
   '<div class="dc-qty"><button type="button" data-cact="-" data-id="'+i.id+'">−</button><span id="cq-'+i.id+'">0</span><button type="button" data-cact="+" data-id="'+i.id+'">+</button></div>'+
   '<div class="dc-opts">'+sizes+
   '<select data-milk="'+i.id+'">'+MILKS.map(function(m){return '<option value="'+m.id+'"><span class="en">'+m.en+'</span></option>'}).join('')+'</select>'+
   '<select data-syrup="'+i.id+'">'+SYRUPS.map(function(m){return '<option value="'+m.id+'">'+m.en+'</option>'}).join('')+'</select></div></div>';
 });
 html+='</fieldset>';
 html+='<fieldset><legend><span class="en">Custom Order / Event / Special Request</span><span class="es">Pedido Especial / Evento / Solicitud</span></legend>'+
  '<textarea id="dc-custom" rows="3" placeholder="e.g. 3 brownie trays for church Friday · Tuesday delivery outside 8–12 · catering"></textarea></fieldset>';
 html+='<fieldset><legend><span class="en">Pickup or Delivery</span><span class="es">Recogida o Entrega</span></legend>'+
  '<label class="dc-radio"><input type="radio" name="fulfill" value="pickup" checked> <span class="en">Pickup Tue Nov 10, 8 AM–12 PM · Farm &amp; Tenaya</span><span class="es">Recogida mar. 10 nov, 8 AM–12 PM · Farm y Tenaya</span></label>'+
  '<label class="dc-radio"><input type="radio" name="fulfill" value="delivery"> <span class="en">Batch Delivery (LV / NLV / Strip / Summerlin / Henderson)</span><span class="es">Entrega por lote (LV / NLV / Strip / Summerlin / Henderson)</span></label>'+
  '<label class="dc-radio"><input type="radio" name="fulfill" value="custom"> <span class="en">Custom Date / Special Delivery Request</span><span class="es">Fecha especial / Entrega especial</span></label>'+
  '<input id="dc-when-extra" placeholder="Area + preferred day/time (if delivery or custom)"></fieldset>';
 html+='<fieldset><legend><span class="en">Your Info</span><span class="es">Sus Datos</span></legend>'+
  '<input id="dc-name" required placeholder="Name / Nombre">'+
  '<input id="dc-phone" required type="tel" placeholder="Phone with area code / Teléfono">'+
  '<input id="dc-notes" placeholder="Notes / allergies (optional)"></fieldset>';
 html+='<div class="dc-total-bar"><span class="en">Estimated menu total</span><span class="es">Total estimado del menú</span>: <b id="dc-order-total">$0.00</b></div>'+
  '<p class="dc-pay-note"><span class="en">The owners text you directly to confirm your order &amp; payment. No tax. Standard batch delivery has no fee.</span><span class="es">Las dueñas le escriben para confirmar su pedido y el pago. Sin impuestos. La entrega por lote estándar no tiene cargo.</span></p>'+
  '<button type="submit" class="btn p dc-submit"><span class="en">Send Order to Destiny Cafe</span><span class="es">Enviar Pedido a Destiny Cafe</span></button>'+
  '<p class="dc-alt"><span class="en">Or call </span><span class="es">O llame al </span><a href="'+TELH+'">'+TEL+'</a></p>'+
  '<div id="dc-order-status" class="dc-order-status" hidden></div>';
 f.innerHTML=html;
 // Fix milk/syrup option labels for ES via rebuild on lang - keep EN labels in select for simplicity; OK for v1
 f.onclick=function(e){
  var b=e.target.closest('button'); if(!b)return;
  if(b.dataset.act){var id=b.dataset.id;qty[id]=Math.max(0,(qty[id]||0)+(b.dataset.act==='+'?1:-1));document.getElementById('q-'+id).textContent=qty[id];refreshTotal();}
  if(b.dataset.cact){var id=b.dataset.id;coffee[id].q=Math.max(0,(coffee[id].q||0)+(b.dataset.cact==='+'?1:-1));document.getElementById('cq-'+id).textContent=coffee[id].q;refreshTotal();}
 };
 f.onchange=function(e){
  var t=e.target;
  if(t.name&&t.name.indexOf('sz-')===0){coffee[t.name.slice(3)].size=t.value;refreshTotal();}
  if(t.dataset.milk){coffee[t.dataset.milk].milk=t.value;refreshTotal();}
  if(t.dataset.syrup){coffee[t.dataset.syrup].syrup=t.value;refreshTotal();}
 };
 f.onsubmit=function(e){e.preventDefault();submitOrder();};
 refreshTotal();
}
function buildItemsSummary(){
 var lines=[], kind='order';
 BAKERY.forEach(function(i){if(qty[i.id])lines.push(qty[i.id]+' x '+i.en+' ('+money(i.price)+')');});
 COFFEE.forEach(function(i){
  var c=coffee[i.id]; if(!c||!c.q)return;
  var base=c.size==='16'&&i.p16!=null?i.p16:i.p12;
  var milk=MILKS.find(function(m){return m.id===c.milk});
  var sy=SYRUPS.find(function(m){return m.id===c.syrup});
  var extras=[]; if(milk&&milk.id)extras.push(milk.en); if(sy&&sy.id)extras.push(sy.en);
  lines.push(c.q+' x '+i.en+' '+c.size+'oz'+(extras.length?' + '+extras.join(', '):'')+' ('+money(c.q*(base+(milk?milk.price:0)+(sy?sy.price:0)))+')');
 });
 var custom=(document.getElementById('dc-custom').value||'').trim();
 if(custom){lines.push('CUSTOM: '+custom);kind='custom';}
 var notes=(document.getElementById('dc-notes').value||'').trim();
 if(notes)lines.push('Notes: '+notes);
 if(lines.length)lines.push('Est. menu total: '+money(total()));
 return {items:lines.join('; '), kind:kind};
}
function fulfillWhen(){
 var v=(document.querySelector('input[name="fulfill"]:checked')||{}).value||'pickup';
 var extra=(document.getElementById('dc-when-extra').value||'').trim();
 if(v==='pickup')return 'Pickup Tue Nov 10, 8 AM–12 PM, Farm & Tenaya'+(extra?' · '+extra:'');
 if(v==='delivery')return 'Batch delivery'+(extra?' · '+extra:' · area/time TBD');
 return 'Custom / special delivery request'+(extra?' · '+extra:'');
}
function submitOrder(){
 var name=(document.getElementById('dc-name').value||'').trim();
 var phone=(document.getElementById('dc-phone').value||'').trim();
 var digits=phone.replace(/\D/g,'');
 var sum=buildItemsSummary();
 var status=document.getElementById('dc-order-status');
 status.hidden=false;
 if(name.length<2||digits.length<10||!sum.items){
  status.className='dc-order-status err';
  status.innerHTML=L()==='es'?'Por favor complete nombre, teléfono (10 dígitos) y al menos un artículo o pedido especial.':'Please add your name, a 10-digit phone, and at least one item or custom request.';
  return;
 }
 if(!API){
  status.className='dc-order-status err';
  status.innerHTML='Order form is not connected yet. Call <a href="'+TELH+'">'+TEL+'</a>.';
  return;
 }
 status.className='dc-order-status';
 status.textContent=L()==='es'?'Enviando su pedido…':'Sending your order…';
 var fulfill=(document.querySelector('input[name="fulfill"]:checked')||{}).value;
 var kind=sum.kind==='custom'||fulfill==='custom'?'custom':'order';
 var payload={lang:L(),kind:kind,order:{name:name,phone:phone,items:sum.items,when:fulfillWhen()},page:location.href,website:''};
 fetch(API+'/order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
  .then(function(r){return r.json().then(function(d){return {ok:r.ok,d:d}})})
  .then(function(x){
    if(x.ok){
      status.className='dc-order-status ok';
      status.innerHTML=L()==='es'
        ?'¡Gracias! Ya enviamos su pedido por texto a las dueñas — ellas le escribirán enseguida para confirmar y coordinar el pago. Que Dios le bendiga 💜'
        :'Thank you! We just texted your order to the owners — they\'ll text you shortly to confirm and arrange payment. God bless you 💜';
      document.getElementById('dc-order-form').querySelector('.dc-submit').disabled=true;
    } else {
      status.className='dc-order-status err';
      status.innerHTML=L()==='es'
        ?'No se pudo enviar. Llame al <a href="'+TELH+'">'+TEL+'</a> para que no se pierda.'
        :'Couldn\'t send. Please call <a href="'+TELH+'">'+TEL+'</a> so nothing is missed.';
    }
  })
  .catch(function(){
    status.className='dc-order-status err';
    status.innerHTML=L()==='es'
      ?'Error de conexión. Llame al <a href="'+TELH+'">'+TEL+'</a>.'
      :'Connection error. Please call <a href="'+TELH+'">'+TEL+'</a>.';
  });
}
function openOrder(e){if(e)e.preventDefault();buildModal();document.getElementById('dc-order-lb').classList.add('open');document.body.style.overflow='hidden';}
function closeOrder(){var el=document.getElementById('dc-order-lb');if(el)el.classList.remove('open');document.body.style.overflow='';}
window.openDestinyOrder=openOrder;
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeOrder();});
})();
