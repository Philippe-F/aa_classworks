Rails.application.routes.draw do
  resources :users, only: [:new, :create]  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :cats, except: :destroy
  resources :cat_rental_requests, only: [:new, :create] do
    member do
      post :approve
      post :deny
    end
  end

  resource :session 
  root to: redirect('/cats')
end
