class SessionsController < ApplicationController
  def create
    puts session_params
    debugger
    user = User.find_by_credentials(session_params)
    if user
      login(user)
      redirect_to cats_url
    else
      flash.now[:errors] = ["Invalid username or password"]
      render :new
    end
  end

  def new
    render :new
  end

  def destroy
    self.logout
    redirect_to new_session_url
  end

  private
  def session_params
    params.require(:user).permit(:username, :password)
  end
end
