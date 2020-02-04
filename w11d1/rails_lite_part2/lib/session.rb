require 'json'

class Session
  # find the cookie for this app
  # deserialize the cookie into a hash
  def initialize(req)
    cookie = req.cookies["_rails_lite_app"]

    if cookie
      @value = JSON.parse(cookie)
    else
      @value = {}
    end
  end

  def [](key)
    @value[key]
  end

  def []=(key, val)
    @value[key] = val
  end

  # serialize the hash into json and save in a cookie
  # add to the responses cookies
  def store_session(res)
    cookie_attr = {path: "/", value: @value.to_json}
    res.set_cookie("_rails_lite_app", cookie_attr)
  end

end
