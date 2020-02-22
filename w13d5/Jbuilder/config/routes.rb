Rails.application.routes.draw do
  # Your routes here!

  namespace :api, defaults: { format: :json } do
    resources :guests, only: [:index, :show] do
      resources :gifts, only: [:index, :show] 
    end
  end 
end


# bundle exec rails routes
#          Prefix Verb URI Pattern                               Controller#Action
# api_guest_gifts GET  /api/guests/:guest_id/gifts(.:format)     api/gifts#index {:format=>:json}
#  api_guest_gift GET  /api/guests/:guest_id/gifts/:id(.:format) api/gifts#show {:format=>:json}
#      api_guests GET  /api/guests(.:format)                     api/guests#index {:format=>:json}
