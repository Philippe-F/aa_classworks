const FollowToggle = require("./follow_toggle.js");
const Util = require('./util.js');

window.addEventListener('DOMContentLoaded', () => {

      $('button.follow-toggle').each((index, button) => {
          const tog = new FollowToggle($(button));
          tog.render();
      })
     })


