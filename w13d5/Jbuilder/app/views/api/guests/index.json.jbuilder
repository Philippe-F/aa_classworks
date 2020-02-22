require 'byebug'

# json.array! @guests do |guest|
#   json.name guest.name
# end 
json.array! @guests, :name
