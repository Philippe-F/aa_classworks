# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class User < ApplicationRecord
    validates :name, presence: true

    has_many :instructor,
        class_name: "Course",
        foreign_key: :instructor_id,
        primary_key: :id
    
    has_many :enrollments,
        class_name: "Enrollment",
        foreign_key: :student_id,
        primary_key: :id

    has_many :enrolled_courses,
        through: :enrollments,
        source: :course
    
end
