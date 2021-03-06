require 'active_support'
require 'active_support/core_ext'
require 'erb'
require_relative './session'
require 'active_support/inflector'

class ControllerBase
  attr_reader :req, :res, :params, :already_built_response

  # Setup the controller
  def initialize(req, res, route_params = {})
    @req = req
    @res = res 
    @params = route_params.merge(req.params)
    @already_built_response = false
  end

  # Helper method to alias @already_built_response
  def already_built_response?
    @already_built_response
  end

  # Set the response status code and header
  def redirect_to(url)
    res.status = 302 
    res.location = url 

    if already_built_response 
      raise "Double render error" 
    else 
      @already_built_response = true 
    end
    if session
      @session.store_session(res)
    end
  end

  # Populate the response with content.
  # Set the response's content type to the given type.
  # Raise an error if the developer tries to double render.
  def render_content(content, content_type)
    @res.write(content)
    @res['Content-Type'] = content_type 

    if already_built_response 
      raise "Double render error" 
    else 
      @already_built_response = true 
    end 
    if session
      @session.store_session(@res)
    end
  end

  # use ERB and binding to evaluate templates
  # pass the rendered html to render_content
  def render(template_name)
    templates_dir = File.dirname(__FILE__)
    template_file = File.join(templates_dir, "..", "views", self.class.to_s.underscore, "#{template_name}.html.erb")
    content = File.read(template_file)

    erb_template = ERB.new(content).result(binding)

    render_content(erb_template, "text/html")
  end

  # method exposing a `Session` object
  def session
    @session ||= Session.new(req)
  end

  # use this with the router to call action_name (:index, :show, :create...)
  def invoke_action(name)
    self.send(name)
    render name unless already_built_response?
  end
end

