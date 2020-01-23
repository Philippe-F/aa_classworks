class ChangeColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :name, :string 
    remove_column :users, :email, :string 
    add_column :users, :username, :string, null: false  
  end
end
