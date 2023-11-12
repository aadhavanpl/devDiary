class ProblemsController < ApplicationController
  def index
    @problems = Problem.all
    render json: @problems, status: 200
  end
end
