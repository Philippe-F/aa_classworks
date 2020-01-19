class AttrAccessorObject

  # Create getter/ setter methods for all the attribute names
  # sent in as array argument -- using define_method
  def self.my_attr_accessor(*names)
    
    names.each do |attr_name|
      # create getters for the given attributes
      define_method("#{attr_name}") do 
        self.instance_variable_get("@#{attr_name}")
      end

      # create setters for the attributes
      define_method("#{attr_name}=") do |value|
        self.instance_variable_set("@#{attr_name}" , value)
      end

    end

  end
end
