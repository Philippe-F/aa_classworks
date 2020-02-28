class Api::UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @user = User.find_by(id: params[:id])
  end

  def create
    @user = user.new(user_params)

    if @user.save
      login(@user)
      redirect_to users_url
    else
      render json: ["invalid username or password"]
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
