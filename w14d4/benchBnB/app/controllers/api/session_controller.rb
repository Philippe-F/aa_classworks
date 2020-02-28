class Api::SessionController < ApplicationController
    def create
        @user = User.find_by_credentials(params[:user][:username], params[:user][:password])

        if @user
          login(@user)
        else 
          render json: ["Invalid username or password"]
        end 
    end

    def destroy
      if current_user
        logout
      else
        render json: ["There is no user to logout"] 
      end 
    end
end
