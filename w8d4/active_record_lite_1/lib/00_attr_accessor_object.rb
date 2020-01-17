class AttrAccessorObject

  def self.my_attr_accessor(*names)

    names.each do |method_name|
      define_method(method_name) do
        self.instance_variable_get("@#{method_name}") 
      end 

      define_method("#{method_name}=") do |method_val|
        self.instance_variable_set("@#{method_name}", method_val) 
      end 
    end 
  end
end
