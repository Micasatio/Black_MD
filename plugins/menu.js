import db from '../lib/database.js'
import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import { plugins } from '../lib/plugins.js'
import fetch from 'node-fetch';
import { generateWAMessage } from "@adiwajshing/baileys"
import * as fs from 'fs'
let tags = {
  //'contenido': 'Principal',
  'conversor': '_CONVERSORES :_',
  'animeuwu': '_ANIME :_',
  'casual': '_CMDS-CASUAL :_',
  'propietario': '_CMDS DUEΓO :_',
  'herramienta': '_HERRAMIENTAS :_',
  'premium': '_PREMIUM :_',
  'esclabot': '_SER SUB-BOT :_',
  'avanzado': '_AVANZADO :_',
  'admins': '_CMDS ADMINS :_',
  'grupos': '_CMDS GRUPOS :_',
  'fabricar': '_ARTE Y DISEΓO :_',
  'busqueda': '_BUSQUEDA :_',
  'servicio': '_SERVICIOS :_',
  'xp': '_XP & LIMITE :_',
  'games': '_RPG, JUEGOS :_',
  'random': '_PASATIEMPO :_',
  '': '_OTROS :_'
}
let handler = async (m, { conn, usedPrefix: _p, __dirname, command, isPrems }) => {
	try {
    let wimg = await fetch('https://pastebin.com/raw/GZ8d1qcT')
    let imgw = await conn.profilePictureUrl(m.sender, 'image').catch(_ => './multimedia/imagenes/avatar_contact.png')
    var wjson = await wimg.json()
    var pweb = wjson.nk_media || imgw
    var textweb = wjson.nk_txt
    } catch (e) {
    var pweb = await conn.profilePictureUrl(conn.user.jid).catch(_ => './multimedia/imagenes/avatar_contact.png')
    var textweb = ''
    }
    const message = m.reply(`_Esperate perra ahΓ­ te mando mi menΓΊ π..._ ${textweb}`)
    await message
    /**try {
    let datcov = await fetch('https://latam-api.vercel.app/api/covid19?apikey=nekosmic&q=world');
	let CovidApi = await datcov.json();
	var cotext = `βγ DATOS - COVID19 γβ
ββ² Casos positivos : ${CovidApi.casos}
ββ― Recuperados : ${CovidApi.recuperados}
ββ₯ Tratados : ${CovidApi.activo}
ββ Fallecidos : ${CovidApi.muertes}
βββββγ π γβββββ\n\n`
    } catch (e) {
    var cotext = ''
    }**/
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, level, role } = db.data.users[m.sender]
    let prem = isPrems?'Si':'No'
    let limit = isPrems?'β':db.data.users[m.sender].limit
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let uptime = timeString(process.uptime())
    let totalreg = Object.keys(db.data.users).length
    let rtotalreg = Object.values(db.data.users).filter(user => user.registered == true).length
    let help = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == conn.user.jid ? '' : `By https://wa.me/${conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limitado)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      prop: global.Propietario,
      pref: ' '+global.Prefijo+' ',
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[ URL de github invΓ‘lido ]',
      level, name, totalreg, rtotalreg, role,
      prem,
      limit,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    
    await conn.sendMessage(m.chat, {
image: {url: pweb },
caption: text.trim(),
footer: `\nββ± ${NombreDelBot}\nβββ± ${MultiNK.Habla()} β`,
buttons: [{buttonId: Prefijo+`apoyo`, buttonText: {displayText: "[ APOYO ]"}, type: 1}, {buttonId: Prefijo+`creador`, buttonText: {displayText: "[ CREADOR ]",}, type: 1}, {buttonId: Prefijo+`informacion`, buttonText: {displayText: "[ INFORMACION ]"}, type: 1}],
headerType: 4,
...{ contextInfo: { mentionedJid: [m.sender], externalAdReply: { thumbnail: fs.readFileSync('./multimedia/imagenes/logo.jpg'), sourceUrl: 'https://github.com/NeKosmic/NK-BOT-MD/fork?rgh-fork=true' }}}
}, { quoted: m }) 
reacMoji(m.chat, conn, 'π', m)
  } catch (e) {
    conn.reply(m.chat, '[ ! ] Ocurrio un error en el menΓΊ :/ ', m)
    throw e
  }
}
const defaultMenu = {
  before: `\n
βI [ \`\`\`%npmname\`\`\` ]
ββ Base de datos: %rtotalreg a %totalreg
ββ Tiempo activo: %uptime
ββ Version del bot: %version
ββ DueΓ±o del bot: %prop
ββ Prefijo ΓΊnico: γ %pref γ
ββ Cliente: %name
ββ Premium: %prem
ββ Limite restante: %limit
ββ Nivel: %level (%exp / %maxexp)
ββ Rol: %role
ββ XP: %totalexp
βββββββββββ
%readmore
~|-------------------------|~
*[_>] _COMANDOS_  β·*
~|-------------------------|~\n`.trimStart(),
  header: 'βγ %category γ\nββ­βββββββββ',
  body: 'ββ  %cmd %islimit %isPremium',
  footer: 'ββ°βββββββββ\nβββββββββββ\n',
  after: ``,
}
handler.help = ['menu']
//handler.tags = ['contenido']
handler.command = /^(menu|comandos|menΓΊ|help)$/i

handler.exp = 5

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(850)
