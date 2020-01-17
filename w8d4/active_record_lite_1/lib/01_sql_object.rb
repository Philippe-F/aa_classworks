require_relative 'db_connection'
require 'active_support/inflector'
require 'byebug' 

# NB: the attr_accessor we wrote in phase 0 is NOT used in the rest
# of this project. It was only a warm up.

class SQLObject
  def self.columns 
    return @column_names if @column_names 
    column_names = DBConnection.instance.execute2(<<-SQL)
      SELECT
      *
      FROM
        "#{self.table_name}"
      LIMIT
        1     
    SQL

    @column_names = column_names.first.map!(&:to_sym)
  end

  def self.finalize!
    
    @column_names ||= self.columns 

    @column_names.each do |name|

      define_method(name) do 
        self.attributes[name] # hash[key]
      end

      define_method("#{name}=") do |val|
        self.attributes[name] = val # hash[key] = val
      end

    end 

  end

  def self.table_name=(table_name)
    @table_name = table_name 
  end

  def self.table_name
    @table_name ||= "#{self}".downcase + "s" 
  end

  def self.all
    results = DBConnection.instance.execute(<<-SQL)
    SELECT
    *
    FROM 
    "#{@table_name}" 
    SQL
    self.parse_all(results) 
  end

  def self.parse_all(results)
    results.each do |hash|
      self.new(hash)
    end
  end

  def self.find(id)

    found = DBConnection.execute(<<-SQL, id)
      SELECT
        *
      FROM
        #{table_name}
      WHERE
        #{table_name}.id = ?
    SQL
    # change to dry code later
    if found.empty?
      return nil
    else
      return self.new(found)
    end
  end

  def initialize(params = {})

    params.each do |attr_name, value|  
      # col_name = attr_name.to_sym
      if self.class.columns.include?(attr_name)
        self.send(attr_name.to_s + "=" , value) # Cat.name = "cat1"
      else 
        raise "unknown attribute #{attr_name}" 
      end 
    end 
  end

  def attributes
    @attributes ||= {}
  end

  def attribute_values
    @column_names.each do |name|
      @attributes[name]
    end 
  end

  def insert

    col_names = "( "
    self.columns.each do |name|
      col_names += name + ","
    end 
    col_names += ")" 
    

    val = self.attribute_values
    debugger
    DBConnection.execute(<<-SQL, col_names, val)
    INSERT INTO
    #{table_name} col_names
    VALUES
    ("?,"* val.length - 1 + "?") 
    SQL
  end

  def update
    # ...
  end

  def save
    # ...
  end
end
