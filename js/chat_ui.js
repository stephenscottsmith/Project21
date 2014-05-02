function divEscapedContentElement(message) {
    messageAndName = 'Me: ' + message;
    return $('<div style = "color:#0000FF"></div>').text(messageAndName);
}

function divSystemContentElement(message) {
    return $('<div></div>').html('<i>' + message + '</i>');
}

function processUserInput(chatApp, socket) {
    var message = $('#send-message').val();
    var systemMessage;
    if (message.charAt(0) == '/') {
        systemMessage = chatApp.processCommand(message);
        if (systemMessage) {
            $('#messages').append(divSystemContentElement(systemMessage));
        }
    } else {
        chatApp.sendMessage($('#room').text(), message);
        $('#messages').append(divEscapedContentElement(message));
        $('#messages').scrollTop($('#messages').prop('scrollHeight'));
    }
    $('#send-message').val('');
}

var socket = io.connect();
var loadChat = function () {
    var chatApp = new Chat(socket);
    socket.on('nameResult', function (result) {
        var message;
        if (result.success) {
            message = 'You are now known as ' + result.name + '.';
        } else {
            message = result.message;
        }
        $('#messages').append(divSystemContentElement(message));
    });
    socket.on('joinResult', function (result) {
        $('#room').text(result.room)
        $('#messages').append(divSystemContentElement('Room changed.'));
    });
    socket.on('message', function (message) {
        var newElement = $('<div></div>').text(message.text);
        $('#messages').append(newElement);
    });
    socket.on('rooms', function (rooms) {
        $('#room-list').empty();
        for (var room in rooms) {
            room = room.substring(1, room.length);
            if (room != '') {
                $('#room-list').append(divSystemContentElement(room));
            }
        }
        $('#room-list div').click(function () {
            chatApp.processCommand('/join ' + $(this).text());
            $('#send-message').focus();
        });
    });
    setInterval(function () {
        socket.emit('rooms');
    }, 1000);
    $('#chatSend').click(function () {
        processUserInput(chatApp, socket);
        return false;
    });

}
    /*$('#send-message').focus();
    $('#send-form').submit(function () {
        alert(1);
        processUserInput(chatApp, socket);
        return false;
    });*/