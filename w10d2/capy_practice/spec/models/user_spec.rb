require 'rails_helper' 

RSpec.describe User, type: :model do 
    subject(:user) { FactoryBot.build(:user) } 

    describe "validations" do
        it { should validate_presence_of(:username)} 
        it { should validate_presence_of(:password)}    
        it { should validate_presence_of(:session_token)} 
        it { should validate_length_of(:password).is_at_least(6)}  
    end

    describe "associations" do

    describe "class methods" do
        describe "::find_by_credentials" do
            
        end
    end
    

end 
