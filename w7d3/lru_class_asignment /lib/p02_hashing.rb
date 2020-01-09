class Integer
  # Integer#hash already implemented for you
end

class Array
  def hash
    results = 0
    self.each_with_index do |el, i|
      results += (el.hash + i.hash) ^ results
    end
    results
  end
end

class String
  def hash
    self.bytes.hash
  end
end

class Hash
  # This returns 0 because rspec will break if it returns nil
  # Make sure to implement an actual Hash#hash method
  def hash
    self.sort_by {|k,v| k }.to_a.hash
  end
end
