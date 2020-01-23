class ArtworkShare < ApplicationRecord

    validates :artwork_id, :viewer_id, presence: true
    validates :artwork_id, uniqueness: { scope: :viewer_id, message: "I'm the Error!" }

    belongs_to :artwork,
        foreign_key: :artwork_id,
        primary_key: :id,
        class_name: :Artwork

    belongs_to :viewer,
        foreign_key: :viewer_id,
        primary_key: :id,
        class_name: :User

end 
# == Schema Information
#
# Table name: artwork_shares
#
#  id         :integer(8)      not null, primary key
#  artwork_id :integer(4)      not null
#  viewer_id  :integer(4)      not null
#  created_at :datetime        not null
#  updated_at :datetime        not null
#

