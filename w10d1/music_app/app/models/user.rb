class User < ApplicationRecord

    validates :email, :password_digest, presence: true, uniqueness: true
    validates :session_token, presence: true 
    validates :password, length: { minimum: 6, allow_nil: true }  
    after_initialize :ensure_session_token!
    attr_reader :password 

    def self.find_by_cred(email, password)
        user = User.find_by(email: email) 
        user && valid_password?(password) ? user : nil 
    end 

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password) 
    end 

    def valid_password?(password)
        BCrypt::Password.new(password_digest).is_password?(password) 
    end 

    def reset_session_token!
        self.session_token = SecureRandom.urlsafe_base64 
        self.save
        self.session_token
    end 

    private 
    def ensure_session_token!
        self.session_token ||= SecureRandom.urlsafe_base64 
    end 
end
