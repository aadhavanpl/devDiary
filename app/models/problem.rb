class Problem
  include Mongoid::Document
  include Mongoid::Timestamps
  field :qno, type: Integer
  field :title, type: String
  field :tags, type: Array
  field :slug, type: String
  field :difficulty, type: String
  field :bookmark, type: Integer
end