# app/models/user.rb

class User
  include Mongoid::Document
  include Mongoid::Timestamps
  field :user_email, type: String
  field :user_name, type: String
  field :user_photo, type: String
  has_many :problems
end
class Problems
  include Mongoid::Document
  field :qno, type: Integer
  field :title, type: String
  field :tags, type: Array, default: []
  field :slug, type: String
  field :difficulty, type: String
  field :bookmark, type: Integer
  has_many :submissions
end
class Submissions
  include Mongoid::Document
  field :date, type: String
  field :time, type: String
  field :duration, type: String
  field :note, type: String
  field :code, type: String
  field :language, type: String
end
