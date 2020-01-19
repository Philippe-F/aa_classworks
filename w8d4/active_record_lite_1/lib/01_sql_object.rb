require_relative 'db_connection'
require 'active_support/inflector'
require 'byebug'
# NB: the attr_accessor we wrote in phase 0 is NOT used in the rest
# of this project. It was only a warm up.

class SQLObject

  def self.columns
    # execute2 returns the query as array of hashes with the first element
    # being an array of column names
    # Return @column_names variable if already instantiated to not make a query
    return @column_names if @column_names

    column_names = DBConnection.execute2(<<-SQL)
      SELECT
        *
      FROM
        "#{table_name}"
      LIMIT 
        1
    SQL

    @column_names = column_names.first.map!(&:to_sym)

  end

  def self.finalize!
    # Dynamically create attributes of self to create a hash
    # If @column_names is nil call self.columns to fill it

    self.columns.each do |name|
      # getter attr
      define_method(name) do
        self.attributes[name]         # like hash[key]
      end

      # setter attr
      define_method("#{name}=") do |value|
        self.attributes[name] = value   # like hash[key] = value
      end
    
    end

  end

  def self.table_name=(table_name)
    # Setter for table_name
    @table_name = table_name

  end

  def self.table_name
    # Getter for table_name
    # If table_name has already been instantiated return it
    # else create table_name from the Model name 
    # by using 'active_support/inflector' underscore(converts to snake_case)
    # and pluralize methods EX: "CatToy".underscore.pluralize => "cat_toys"
    @table_name ||= "#{self}".underscore.pluralize

  end

  def self.all
    # Create SQL Query to get all records for the model
    results = DBConnection.execute(<<-SQL)
      SELECT
        #{table_name}.*
      FROM
        #{table_name}
    SQL
    self.parse_all(results)
  end

  def self.parse_all(results)
    # Convert the results : Array of hashes : column_name/value
    # to an array of the Model objects
    results.map{ |hash| self.new(hash) }
  end

  def self.find(id)
    # Find a single object with the given id
    result = DBConnection.execute(<<-SQL , id)
      SELECT
        #{table_name}.*
      FROM
        #{table_name}
      WHERE
        #{table_name}.id = ?
    SQL
    self.parse_all(result).first
  end

  def initialize(params = {})
    # Iterate through the hash of (attr_name, value) pairs 
    params.each do |attr_name, value|
      attr_name = attr_name.to_sym
      if self.class.columns.include?(attr_name)
        self.send("#{attr_name}=",value)
      else
        raise "unknown attribute '#{attr_name}'"
      end
    end

  end

  def attributes
    # lazily initialize @attributes to an empty hash in case it doesn't exist yet
    @attributes ||= {}

  end

  def attribute_values
    # Return the values of the attributes of this object as an Array
    self.class.columns.map{ |column_name| self.send(column_name) } 
  end

  def insert
    # Insert a row of values into the underlying table
    # drop(1) to drop the primary key from insert stmt
    col_names = self.class.columns.drop(1).join(",")          # col1, col2, col3
    question_marks = ["?"] * (self.class.columns.length - 1)  # ?, ?, ?
    question_marks = question_marks.join(", ")

    DBConnection.execute(<<-SQL , *attribute_values.drop(1))
      INSERT INTO
        #{self.class.table_name} (#{col_names})
      VALUES
        (#{question_marks})
    SQL

    self.id = DBConnection.last_insert_row_id

  end

  def update
    # Create the update statement not inserting the primary key
    # set_line like "col1 = ?, col2 = ?"
    set_line = self.class.columns.map { |attr_name| "#{attr_name} = ? " }
    set_line = set_line.drop(1).join(", ")

    DBConnection.execute(<<-SQL , *attribute_values.drop(1),id)
      UPDATE
        #{self.class.table_name} 
      SET
        #{set_line}
      WHERE
        #{self.class.table_name}.id = ?
    SQL

  end

  def save
    # If id = nil insert the row else update the row
    id.nil? ? insert : update
  end
end

