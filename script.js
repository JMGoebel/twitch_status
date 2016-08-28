/*global $, console */

function buildCard(data, action) {
  'use strict';

  var html = '',
      status;

  if (data.stream === null) {
    status = "Offline";
  } else {
    status = "Online";
  }

  if (action === 0) {
    html += "<div class='cards'>";
    html +=   "<div class='logo' style='background-image: url(" + data.logo + ")'>";
    html +=   "</div>";
    html +=   "<div class='information'>";
    html +=     "Name: <em>" + data.display_name + "</em><br>";
    html +=     "Game: <em>" + data.game + "</em><br>";
    html +=     "Followers: <em>" + data.followers + "</em><br>";
    html +=     "url: <em><a href='" + data.url + "'>" + data.url + "</a></em><br>";
    html +=     "Status: <em>" + status + "</em>";
    html += "</div>";

    return html;
  } else if (action === 1 && status === "Online") {
    html += "<div class='cards'>";
    html +=   "<div class='logo' style='background-image: url(" + data.logo + ")'>";
    html +=   "</div>";
    html +=   "<div class='information'>";
    html +=     "Name: <em>" + data.display_name + "</em><br>";
    html +=     "Game: <em>" + data.game + "</em><br>";
    html +=     "Followers: <em>" + data.followers + "</em><br>";
    html +=     "url: <em><a href='" + data.url + "'>" + data.url + "</a></em><br>";
    html +=     "Status: <em>" + status + "</em>";
    html += "</div>";

    return html;
  } else if (action === 2 && status === "Offline") {
    html += "<div class='cards'>";
    html +=   "<div class='logo' style='background-image: url(" + data.logo + ")'>";
    html +=   "</div>";
    html +=   "<div class='information'>";
    html +=     "Name: <em>" + data.display_name + "</em><br>";
    html +=     "Game: <em>" + data.game + "</em><br>";
    html +=     "Followers: <em>" + data.followers + "</em><br>";
    html +=     "url: <em><a href='" + data.url + "'>" + data.url + "</a></em><br>";
    html +=     "Status: <em>" + status + "</em>";
    html += "</div>";

    return html;
  }
}

function query (channel_list, action) {
  var channelData = [],
    pullChannel = 'https://api.twitch.tv/kraken/channels/',
    pullStream = 'https://api.twitch.tv/kraken/streams/',
    client_id = 'fnp03zxl6kktdbte1vp01h5wk4y65aj';


  // Build ChannelData
  channel_list.forEach(function (user) {

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


        channelData[user] = data;

        // check for stream
         $.getJSON(pullStream + user, {
          client_id: client_id
          })
            .done(function (data) {

              channelData[user].stream = data.stream;
               $("#data").append(buildCard(channelData[user], action));
            });
    });
  });

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
                  "comster404"];


  // Initialize
  $('li:first-child()').addClass('active');
  query(channels, 0);

  // Page interaction
  $('li').click(function () {
    $('li').removeClass('active');
    $(this).addClass('active');
  });

  $('#query_all').click(function () {
    $('#data').empty();
    query(channels, 0);
  });

  $('#query_online').click(function () {
    $('#data').empty();
    query(channels, 1);
  });

  $('#query_offline').click(function () {
    $('#data').empty();
    query(channels, 2);
  });

  $('#error_container').on('click', '.error_close', function () {
    $(this).parent().fadeOut();
  });

});
