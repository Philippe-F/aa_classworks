class ApplicationController < ActionController::Base
  def login(user)
    session[:session_token] = user.reset_session_token!
    @current_user = user
  end

  def logout
    @current_user.reset_session_token!
    session[:session_token] = nil
  end

  def current_user
    @current_user ||= User.where(session_token: session[:session_token])
  end
end
