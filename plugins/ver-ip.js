/**
[ By @NeKosmic || https://github.com/NeKosmic/ ]
**/
let handler=async(e,{conn:i,args:o})=>{if(!o[0])return e.reply("*[ ! ] Introduzca una direcci\xf3n IP*");if(!o[0].includes("19"))return e.reply('*[ ! ] Use una direcci\xf3n IP valida de clase "C" !*');let n=e.mentionedJid&&e.mentionedJid[0]?e.mentionedJid[0]:e.fromMe?i.user.jid:e.sender,t;await e.reply(MultiNK.Bsqd(await i.getName(e.sender)));try{let r=await fetchJson(`https://latam-api.vercel.app/api/verip?apikey=${MyApiKey}&q=${o[0]}`);if(!r.continente.nombre)return e.reply("No pude encontrar ninguna informaci\xf3n para esta direcci\xf3n IP ;-;");i.sendMessage(e.chat,{caption:`πΊοΈ INFO DE DIRECCION IP
π Solicitado por : @${n.replace(/@.+/,"")}`,footer:`${NombreDelBot} π₯`,location:{degreesLatitude:r.latitud,degreesLongitude:r.longitud},buttons:[{buttonId:"</bromita>",buttonText:{displayText:`[ INFORMACI\xd3N ]
\`\`\`
β’ Direcci\xf3n IP : ${r.ip}
β’ Dispositivo mobil : ${r.mobil?"[β]":"[X]"}
β’ Continente : ${r.continente.nombre}
β’ Codigo de continente : ${r.continente.codigo}
β’ Pais : ${r.pais.nombre}
β’ Codigo de pais : ${r.pais.codigo}
β’ Nombre de regi\xf3n : ${r.region.nombre}
β’ C\xf3digo de Region : ${r.region.codigo}
β’ Ciudad : ${r.ciudad}
β’ Distrito : ${r.distrito?r.distrito:"No encontrado u.u"}
β’ Codigo postal : ${r.ZIP?r.ZIP:"No encontrado u.u"}
β’ Latitud : ${r.latitud}
β’ Longitud : ${r.longitud}
β’ Zona horaria : ${r.zonaHoraria}
β’ Offset : ${r.offset}
β’ Moneda local : ${r.divisa}
β’ Proveedor de internet : ${r.isp}
β’ Organizaci\xf3n : ${r.organizacion}
β’ Sociedad : ${r.as} 
β’ DNS : ${r.reverse?r.reverse:"No encontrado u.u"}
β’ Servidor proxy : ${r.proxy?"[β]":"[X]"}
β’ Alojamiento web : ${r.hosting?"[β]":"[X]"}
\`\`\``},type:1}],headerType:"LOCATION",mentions:[e.sender]})}catch(a){e.reply(MultiNK.Error0())}};handler.help=["verip"].map(e=>e+" <IP>"),handler.tags=["busqueda"],handler.command=/^(verip)$/i,handler.limit=!0;export default handler;
