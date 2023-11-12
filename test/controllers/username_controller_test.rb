require "test_helper"

class UsernameControllerTest < ActionDispatch::IntegrationTest
  test "should get update" do
    get username_update_url
    assert_response :success
  end
end
