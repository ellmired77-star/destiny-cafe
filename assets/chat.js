/* Destiny Cafe Chat — white-labeled typed chat (EN / ES).
 * When DESTINY_CHAT_API_URL points at never-miss-owner-text, EVERY message goes to
 * POST /chat (Workers AI). Structured /order still available as backup.
 * Offline / network-error fallback uses local canned answers (delivery checked BEFORE tuesday). */
(function(){
var CHAT_API_URL = window.DESTINY_CHAT_API_URL || "";
var TEL="(725) 325-7583", TELH="tel:+17253257583";
var L=function(){return document.documentElement.classList.contains('es')?'es':'en'};
var T={
 en:{title:"Destiny Cafe · Order & Menu Help",sub:"We reply in English or Spanish",ph:"Write a message…",send:"Send",launch:"Chat with Destiny Cafe",close:"Close chat",
  hello:"Hi, welcome to Destiny Cafe! God bless you 💜 How can we help — the Winter Menu, our regular menu, delivery, or placing an order?",
  chips:["Winter Menu (Tue Nov 10)","Regular Menu & Prices","How batch delivery works","Place an order"],preview:"Preview mode — order requests are not sent yet"},
 es:{title:"Destiny Cafe · Ayuda con su Pedido",sub:"Le atendemos en español o inglés",ph:"Escriba su mensaje…",send:"Enviar",launch:"Escríbale a Destiny Cafe",close:"Cerrar chat",
  hello:"¡Hola, bienvenido a Destiny Cafe! Que Dios le bendiga 💜 ¿En qué le podemos ayudar: el Menú de Invierno, el menú regular, las entregas o hacer un pedido?",
  chips:["Menú de Invierno (mar. 10 nov.)","Menú Regular y Precios","Cómo funcionan las entregas","Hacer un pedido"],preview:"Modo de vista previa — los pedidos aún no se envían"}};
var A={
 winter:{en:"❄️ <b>Winter Menu — Pre-Order Pickup, Tuesday Nov 10, 8:00 AM–12:00 PM</b> (NW Las Vegas, Farm &amp; Tenaya area; we text you the exact spot):<br>• Sourdough Chocolate Chip Cookies (half dozen) — $10<br>• Cinnamon Roll Focaccia (9x13 tray) — $12<br>• Sourdough Biscuits (4 count) — $8<br>• Peppermint Mocha Brownies — $15 (8x8 tray) or $4 individual<br>• Peppermint Mocha (house-made peppermint syrup) — Hot 12 oz $6.50 · Iced 16 oz $7.50<br>I can take your order right here (menu items or a custom / event request), or you can call <a href='"+TELH+"'>"+TEL+"</a>.",
  es:"❄️ <b>Menú de Invierno — Recogida el martes 10 de noviembre, 8:00 AM–12:00 PM</b> (noroeste de Las Vegas, zona de Farm y Tenaya; le enviamos el lugar exacto por texto):<br>• Galletas de chispas de chocolate de masa madre (media docena) — $10<br>• Focaccia de rollo de canela (bandeja 9x13) — $12<br>• Biscuits de masa madre (4 unidades) — $8<br>• Brownies de moca y menta — $15 (bandeja 8x8) o $4 individual<br>• Peppermint Mocha (sirope de menta de la casa) — Caliente 12 oz $6.50 · Frío 16 oz $7.50<br>Le tomo su pedido aquí mismo (menú o pedido especial / evento), o puede llamar al <a href='"+TELH+"'>"+TEL+"</a>."},
 coffee:{en:"☕ <b>Specialty Coffee</b> (12 oz / 16 oz): Revelation (4 espresso shots + sweet cream, 12 oz) $4.88 · Land of Milk &amp; Honey Latte $6.50/$7.50 · Psalms (chocolate raspberry house brew) $4.88/$5.42 · Caramel Truffle House Brew $4.88/$5.42 · Peppermint Mocha (seasonal, Hot or Iced) $6.50/$7.50.<br>Milk add-on +$0.75: Organic Whole, Almond, Half &amp; Half. Housemade signature syrups +$0.65: Honey Vanilla · Maple · White Chocolate · Peppermint (Seasonal).",
  es:"☕ <b>Café de Especialidad</b> (12 oz / 16 oz): Revelation (4 shots de espresso + crema dulce, 12 oz) $4.88 · Land of Milk &amp; Honey Latte $6.50/$7.50 · Psalms (house brew de chocolate y frambuesa) $4.88/$5.42 · Caramel Truffle House Brew $4.88/$5.42 · Peppermint Mocha (de temporada, caliente o frío) $6.50/$7.50.<br>Leche extra +$0.75: entera orgánica, almendra, Half &amp; Half. Siropes de la casa +$0.65: miel y vainilla · maple · chocolate blanco · menta (de temporada)."},
 bakery:{en:"🧁 <b>Fresh Sourdough &amp; Bakery (Winter Menu)</b>:<br>• Sourdough Chocolate Chip Cookies (half dozen) — $10<br>• Cinnamon Roll Focaccia (9x13 tray) — $12<br>• Sourdough Biscuits (4 count) — $8<br>• Peppermint Mocha Brownies — $15 (8x8 tray) or $4 individual<br>Custom event or catering bakes can be requested here or by phone — the owners confirm by text.",
  es:"🧁 <b>Masa Madre y Panadería (Menú de Invierno)</b>:<br>• Galletas de chispas de chocolate de masa madre (media docena) — $10<br>• Focaccia de rollo de canela (bandeja 9x13) — $12<br>• Biscuits de masa madre (4 unidades) — $8<br>• Brownies de moca y menta — $15 (bandeja 8x8) o $4 individual<br>Para pedidos especiales de eventos o catering, escríbanos o llámenos — las dueñas confirman por texto."},
 delivery:{en:"🚗 <b>Batch delivery</b> by pre-order to Las Vegas, North Las Vegas, the Strip, Summerlin and Henderson. A delivery run goes out once about 10 orders are lined up — tell us your preferred day and time and we text you to confirm. No delivery fee and no tax: the menu price is the total. Need a special Tuesday handoff outside the 8 AM–12 PM pickup window? Tell me your name, phone, and what you want — I can text the owners so they can see if they can make it work.",
  es:"🚗 <b>Entregas por lotes</b> con pedido previo en Las Vegas, North Las Vegas, el Strip, Summerlin y Henderson. Salimos a entregar cuando se juntan unos 10 pedidos — díganos su día y hora preferidos y le confirmamos por texto. Sin cargo de entrega ni impuestos: el precio del menú es el total. ¿Necesita una entrega especial el martes fuera de la ventana de 8 AM–12 PM? Dígame su nombre, teléfono y qué desea — puedo enviárselo por texto a las dueñas para que vean si se puede."},
 allergy:{en:"We only have the ingredients listed on the menu (many are organic). For allergies or gluten-free needs, please ask and the owners will confirm by text before you order — we never want to guess.",
  es:"Solo tenemos los ingredientes que aparecen en el menú (muchos son orgánicos). Para alergias o sin gluten, pregúntenos y los dueños le confirman por texto antes de ordenar — no queremos adivinar."},
 contact:{en:"You can place an order right here in chat (or tap <b>Pre-Order / Custom Order</b> on the site), call <a href='"+TELH+"'>"+TEL+"</a>, or email destinycafe7@gmail.com.",
  es:"Puede hacer su pedido aquí en el chat (o tocar <b>Pedido / Pedido Especial</b> en el sitio), llamar al <a href='"+TELH+"'>"+TEL+"</a>, o escribir a destinycafe7@gmail.com."},
 unknown:{en:"I want to make sure you get the exact right answer — the owners can confirm that by text. Would you like to leave your name and number, or call "+TEL+"?",
  es:"Quiero asegurarme de darle la respuesta exacta — las dueñas se lo pueden confirmar por texto. ¿Desea dejar su nombre y número, o llamar al "+TEL+"?"},
 howto:{en:"Easy ways to order:<br>1. Tap <b>Pre-Order / Custom Order</b> on this website (menu items, events, catering, special delivery).<br>2. Call <a href='"+TELH+"'>"+TEL+"</a>.<br>3. Place the order right here in chat — tap <b>Place an order</b> or tell me what you'd like.",
  es:"Formas fáciles de ordenar:<br>1. Toque <b>Pedido / Pedido Especial</b> en este sitio (menú, eventos, catering, entrega especial).<br>2. Llame al <a href='"+TELH+"'>"+TEL+"</a>.<br>3. Haga el pedido aquí en el chat — toque <b>Hacer un pedido</b> o díganos qué le gustaría."},
 cancel:{en:"No problem at all — let us know if you have any menu questions!",es:"No hay problema — avísenos si tiene alguna pregunta sobre el menú."},
 needName:{en:"What name should we put on the order? (Or type 'cancel' anytime.)",es:"¿A nombre de quién ponemos el pedido? (O escriba 'cancelar' en cualquier momento.)"},
 needPhone:{en:"Could you share a phone number (with area code) so we can text your confirmation? Or type 'cancel' anytime.",es:"¿Nos puede dar un número de teléfono (con código de área) para enviarle la confirmación por texto? O escriba 'cancelar' en cualquier momento."},
 resume:{en:"Whenever you're ready to finish your order, just reply to the last question above.",es:"Cuando esté listo para terminar su pedido, solo responda la última pregunta de arriba."},
 noted:{en:"Got it, I noted: ",es:"Anotado: "}};
var STEPS=[{k:"name",en:"Sure — we can take your order request right here. What name should we put on the order?",es:"Claro, le tomamos su pedido aquí mismo. ¿A nombre de quién ponemos el pedido?"},
 {k:"phone",en:"What's the best phone number to text you the confirmation?",es:"¿A qué número le enviamos la confirmación por texto?"},
 {k:"items",en:"What would you like (items, sizes, how many)?",es:"¿Qué le gustaría ordenar (productos, tamaños, cantidad)?"},
 {k:"when",en:"Pickup on Tuesday 11/10 (8 AM–12 PM, Farm &amp; Tenaya), or batch delivery? If delivery, which area and preferred day/time?",es:"¿Recogida el martes 11/10 (8 AM–12 PM, Farm y Tenaya) o entrega? Si es entrega, ¿en qué zona y qué día/hora prefiere?"}];
var flow=null, order={}, el={}, history=[], smsAlreadySent=false, busy=false;

function build(){
 var b=document.createElement('button');b.className='dc-launch';b.type='button';b.innerHTML='<span class="dc-dot"></span><span class="dc-lt"></span>';b.onclick=toggle;el.launch=b;
 var w=document.createElement('div');w.className='dc-win';w.setAttribute('role','dialog');
 w.innerHTML='<div class="dc-head"><img src="assets/logo.png?v=20261105g" alt=""><div><b class="dc-t"></b><small class="dc-s"></small></div><button type="button" class="dc-x">×</button></div>'+
  '<div class="dc-badge"></div><div class="dc-msgs" aria-live="polite"></div><div class="dc-chips"></div>'+
  '<form class="dc-form"><input class="dc-in" autocomplete="off"><button class="dc-send" type="submit"></button></form>';
 document.body.appendChild(w);document.body.appendChild(b);el.win=w;
 el.msgs=w.querySelector('.dc-msgs');el.chips=w.querySelector('.dc-chips');el.in=w.querySelector('.dc-in');
 w.querySelector('.dc-x').onclick=toggle;
 w.querySelector('.dc-form').onsubmit=function(e){e.preventDefault();var v=el.in.value.trim();if(!v||busy)return;el.in.value='';handle(v);};
 relabel();
 new MutationObserver(relabel).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
}
function relabel(){var t=T[L()];el.launch.querySelector('.dc-lt').textContent=t.launch;el.launch.setAttribute('aria-label',t.launch);
 el.win.setAttribute('aria-label',t.title);el.win.querySelector('.dc-t').textContent=t.title;el.win.querySelector('.dc-s').textContent=t.sub;
 el.win.querySelector('.dc-x').setAttribute('aria-label',t.close);el.in.placeholder=t.ph;el.in.setAttribute('aria-label',t.ph);
 el.win.querySelector('.dc-send').textContent=t.send;var bd=el.win.querySelector('.dc-badge');bd.textContent=CHAT_API_URL?'':t.preview;bd.style.display=CHAT_API_URL?'none':'';chips();}
function chips(){var t=T[L()];el.chips.innerHTML='';t.chips.forEach(function(c){var x=document.createElement('button');x.type='button';x.textContent=c;x.onclick=function(){if(!busy)handle(c)};el.chips.appendChild(x);});}
function add(who,html){var m=document.createElement('div');m.className='dc-m dc-'+who;m.innerHTML=html;el.msgs.appendChild(m);el.msgs.scrollTop=el.msgs.scrollHeight;history.push({role:who==='me'?'user':'assistant',text:m.textContent});return m;}
function esc(s){return String(s||'').replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function formatReply(text){
 var s=esc(text);
 s=s.replace(/\(725\)\s*325-7583/g,'<a href="'+TELH+'">'+TEL+'</a>');
 s=s.replace(/\n/g,'<br>');
 return s;
}
function showTyping(){var m=document.createElement('div');m.className='dc-m dc-them dc-typing';m.textContent='…';el.msgs.appendChild(m);el.msgs.scrollTop=el.msgs.scrollHeight;return m;}
function toggle(){var o=el.win.classList.toggle('open');el.launch.classList.toggle('hide',o);if(o){if(!el.msgs.children.length)add('them',T[L()].hello);setTimeout(function(){el.in.focus()},50);}}
window.openDestinyChat=function(){if(!el.win.classList.contains('open'))toggle();else el.in.focus();};

function norm(q){return q.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim();}
function intent(q){q=norm(q);
 if(/^(cancel|never ?mind|stop|exit|no thanks|no thank you|cancelar|nada)\b/.test(q))return'cancel';
 if(/\b(how|where|can i|could i|como|donde|puedo)\b.*\b(order|pedido|ordenar|pre-?order|buy|comprar)|ordering work|order online|se ordena/.test(q))return'howto';
 if(/place an order|start an order|take my order|make an order|hacer un pedido|i want to order|i'd like to order|id like to order|i want to get|i would like|quiero ordenar|quiero pedir|quisiera|^order\b|^ordenar\b/.test(q))return'order';
 // Delivery / special handoff BEFORE winter/tuesday so "delivery on Tuesday" is not a Winter Menu dump.
 if(/deliver|entrega|domicilio|summerlin|henderson|strip|fee|cargo|envio|pay for delivery|pagar.*entrega|won't make it|no (me )?alcanza|willing to pay|pag(o|ar) extra/.test(q))return'delivery';
 if(/winter|invierno|nov|11\/10|tuesday|martes|pickup|recog|peppermint|menta|focaccia|biscuit|sourdough|masa madre|brownie|farm|tenaya/.test(q))return'winter';
 if(/allerg|alerg|gluten|vegan|dairy|lact|nut|nuez|mani|ingredient/.test(q))return'allergy';
 if(/regular|menu|price|precio|cuanto|how much|cost/.test(q))return'menu';
 if(/coffee|cafe|latte|brew|espresso|drink|bebida|milk|leche|syrup|sirope|psalm|revelation|caramel|carmel|honey|mocha|hazelnut/.test(q))return'coffee';
 if(/cupcake|cookie|galleta|crinkle|bakery|panaderia|dozen|docena|focaccia|biscuit|sourdough|masa madre|brownie|cater|event|evento/.test(q))return'bakery';
 if(/phone|call|llam|telefono|bakesy|email|contact|where|donde|address|direccion|hour|horario/.test(q))return'contact';
 if(/^(hi|hello|hey|hola|buenas|buenos)/.test(q))return'hi';
 return'unknown';}
var CHIPS={};['en','es'].forEach(function(l){T[l].chips.forEach(function(c,i){CHIPS[norm(c)]=['winter','menu','delivery','order'][i];});});
function isQuestion(v){var q=norm(v);return /\?/.test(q)||/^(how|what|where|when|can|do|does|is|are|who|why|como|que|donde|cuando|cuanto|cual|hay|tienen)\b/.test(q);}
function answer(i,l){if(i==='menu'){reply(A.coffee[l]);reply(A.bakery[l],1);return;}if(i==='hi'){reply(T[l].hello);return;}reply(A[i][l]);}
function startOrder(v,l,fromChip){flow=0;order={};
 if(!fromChip){var rest=v.replace(/^\s*(i want to order|i'd like to order|id like to order|i want to get|i would like|i'd like|quiero ordenar|quiero pedir|quisiera ordenar|quisiera pedir|place an order( for)?|start an order( for)?|order|ordenar)\s*:?\s*/i,'').trim();
  if(rest&&rest!==v.trim()&&!/^(an? order|un pedido|please|por favor)\.?$/i.test(rest)){order.items=rest;reply(A.noted[l]+esc(rest));}}
 setTimeout(function(){add('them',STEPS[0][l])},order.items?800:350);}
function nextStep(l){do{flow++;}while(flow<STEPS.length&&order[STEPS[flow].k]);
 if(flow<STEPS.length){reply(STEPS[flow][l]);return;}
 flow=null;var lab=l==='es'?{name:"Nombre",phone:"Teléfono",items:"Pedido",when:"Recogida/Entrega",t:"Resumen de su pedido:"}:{name:"Name",phone:"Phone",items:"Items",when:"Pickup/Delivery",t:"Your order request:"};
 reply("<b>"+lab.t+"</b><br>"+["name","phone","items","when"].map(function(k){return "<b>"+lab[k]+":</b> "+esc(order[k]||"")}).join("<br>"));submit(order,l);}

function handle(v){
 add('me',esc(v));
 var l=L();
 if(CHAT_API_URL){smartChat(v,l);return;}
 // Offline fallback (preview / no Worker URL)
 var q=norm(v),chip=CHIPS[q],i=chip||intent(v);
 if(i==='cancel'){flow=null;order={};reply(A.cancel[l]);return;}
 if(flow!==null){var k=STEPS[flow].k,digits=v.replace(/\D/g,'').length,words=q.split(/\s+/).length;
  if(chip==='order'||i==='order'){reply(STEPS[flow][l]);return;}
  var known=i!=='unknown'&&i!=='hi';
  var faq=chip||(known&&(isQuestion(v)||(words>=3&&k!=='items'&&k!=='when')))||(isQuestion(v)&&(k==='name'||k==='phone')&&digits<7);
  if(faq){answer(known||chip?i:'unknown',l);setTimeout(function(){add('them',k==='phone'?A.needPhone[l]:A.resume[l])},1000);return;}
  if(k==='name'&&(digits>0||q.replace(/[^a-z]/g,'').length<2||/^(idk|i don'?t know|no se|no|yes|si|ok|okay|hi|hello|hola|hey|lol|help|ayuda|what|que|huh|test|asdf)\W*$/.test(q))){reply(A.needName[l]);return;}
  if(k==='phone'&&digits<7){reply(A.needPhone[l]);return;}
  order[k]=v;nextStep(l);return;}
 if(i==='order'){startOrder(v,l,!!chip);return;}
 answer(i,l);
}

function reply(h,extra){setTimeout(function(){add('them',h)},350+(extra?400:0));}

function smartChat(v,l){
 if(busy)return;
 busy=true; el.in.disabled=true; el.win.querySelector('.dc-send').disabled=true;
 var typing=showTyping();
 var payload={lang:l,message:v,history:history.slice(0,-1).slice(-12),smsAlreadySent:smsAlreadySent,website:''};
 fetch(CHAT_API_URL+'/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
  .then(function(r){return r.json().then(function(d){return {ok:r.ok,d:d}})})
  .then(function(x){
    if(typing&&typing.parentNode)typing.parentNode.removeChild(typing);
    if(x.ok&&x.d&&x.d.reply){
      add('them',formatReply(x.d.reply));
      if(x.d.smsSent)smsAlreadySent=true;
    } else {
      offlineFallback(v,l);
    }
  })
  .catch(function(){
    if(typing&&typing.parentNode)typing.parentNode.removeChild(typing);
    offlineFallback(v,l);
  })
  .finally(function(){busy=false;el.in.disabled=false;el.win.querySelector('.dc-send').disabled=false;el.in.focus();});
}
function offlineFallback(v,l){
 var q=norm(v),chip=CHIPS[q],i=chip||intent(v);
 if(i==='order'){startOrder(v,l,!!chip);return;}
 answer(i==='unknown'?'contact':i,l);
}

function submit(o,l){
 var sending=l==='es'?"Enviando su pedido…":"Sending your order request…";
 var done=l==='es'
  ?"¡Gracias! Acabamos de enviar su pedido por texto a las dueñas — ellas le escribirán enseguida para confirmar su pedido, el total y la hora de recogida o entrega. Que Dios le bendiga 💜"
  :"Thank you! We just texted your order to the owners — they'll text you shortly to confirm your order, total, and pickup/delivery time. God bless you 💜";
 var fail=l==='es'
  ?"No pudimos enviar su pedido por texto ahora. Por favor llame o escriba al <a href='"+TELH+"'>"+TEL+"</a> para que no se pierda."
  :"We couldn't text your order just now. Please call or text <a href='"+TELH+"'>"+TEL+"</a> so nothing is missed.";
 if(!CHAT_API_URL){console.info('[Destiny Chat] preview mode — would POST to CHAT_API_URL/order:',o);
  reply(done+"<br><small class='dc-note'>"+(l==='es'?"(Vista previa: al publicar, este pedido se enviará por texto a los dueños.)":"(Preview: once published, this request is texted to the owners.)")+"</small>",1);return;}
 reply(sending);
 fetch(CHAT_API_URL+'/order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({lang:l,kind:(o&&o.kind)||'order',order:o,page:location.href,website:''})})
  .then(function(r){if(r.ok)smsAlreadySent=true;reply(r.ok?done:fail,1)}).catch(function(){reply(fail,1)});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
