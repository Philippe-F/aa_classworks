class ShortenedUrl < ApplicationRecord
    validates :long_url, :short_url presence: true 

    def self.random_code
        loop do
            short_url = SecureRandom::urlsafe_base64(16) 
            return short_url unless ShortenedUrl.exists?(:short_url => short_url) 
        end 
    end 
end