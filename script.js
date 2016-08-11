/*global $, console */

function displayData(data) {
  'use strict';
  $("#display").text(data.follows);

}

function addStream(followerData) {
  'use strict';

  var pullStreams = 'https://api.twitch.tv/kraken/streams/',
    client_id = 'fnp03zxl6kktdbte1vp01h5wk4y65aj';

  followerData.follows.forEach(function (user, index) {
    var userName = user.channel.display_name;

    $.getJSON(pullStreams + userName, {
      client_id: client_id
    })
      .fail(function (data) {
        console.error("Retrieval from twitch has failed.", data);
      })
      .done(function (data) {
        followerData.follows[index].stream = data.stream;
      });
  });

  displayData(followerData);
}

function gatherChannels(userName) {
  'use strict';

  var twitchAPI = 'https://api.twitch.tv/kraken/users/' + userName + '/follows/channels',
    client_id = 'fnp03zxl6kktdbte1vp01h5wk4y65aj';

  $.getJSON(twitchAPI, {
    client_id: client_id
  })
    .fail(function (data) {
      console.error("Retrieval from twitch has failed.", data);
    })
    .done(function (data) {
      addStream(data);
    });
}

$(document).ready(function () {
  'use strict';

  $('li:first-child()').addClass('active');

  gatherChannels("jmgoebel03");

  $('li').click(function () {
    $('li').removeClass('active');
    $(this).addClass('active');
  });


});

// cid: fnp03zxl6kktdbte1vp01h5wk4y65aj

