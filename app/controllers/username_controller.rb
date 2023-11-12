class UsernameController < ApplicationController
  def show
    @user = User.find_by(user_email: params[:email])
    
    if @user
      render json: @user, status: :ok
    else
      render json: { error: 'User not found' }, status: :not_found
    end
  end
end