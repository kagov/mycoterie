var socket = io();

var chats = [];

var bChats = [];

var isBrin = function() {
    return window.location.href.includes('chat');
}

$(document).ready(function(){
    if(isBrin()) {
        var chatsStr = localStorage.getItem("bChats");
        bChats = JSON.parse(chatsStr);
        if (bChats == null) {
            bChats = [];
        }
        for (var i = 0; i < bChats.length; i++) {
            var chat = bChats[i];
            addChatBubble(chat.msg,chat.type);
        }    
    }
    else {
        var chatsStr = localStorage.getItem("chats");
        chats = JSON.parse(chatsStr);
        if (chats == null) {
            chats = [];
        }
        for (var i = 0; i < chats.length; i++) {
            var chat = chats[i];
            addChatBubble(chat.msg,chat.type);
        }    
    }
    
});

if(isBrin()) {
    socket.on('message_from_kaushik', function(msg){

        console.log("message from kaushik-- ",msg);
        addChatBubble(msg,'agentBubble');    
        var chat = {
            type : 'agentBubble',
            msg : msg
        }
        bChats.push(chat)
        localStorage.setItem("bChats", JSON.stringify(bChats));
    });    
}
else {
    socket.on('message_from_brin', function(msg){

        console.log("message from brin-- ",msg);    
        addChatBubble(msg,'agentBubble');
        var chat = {
            type : 'agentBubble',
            msg : msg
        }
        chats.push(chat)
        localStorage.setItem("chats", JSON.stringify(chats));
    });
}


// click listeners
function sendClick() {

    var text = document.getElementById('chat_input_box').value;
    if (text == null || text === '') {
        return;
    }
    addChatBubble(text,'chasitorBubble');
    var chat = {
        type : 'chasitorBubble',
        msg : text
    }
    
    document.getElementById('chat_input_box').value = '';
    
    if (isBrin()) {
        socket.emit('chat_brin', text);
        console.log("href-- ",window.location.href);
        bChats.push(chat)
        localStorage.setItem("bChats", JSON.stringify(bChats));
    }
    else {
        socket.emit('chat_message', text);
        chats.push(chat)
        localStorage.setItem("chats", JSON.stringify(chats));
    }
}


function addChatBubble(messageText, type) {
    var chasitorBubble = document.createElement('div');
    chasitorBubble.classList.add('chat-bubble' , type);

    var messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message';

    var message = document.createElement('p');
    message.innerHTML = messageText;

    messageDiv.appendChild(message);
    chasitorBubble.appendChild(messageDiv);

    let chatContainer = document.getElementById('chat-container');
    chatContainer.appendChild(chasitorBubble);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}