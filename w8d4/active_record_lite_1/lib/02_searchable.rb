require_relative 'db_connection'
require_relative '01_sql_object'

module Searchable

  def where(params)

    where_line = params.map { |key, val| "#{key} = ? " }
    where_line = where_line.join(" AND ")

    search_result = DBConnection.execute(<<-SQL , *params.values)
      SELECT
        #{self.table_name}.* 
      FROM
        #{self.table_name}
      WHERE
        #{where_line} 
    SQL

    search_result
  end
  
end

class SQLObject
   extend Searchable 
end
