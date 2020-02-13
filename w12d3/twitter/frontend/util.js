
const Util = { 
  follow: () => {
    return $.ajax({
      method: 'POST',
      URL: `users/:user_id/follow`,
      success: () => {
        this.followState = 'followed';
        console.log("Was able to follow!");
      },
      error: () => {
        console.log("Was not able to follow!");
      }
    });
  },
  
  unfollow: () => {
    return $.ajax({
      method: 'DELETE',
      URL: `users/:user_id/follow`,
      success: () => {
        //Toggles button
        this.followState = 'unfollowed';
        console.log("Was able to unfollow");
      },
      error: () => {
        console.log("Was not able to unfollow!");
      }
    })
  }
}


module.exports = Util;