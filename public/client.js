var socket = io();

var statusMessage = document.getElementById('status-message');

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

var connectionCount = document.getElementById('connection-count');

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

var yourVote = document.getElementById("count")

socket.on('voteCount', function (votes) {
  if (votes["A"] === 1) {
    yourVote.innerHTML = ("<div>" + "A " + votes["A"] + "</div>");
  }
  else if (votes["B"] === 1) {
    yourVote.innerHTML = ("<div>" + "B " + votes["B"] + "</div>");
  } else if (votes["C"] === 1) {
    yourVote.innerHTML = ("<div>" + "C " + votes["C"] + "</div>");
  } else {
    yourVote.innerHTML = ("<div>" + "D " + votes["D"] + "</div>");
  }
});

var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}
