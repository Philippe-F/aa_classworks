class MaxIntSet

  attr_reader :max 
  attr_accessor :store 

  def initialize(max)
    @max = max 
    @store = Array.new(max) { false }
  end

  def insert(num)
    validate!(num)

    if !self.include?(num) 
      store[num] = true
      return true
    end 
    false
  end 

  def remove(num)
    validate!(num)

    return nil unless self.include?(num)
    store[num] = false

  end

  def include?(num)
    validate!(num)

    store[num]
  end

  private
  def is_valid?(num)
  end

  def validate!(num)
    raise "Out of bounds" unless num.between?(0, max) 
  end
end


class IntSet
  attr_accessor :store
  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { Array.new }
  end

  def insert(num)
    return false if self.include?(num)
    self[num] << num
  end

  def remove(num) 
    self[num].delete(num)
  end

  def include?(num)
    self[num].include?(num)
  end

  private

  def [](num)
    # optional but useful; return the bucket corresponding to `num`
    i = num % num_buckets
    self.store[i] 
  end

  def num_buckets
    self.store.length
  end
end

class ResizingIntSet
  attr_accessor :count
  attr_accessor :num_buckets

  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { Array.new }
    @num_buckets = num_buckets
    @count = 0
  end

  def insert(num)
    if !self.include?(num)  
      if (self.count + 1) > num_buckets
        resize! 
      end 
      self[num] << num 
      self.count += 1 
    end 
  end

  def remove(num)
    if self.include?(num)
      self[num].delete(num)
      count -= 1 
    end 
  end

  def include?(num)
    self[num].include?(num)
  end

  private

  def [](num)
    i = num % num_buckets
    @store[i] 
  end

  def num_buckets
    @store.length
  end

  def resize!
    buckets = num_buckets * 2
    arr = Array.new(buckets){ Array.new }

    num_buckets.times do |i|
      var = self[i][0]
      idx = var % buckets 
      arr[idx] << var 
    end 

    @store = arr 
    num_buckets = buckets  
  end
end
