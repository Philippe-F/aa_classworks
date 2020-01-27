class SessionsController < ApplicationController
  def new
    render :new
  end

  def create
    user = User.find_by_cred(params[:user][:email],params[:user][:password]) 
    
  end

  def destroy
  end
end
