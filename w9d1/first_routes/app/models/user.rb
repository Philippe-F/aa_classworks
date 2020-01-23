class User < ApplicationRecord

    validates :username, presence: true, uniqueness: true 

    has_many :artworks, 
        dependent: :destroy,
        foreign_key: :artist_id, 
        primary_key: :id, 
        class_name: :Artwork  

    has_many :shares,
        dependent: :destroy,
        foreign_key: :viewer_id,
        primary_key: :id,
        class_name: :ArtworkShare

    has_many :shared_artworks,
        through: :shares,
        source: :artwork

    has_many :comments,
        dependent: :destroy,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :Comment

end 
# == Schema Information
#
# Table name: users
#
#  id         :integer(8)      not null, primary key
#  created_at :datetime        not null
#  updated_at :datetime        not null
#  username   :string          not null
#

