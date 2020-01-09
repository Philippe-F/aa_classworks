class HashSet
  attr_accessor :count

  def initialize(num_buckets = 8)
    @store = Array.new(num_buckets) { Array.new }
    @count = 0
    @num_buckets = num_buckets
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
      self.count -= 1 
    end 
  end

  def include?(num)
    self[num].include?(num)
  end

  private
  attr_accessor :num_buckets

  def [](num)
    # optional but useful; return the bucket corresponding to `num`
    idx = num.hash % num_buckets
    @store[idx]  
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
end
end 
