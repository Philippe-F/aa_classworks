class Comment < ApplicationRecord

# == Schema Information
#
# Table name: comments
#
#  id         :integer(8)      not null, primary key
#  body       :text            not null
#  user_id    :integer(4)      not null
#  artwork_id :integer(4)      not null
#  created_at :datetime        not null
#  updated_at :datetime        not null

    validates :body, :user_id, :artwork_id, presence: true 

    belongs_to :author,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :artwork,
        primary_key: :id,
        foreign_key: :artwork_id,
        class_name: :Artwork

end 