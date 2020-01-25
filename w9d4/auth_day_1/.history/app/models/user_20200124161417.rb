class User < ApplicationRecord
  attr_reader :password

  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }


  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
  end
end
