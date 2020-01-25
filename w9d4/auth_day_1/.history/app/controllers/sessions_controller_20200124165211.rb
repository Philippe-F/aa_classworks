class SessionsController < ApplicationController
  def create
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

  end

  private
  def session_params
    params.require(:user).permit(:username, :password)
  end
end
