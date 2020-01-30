class User < ApplicationRecord
    validates :username, :password, :session_token, presence: true
    validates :password_digest, presence: { message: "Password can't be blank"}
    validates :password, length: { minimum: 6, allow_nil: true}

    attr_reader :password

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        user && user.valid_password?(password) ? user :nil 
    end

    def generate_session_token
        SecureRandom::urlsafe_base64(16)
    end

    def valid_password?(password)

    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end


    private
    def user_params
        params.require(:user).permit(:username, :password_digest, :session_token)
    end
end
