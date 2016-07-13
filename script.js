/*global $, console */

$(document).ready(function () {
  'use strict';

  var twitchAPI = 'https://api.twitch.tv/kraken/channels/test_channel',
    client_id = 'fnp03zxl6kktdbte1vp01h5wk4y65aj';

  $.getJSON(twitchAPI, {
    client_id: client_id
  })
    .fail(function (data) {
      console.error("Retrieval from twitch has failed.", data);
    })
    .done(function (data) {
      console.log(data);
    });
});

// cid: fnp03zxl6kktdbte1vp01h5wk4y65aj
