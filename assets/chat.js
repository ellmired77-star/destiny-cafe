/* Destiny Cafe Chat — white-labeled typed chat (EN / ES).
 * Works offline from verified menu facts. When CHAT_API_URL is set (our Cloudflare
 * Worker, e.g. https://contractor-leads.ell-mired77.workers.dev/api/destiny-chat),
 * free-form questions go to the live backend and finished order requests are POSTed
 * there so the owners get a text. Until then it runs in preview mode (no texts sent). */
(function(){
var CHAT_API_URL = window.DESTINY_CHAT_API_URL || "";   // "" = preview mode
var BAKESY="https://bakesy.shop/b/destiny-cafe-llc", TEL="(725) 325-7583", TELH="tel:+17253257583";
var L=function(){return document.documentElement.classList.contains('es')?'es':'en'};
var T={
 en:{title:"Destiny Cafe · Order & Menu Help",sub:"We reply in English or Spanish",ph:"Write a message…",send:"Send",launch:"Chat with Destiny Cafe",close:"Close chat",
  hello:"Hi, welcome to Destiny Cafe! God bless you 💜 How can we help — the Winter Menu, our regular menu, delivery, or placing an order?",
  chips:["Winter Menu (Tue Nov 10)","Regular Menu & Prices","How batch delivery works","Place an order"],preview:"Preview mode — order requests are not sent yet"},
 es:{title:"Destiny Cafe · Ayuda con su Pedido",sub:"Le atendemos en español o inglés",ph:"Escriba su mensaje…",send:"Enviar",launch:"Escríbale a Destiny Cafe",close:"Cerrar chat",
  hello:"¡Hola, bienvenido a Destiny Cafe! Que Dios le bendiga 💜 ¿En qué le podemos ayudar: el Menú de Invierno, el menú regular, las entregas o hacer un pedido?",
  chips:["Menú de Invierno (mar. 10 nov.)","Menú Regular y Precios","Cómo funcionan las entregas","Hacer un pedido"],preview:"Modo de vista previa — los pedidos aún no se envían"}};
var A={
 winter:{en:"❄️ <b>Winter Menu — Pre-Order Pickup, Tuesday Nov 10, 8:00 AM–12:00 PM</b> (NW Las Vegas, Farm &amp; Tenaya area; we text you the exact spot):<br>• Sourdough Chocolate Chip Cookies (half dozen) — $10<br>• Cinnamon Roll Focaccia (9x13 tray) — $12<br>• Sourdough Biscuits (4 count) — $8<br>• Peppermint Mocha Brownies — $15 (8x8 tray) or $4 individual<br>• Peppermint Mocha (house-made peppermint syrup) — Hot 12 oz $6.50 · Iced 16 oz $7.50<br>Pre-order on <a href='"+BAKESY+"' target='_blank' rel='noopener'>Bakesy</a> and pick <b>11/10</b>, or I can take your order request right here.",
  es:"❄️ <b>Menú de Invierno — Recogida el martes 10 de noviembre, 8:00 AM–12:00 PM</b> (noroeste de Las Vegas, zona de Farm y Tenaya; le enviamos el lugar exacto por texto):<br>• Galletas de chispas de chocolate de masa madre (media docena) — $10<br>• Focaccia de rollo de canela (bandeja 9x13) — $12<br>• Biscuits de masa madre (4 unidades) — $8<br>• Brownies de moca y menta — $15 (bandeja 8x8) o $4 individual<br>• Peppermint Mocha (sirope de menta de la casa) — Caliente 12 oz $6.50 · Frío 16 oz $7.50<br>Ordene en <a href='"+BAKESY+"' target='_blank' rel='noopener'>Bakesy</a> y seleccione <b>11/10</b>, o le tomo su pedido aquí mismo."},
 coffee:{en:"☕ <b>Coffee</b> (12 oz / 16 oz): Revelation (4 espresso shots + sweet cream, 12 oz) $5.50 · Land of Milk &amp; Honey Latte $6.25/$7.25 · Psalms (chocolate raspberry house brew) $5.50/$6.25 · Signature House Brew (caramel truffle) $5.50/$6.25 · O.G. Latte $6.25/$7.25 · The Vine (seasonal: honeydew, Moroccan mint tea, honey) $6.25/$7.25.<br>Milk swap (organic whole, almond, almond coconut) +$1.00 · white chocolate or signature syrup +$0.65.",
  es:"☕ <b>Café</b> (12 oz / 16 oz): Revelation (4 shots de espresso + crema dulce, 12 oz) $5.50 · Land of Milk &amp; Honey Latte $6.25/$7.25 · Psalms (house brew de chocolate y frambuesa) $5.50/$6.25 · Signature House Brew (trufa de caramelo) $5.50/$6.25 · O.G. Latte $6.25/$7.25 · The Vine (de temporada: melón, té de menta marroquí y miel) $6.25/$7.25.<br>Cambio de leche (entera orgánica, almendra, almendra y coco) +$1.00 · sirope de chocolate blanco o de la casa +$0.65."},
 bakery:{en:"🧁 <b>Bakery</b> (half dozen / dozen, baked fresh to order): Proverbs 31 Cupcakes (blueberry, lemon buttercream) $25/$35 · Lion of Judah Espresso Cupcakes $28/$40 · Strawberry Crinkles $13/$18 · Classic Vanilla Bean Chocolate Chip $10.50/$15 · The Love Brownie Tray (white chocolate ganache &amp; strawberries, 8x8) $20.",
  es:"🧁 <b>Panadería</b> (media docena / docena, horneado al momento): Cupcakes Proverbs 31 (arándano, buttercream de limón) $25/$35 · Cupcakes de Espresso Lion of Judah $28/$40 · Crinkles de Fresa $13/$18 · Vainilla con Chispas de Chocolate $10.50/$15 · Bandeja Love Brownie (ganache de chocolate blanco y fresas, 8x8) $20."},
 delivery:{en:"🚗 <b>Batch delivery</b> by pre-order to Las Vegas, North Las Vegas, the Strip, Summerlin and Henderson. A delivery run goes out once about 10 orders are lined up — tell us your preferred day and time and we text you to confirm. No delivery fee and no tax: the menu price is the total.",
  es:"🚗 <b>Entregas por lotes</b> con pedido previo en Las Vegas, North Las Vegas, el Strip, Summerlin y Henderson. Salimos a entregar cuando se juntan unos 10 pedidos — díganos su día y hora preferidos y le confirmamos por texto. Sin cargo de entrega ni impuestos: el precio del menú es el total."},
 allergy:{en:"We only have the ingredients listed on the menu (many are organic). For allergies or gluten-free needs, please ask and the owners will confirm by text before you order — we never want to guess.",
  es:"Solo tenemos los ingredientes que aparecen en el menú (muchos son orgánicos). Para alergias o sin gluten, pregúntenos y los dueños le confirman por texto antes de ordenar — no queremos adivinar."},
 contact:{en:"You can pre-order on <a href='"+BAKESY+"' target='_blank' rel='noopener'>Bakesy</a>, call <a href='"+TELH+"'>"+TEL+"</a>, email destinycafe7@gmail.com, or place an order request right here.",
  es:"Puede ordenar en <a href='"+BAKESY+"' target='_blank' rel='noopener'>Bakesy</a>, llamar al <a href='"+TELH+"'>"+TEL+"</a>, escribir a destinycafe7@gmail.com o hacer su pedido aquí mismo."},
 unknown:{en:"Great question! I want to be sure we give you the right answer, so the owners will confirm that by text. Want to leave your name and number, or call "+TEL+"?",
  es:"¡Buena pregunta! Queremos darle la respuesta correcta, así que los dueños se lo confirman por texto. ¿Desea dejar su nombre y número, o llamar al "+TEL+"?"}};
var STEPS=[{k:"name",en:"Wonderful! What name should we put the order under?",es:"¡Perfecto! ¿A nombre de quién ponemos el pedido?"},
 {k:"phone",en:"What's the best phone number to text you the confirmation?",es:"¿A qué número le enviamos la confirmación por texto?"},
 {k:"items",en:"What would you like (items, sizes, how many)?",es:"¿Qué le gustaría ordenar (productos, tamaños, cantidad)?"},
 {k:"when",en:"Pickup on Tuesday 11/10 (8 AM–12 PM, Farm &amp; Tenaya), or batch delivery? If delivery, which area and preferred day/time?",es:"¿Recogida el martes 11/10 (8 AM–12 PM, Farm y Tenaya) o entrega? Si es entrega, ¿en qué zona y qué día/hora prefiere?"}];
var flow=null, order={}, el={}, history=[];

function css(){} 
function build(){
 var b=document.createElement('button');b.className='dc-launch';b.type='button';b.innerHTML='<span class="dc-dot"></span><span class="dc-lt"></span>';b.onclick=toggle;el.launch=b;
 var w=document.createElement('div');w.className='dc-win';w.setAttribute('role','dialog');
 w.innerHTML='<div class="dc-head"><img src="assets/logo.png" alt=""><div><b class="dc-t"></b><small class="dc-s"></small></div><button type="button" class="dc-x">×</button></div>'+
  '<div class="dc-badge"></div><div class="dc-msgs" aria-live="polite"></div><div class="dc-chips"></div>'+
  '<form class="dc-form"><input class="dc-in" autocomplete="off"><button class="dc-send" type="submit"></button></form>';
 document.body.appendChild(w);document.body.appendChild(b);el.win=w;
 el.msgs=w.querySelector('.dc-msgs');el.chips=w.querySelector('.dc-chips');el.in=w.querySelector('.dc-in');
 w.querySelector('.dc-x').onclick=toggle;
 w.querySelector('.dc-form').onsubmit=function(e){e.preventDefault();var v=el.in.value.trim();if(!v)return;el.in.value='';handle(v);};
 relabel();
 new MutationObserver(relabel).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
}
function relabel(){var t=T[L()];el.launch.querySelector('.dc-lt').textContent=t.launch;el.launch.setAttribute('aria-label',t.launch);
 el.win.setAttribute('aria-label',t.title);el.win.querySelector('.dc-t').textContent=t.title;el.win.querySelector('.dc-s').textContent=t.sub;
 el.win.querySelector('.dc-x').setAttribute('aria-label',t.close);el.in.placeholder=t.ph;el.in.setAttribute('aria-label',t.ph);
 el.win.querySelector('.dc-send').textContent=t.send;var bd=el.win.querySelector('.dc-badge');bd.textContent=CHAT_API_URL?'':t.preview;bd.style.display=CHAT_API_URL?'none':'';chips();}
function chips(){var t=T[L()];el.chips.innerHTML='';t.chips.forEach(function(c){var x=document.createElement('button');x.type='button';x.textContent=c;x.onclick=function(){handle(c)};el.chips.appendChild(x);});}
function add(who,html){var m=document.createElement('div');m.className='dc-m dc-'+who;m.innerHTML=html;el.msgs.appendChild(m);el.msgs.scrollTop=el.msgs.scrollHeight;history.push({role:who==='me'?'user':'assistant',text:m.textContent});}
function esc(s){return s.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function toggle(){var o=el.win.classList.toggle('open');el.launch.classList.toggle('hide',o);if(o){if(!el.msgs.children.length)add('them',T[L()].hello);setTimeout(function(){el.in.focus()},50);}}
window.openDestinyChat=function(){if(!el.win.classList.contains('open'))toggle();else el.in.focus();};

function intent(q){q=q.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 if(/order|pedido|ordenar|comprar|reserv|i want|i'd like|quiero|quisiera/.test(q))return'order';
 if(/winter|invierno|nov|11\/10|tuesday|martes|pickup|recog|peppermint|menta|focaccia|biscuit|sourdough|masa madre|brownie|farm|tenaya/.test(q))return'winter';
 if(/deliver|entrega|domicilio|summerlin|henderson|strip|fee|cargo|envio/.test(q))return'delivery';
 if(/allerg|alerg|gluten|vegan|dairy|lact|nut|nuez|mani|ingredient/.test(q))return'allergy';
 if(/regular|menu|price|precio|cuanto|how much|cost/.test(q))return'menu';
 if(/coffee|cafe|latte|brew|espresso|drink|bebida|milk|leche|syrup|sirope|vine|psalm|revelation/.test(q))return'coffee';
 if(/cupcake|cookie|galleta|crinkle|bakery|panaderia|dozen|docena|proverb|judah|love/.test(q))return'bakery';
 if(/phone|call|llam|telefono|bakesy|email|contact|where|donde|address|direccion|hour|horario/.test(q))return'contact';
 if(/^(hi|hello|hey|hola|buenas|buenos)/.test(q))return'hi';
 return'unknown';}
function handle(v){add('me',esc(v));var l=L();
 if(flow!==null){order[STEPS[flow].k]=v;flow++;
  if(flow<STEPS.length){reply(STEPS[flow][l]);return;}
  flow=null;var s=(l==='es'?"<b>Resumen de su pedido:</b>":"<b>Your order request:</b>")+"<br>"+["name","phone","items","when"].map(function(k){return esc(order[k])}).join("<br>");
  reply(s);submit(order,l);return;}
 var i=intent(v);
 if(i==='order'){flow=0;order={};reply(STEPS[0][l]);return;}
 if(i==='menu'){reply(A.coffee[l]);reply(A.bakery[l],1);return;}
 if(i==='hi'){reply(T[l].hello);return;}
 if(i==='unknown'&&CHAT_API_URL){live(v,l);return;}
 reply(A[i][l]);}
function reply(h,extra){setTimeout(function(){add('them',h)},350+(extra?400:0));}
function submit(o,l){
 var done=l==='es'?"¡Gracias! Los dueños le enviarán un texto para confirmar su pedido, el total y el día. Que Dios le bendiga 💜":"Thank you! The owners will text you to confirm your order, total and day. God bless you 💜";
 if(!CHAT_API_URL){console.info('[Destiny Chat] preview mode — would POST to CHAT_API_URL/order:',o);
  reply(done+"<br><small class='dc-note'>"+(l==='es'?"(Vista previa: al publicar, este pedido se enviará por texto a los dueños.)":"(Preview: once published, this request is texted to the owners.)")+"</small>",1);return;}
 fetch(CHAT_API_URL+'/order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({lang:l,order:o,page:location.href})})
  .then(function(r){reply(r.ok?done:A.unknown[l],1)}).catch(function(){reply(A.contact[l],1)});}
function live(v,l){fetch(CHAT_API_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({lang:l,message:v,history:history.slice(-12)})})
 .then(function(r){return r.json()}).then(function(d){add('them',esc(d.reply||'')||A.unknown[l])}).catch(function(){reply(A.unknown[l])});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
