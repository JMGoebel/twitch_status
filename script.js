/*global $, console */

function buildCard(data) {
  'use strict';

   console.log(data);
  var html = '';

  html += "<div class='cards'>";
  html +=   "<div id='logo' style='background-image: url(" + data.logo + ")'>";
  html += "";
  html += "";
  html += "";
  html += "";
  html += "";
  html +=   "</div>";
  html += "</div>";


 /*   name: data.display_name,
    followers: data.followers,
    game: data.game,
    logo: data.logo,
    status: data.status,
    url: data.url,
  */

  return html;
}

function query(channels) {
  'use strict';

  var channelData = [],
    pullChannel = 'https://api.twitch.tv/kraken/channels/',
    pullStream = 'https://api.twitch.tv/kraken/streams/',
    client_id = 'fnp03zxl6kktdbte1vp01h5wk4y65aj',
    competed = 0;

  channels.forEach(function (user) {

    $.getJSON(pullChannel + user, {
      client_id: client_id
    })
      .fail(function (data) {
        if (data.status === 422) {
          $("#error_container").append("<div class='error'> <div class='error_close'>X</div> ATTENTION: " + data.responseJSON.message + " or no longer exist.</div>");
        } else {
          $("#error_container").append("<div class='error'> <div class='error_close'>X</div> ATTENTION: Retrieval error occurred.</div>");
        }
      })
      .done(function (data) {

        // add stream data
        $.getJSON(pullStream + user, {
          client_id: client_id
        })
          .fail(function (data) {

          })
          .done(function (data){

          });
        $("#data").append(buildCard(data));
      });
  });

}







function initialize() {
  'use strict';

  $('li:first-child()').addClass('active');
}

$(document).ready(function () {
  'use strict';

  var channels = ["ESL_SC2",
                  "OgamingSC2",
                  "cretetion",
                  "freecodecamp",
                  "storbeck",
                  "habathcx",
                  "RobotCaleb",
                  "noobs2ninjas",
                  "brunofin",
                  "comster404"],
    channelData = {};

  // Initialize
  initialize();

  // Build Channels
  query(channels);

  // Page interaction
  $('li').click(function () {
    $('li').removeClass('active');
    $(this).addClass('active');
  });

  $('#error_container').on('click', '.error_close', function () {
    $(this).parent().fadeOut();
  });
});

// cid: fnp03zxl6kktdbte1vp01h5wk4y65aj
/*var pullChannel = 'https://api.twitch.tv/kraken/channels/',
    pullStream = 'https://api.twitch.tv/kraken/streams/',
    client_id = 'fnp03zxl6kktdbte1vp01h5wk4y65aj',
    channelData = {},
    itemsProcessed = 0;*/
