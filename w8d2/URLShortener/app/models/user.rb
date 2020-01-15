class User < ApplicationRecord
    validate :email, presence: true 

    
end