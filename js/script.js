const { createApp } = Vue;

const { DateTime } = luxon;

createApp({
    data() {
        return {
            contacts: [
                {
                    name: 'Michele',
                    avatar: './img/avatar_1',
                    visible: true,
                    online: '',
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: './img/avatar_2',
                    visible: true,
                    online: '',
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: './img/avatar_3',
                    visible: true,
                    online: '',
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: './img/avatar_4',
                    visible: true,
                    online: '',
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: './img/avatar_5',
                    visible: true,
                    online: '',
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: './img/avatar_6',
                    visible: true,
                    online: '',
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: './img/avatar_7',
                    visible: true,
                    online: '',
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: './img/avatar_8',
                    visible: true,
                    online: '',
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],
            openedChatIndex : 1,
            newMessage: '',
            searching: '',
            botAnswers: ['Ok', 'Va bene!', 'Non ti preoccupare', 'Contami'],         
        }
    },
    methods: {
        changeChatOpened: function(index){
            this.newMessage='';
            this.openedChatIndex= index;
            this.$nextTick(() => {
                this.$refs.writeMessage.focus();
            })
        },
        sendMessage: function(){
            if (this.newMessage.trim().length > 0 ) {
                let person = this.contacts[this.openedChatIndex];
                let newMsg = {date: luxon.DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss'), message: this.newMessage, status: 'sent'};
                person.messages.push(newMsg);
                this.newMessage='';

                // scroll down to see the new messsage
                this.$nextTick(() => {
                    this.scrollDown();
                });

                // set the status to "writing"
                person.online = 'Sta scrivendo...'

                // message from the bot
                setTimeout(() => {
                    let content = this.botAnswers[Math.floor(Math.random()*this.botAnswers.length)]
                    let received = { date: luxon.DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss'), message: content, status: 'received' };
                    person.messages.push(received);
                    this.$nextTick(() => {
                        this.scrollDown();

                        // set the status to online
                        person.online = 'Online'
                    });
                }, 1000);

    
                this.sortChats();
                this.openedChatIndex = 0;

                // set the status to the last seen
                setTimeout(() => {
                    person.online = 'Last seen on ' + DateTime.now().toFormat('HH:mm')
                }, 3000);                
            }
        },
        searchingChat: function(person){
            return (person.name.toLowerCase().indexOf(this.searching.toLowerCase()) > -1);
        },
        formatDateTime: function(date) {
            return DateTime.fromFormat(date, 'dd/MM/yyyy HH:mm:ss').toFormat('HH:mm');
        },
        deleteMessage: function(index) {
            this.contacts[this.openedChatIndex].messages.splice(index,1)
        },
        sortChats: function(){
            this.contacts.sort((a, b) => {
                const dateA = DateTime.fromFormat(a.messages[a.messages.length - 1].date, 'dd/MM/yyyy HH:mm:ss');
                const dateB = DateTime.fromFormat(b.messages[b.messages.length - 1].date, 'dd/MM/yyyy HH:mm:ss');
                return dateB - dateA;
            });
        },
        scrollDown: function(){
            const scrollableElement = document.getElementById('messages');
            scrollableElement.scrollTo({
                top: scrollableElement.scrollHeight,
                behavior: 'smooth',
            });
        },
        convertTheDate: function(date){
            let now = luxon.DateTime.now().toFormat('dd/MM/yyyy');
            day = DateTime.fromFormat(date, 'dd/MM/yyyy HH:mm:ss').toFormat('dd/MM/yyyy');
            if (day == now) {
                return DateTime.fromFormat(date, 'dd/MM/yyyy HH:mm:ss').toFormat('HH:mm');
            } else if (this.isYesterday(date)) {
                return 'yesterday';
            } else {
                return day;
            }
        },
        isYesterday: function(dateStr) {
            const inputDate = DateTime.fromFormat(dateStr, 'dd/MM/yyyy HH:mm:ss');
            const yesterday = DateTime.now().minus({ days: 1 }).startOf('day');
            const today = DateTime.now().startOf('day');
        
            return inputDate >= yesterday && inputDate < today;
        }
        
    },
    mounted() {
        this.sortChats();
        this.contacts.forEach(contact => {
            lastSeen = contact.messages[contact.messages.length-1].date;
            contact.online = this.convertTheDate(lastSeen);
        });
    }
}).mount('#app');