class AddUserIdToCats < ActiveRecord::Migration[5.2]
  def change
    add_column :cats, :user_id, :integer
    add_foreign_key :cats, :users

    add_index :cats, :user_id
  end
end
