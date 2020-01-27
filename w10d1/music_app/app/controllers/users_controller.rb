class UsersController < ApplicationController

  def new
    @user = User.new 
    render :new
  end

  def create
    @user = User.new(user_params)

    if @user.save 
      login(@user) 
      redirect_to user_url(@user.id) 
    else 
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end 
  end

  def edit
    @user = User.find_by(id: params[:id]) 
    render :edit 
  end

  def update
    @user = User.find_by(id: params[:id]) 

    if @user.update_attributes(user_params) 
      redirect_to user_url(@user.id) 
    else 
      flash[:errors] = @user.errors.full_messages
    end 
  end

  def show
    @user = User.find_by(id: params[:id])
    render :show
  end 

  def destroy
    @user = User.find_by(id: params[:id]) 
    @user.destroy
    redirect_to session_url 
  end

  private 
  def user_params
    params.require(:user).permit(:email, :password) 
  end 
end
