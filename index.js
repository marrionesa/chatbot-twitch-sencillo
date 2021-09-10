// Dependencia de TMI cogiendo configuracion del archivo que creamos config.json
const tmi = require('tmi.js'),
    { channel, username, password } = require('./config.json');
	
	
// Valores 
const options = {
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true
    },
    identity : {
        username,
        password
    },
    channels: [channel]
};

// TMI que instalamos para poder conectar a Twitch
const client = new tmi.Client(options);
client.connect().catch(console.error);


// Mensaje de bienvenida a nuevos usuarios que se conectan al chat. ejemplo:
client.on('connected', () => {
    client.say(channel, `${username}, Bienvenido al chat de mi canal -> ${channel}!`);
});

client.on('message', (channel, user, message, self) => {
    if(self) return;
	
	
// Aqui forzamos la respuesta cada vez que detecte en los mensajes que envian X palabra ejemplo:
    if(message.includes("pruebaXpalabra")) {
        client.say(channel, `Recibido. Respondiendo`);
    }
	
	
// Cada vez que detecte la palabra fija X que queramos respondera con la respuesta que añadamos. ejemplo:
	    if(message == 'hola') {
	        client.say(channel, `@${user.username}, Hola vampir@!!`);
	    }
	
	
// Lo mismo pero aqui lo usamos para crear tipo comandos  !youtube !twitch !patreon y responder a ello.
    if(message == '!comandos') {
        client.say(channel, `${username}, !youtube - !twitch - !patreon - !redes`);
    }
	
	
    if(message == '!youtube') {
        client.say(channel, `${username}, Únete en https://youtube.com/hannel/UCFvCUyhMCCl-jC_0nYWwGrA`);
    }

    if(message == '!twitch') {
        client.say(channel, `${username} Únete en https://twitch.tv/marrionesa`);
    }

    if(message == '!patreon') {
        client.say(channel, `${username} Únete en https://patron.com/marrionesa`);
    }
	
    if(message == '!redes') {
        client.say(channel, `${username} puedes ver mi contenido en: -->
			\n Twitch: https://twitch.tv/marrionesa \n 
			|| \n Youtube: https://www.youtube.com/channel/UCFvCUyhMCCl-jC_0nYWwGrA \n
			|| Patreon: https://patreon.com/marrionesa`);
    }
	
});


