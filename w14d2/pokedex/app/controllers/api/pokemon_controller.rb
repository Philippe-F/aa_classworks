class Api::PokemonController < ApplicationController

  def index
    @pokemon = Pokemon.all 
    render :index 
  end 

  def show
    @poke = Pokemon.find_by(id: params[:id])

    if @poke
      render :show
    else
      render json: "No pokemon with that id"
    end
  end 

end 

