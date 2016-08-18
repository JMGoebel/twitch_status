/*global $, console */

function displayData(data) {
  'use strict';
  $("#display").text(data);
  console.log(data);
}

function addStream(channels) {
  'use strict';

  var pullStreams = 'https://api.twitch.tv/kraken/streams/',
    client_id = 'fnp03zxl6kktdbte1vp01h5wk4y65aj',
    channelData = {};

  channels.forEach(function (user, index) {
    $.getJSON(pullStreams + user, {
      client_id: client_id
    })
      .fail(function (data) {
        if (data.status === 422) {
          console.error("User no longer exist.", data);
          $("#error_container").append("<div class='error'> <div class='error_close'>X</div> ATTENTION: " + data.responseJSON.message + "</div>");
        } else {
          console.error("Retrieval from twitch has failed.", data);
        }
      })
      .done(function (data) {
        channelData[index] = data;
      });
  });

  displayData(channelData);
}

$(document).ready(function () {
  'use strict';

  $('li:first-child()').addClass('active');

  var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

  addStream(channels);

  $('li').click(function () {
    $('li').removeClass('active');
    $(this).addClass('active');
  });

  $('#error_container').on('click', '.error_close', function () {
    $(this).parent().fadeOut();
  });


});

// cid: fnp03zxl6kktdbte1vp01h5wk4y65aj

