const Util = require('./util.js');

class FollowToggle{
  constructor(el) {
    this.userId = el.data('user-id');
    this.followState = el.data('initial-follow-state');
    this.element = el;
    this.render();
    this.handleClick();
  }

  render() {
    if (this.followState === 'unfollowed'){
      console.log('unfollowed');
      $(this.element).text('Follow');
    } else {
      console.log('followed');
      $(this.element).text('Unfollow');
    }
  }

  handleClick() {
    const context = this;
      $(this.element).click( (event) => {
      event.preventDefault();
      if (context.followState === 'followed') {
        Util.unfollow.bind(context)();
      } else {
        Util.follow.bind(context)();
      }
      this.render();
    })
  }
}


module.exports = FollowToggle;