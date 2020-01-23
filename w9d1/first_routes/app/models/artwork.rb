class Artwork < ApplicationRecord

# == Schema Information
#
# Table name: artworks
#
#  id         :integer(8)      not null, primary key
#  title      :string          not null
#  image_url  :string          not null
#  artist_id  :integer(4)      not null
#  created_at :datetime        not null
#  updated_at :datetime        not null
#

    validates :title, :image_url, :artist_id, presence: true
    validates :artist_id, uniqueness: { scope: :title }

    belongs_to :artist,
        foreign_key: :artist_id, 
        primary_key: :id, 
        class_name: :User 

    has_many :shares,
        foreign_key: :artwork_id,
        primary_key: :id,
        class_name: :ArtworkShare

    
    has_many :shared_viewers,
        through: :shares,
        source: :viewer

    has_many :comments,
        dependent: :destroy,
        primary_key: :id,
        foreign_key: :artwork_id,
        class_name: :Comment

end 