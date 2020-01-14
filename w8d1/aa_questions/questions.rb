require 'sqlite3'
require 'singleton'
class QuestionsDatabase < SQLite3::Database
    include Singleton

    def initialize
        super('questions.db')
        self.type_translation = true
        self.results_as_hash = true
    end
end

class Question
    attr_accessor :id, :title, :body, :author_id
    def self.find_by_id(id)
        data = QuestionsDatabase.instance.execute(<<-SQL, id)
            SELECT 
            *
            FROM 
            questions
            WHERE 
            id = ?
        SQL
        return nil if data.nil?
        Question.new(data.first) 
    end

    def self.find_by_author_id(author_id)
        author = QuestionsDatabase.instance.execute(<<-SQL, author_id)
        SELECT
        *
        FROM
        questions
        WHERE
        author_id = ?
        SQL
        author.map {|a| Question.new(a)}
    end

    def initialize(options)
        @id = options['id']
        @title = options['title']
        @body = options['body']
        @author_id = options['author_id']
    end

    def create
        raise "#{self} has already been asked!!!" if @id
        QuestionsDatabase.instance.execute(<<-SQL, @title, @body, @author_id)
        INSERT INTO
        questions(title, body, author_id)
        VALUES
        (?, ?, ?)
        SQL
        self.id = QuestionsDatabase.instance.last_insert_row_id
    end

    def update
        raise "#{self} not asked before!!" unless @id
        QuestionsDatabase.instance.execute(<<-SQL, self.title, self.body, self.author_id, self.id)
        UPDATE
        questions
        SET 
        title = ?, body = ?, author_id = ? 
        WHERE
        id = ?
        SQL
    end

    def author
        # QuestionsDatabase.instance.execute(<<-SQL, self.author_id)
        # SELECT
        # users.fname, users.lname
        # FROM
        # users
        # WHERE
        # id = ?
        # SQL

        name = QuestionsDatabase.instance.execute(<<-SQL, self.author_id)
        SELECT
        users.fname, users.lname
        FROM 
        users
        WHERE
        id = ?
        SQL
        name.first.values.join(" ")
    end

    def replies
        Reply.find_by_question_id(self.id)
    end

    def followers 
        QuestionFollow.followers_for_question_id(self.id) 
    end 
end

class User
    attr_accessor :fname, :lname, :id
    
    def self.find_by_name(fname, lname)
        data = QuestionsDatabase.instance.execute(<<-SQL, fname, lname)
        SELECT 
        *
        FROM 
        users
        WHERE 
        fname = ? AND lname = ?
        SQL
        return nil if data.nil?
        User.new(data.first)
    end

    def initialize(options)
        @id = options['id']
        @fname = options['fname']
        @lname = options['lname']
    end

    def create
        raise "#{self} already exists" if @id
        QuestionsDatabase.instance.execute(<<-SQL, self.fname, self.lname)
        INSERT INTO
        users(fname, lname) 
        VALUES
        (?, ?)
        SQL
        self.id = QuestionsDatabase.instance.last_insert_row_id
    end

    def update
        raise "#{self} doesn't exists" unless @id
        QuestionsDatabase.instance.execute(<<-SQL, self.fname, self.lname, self.id)
        UPDATE
        users
        SET
        fname = ?, lname = ?
        WHERE
        id = ?
        SQL
    end

    def authored_questions
        Question.find_by_author_id(self.id)
    end

    def authored_replies
        Reply.find_by_user_id(self.id)
    end

    def followed_questions
        QuestionFollow.followed_questions_for_user_id(self.id)
    end 

    
end

class QuestionFollow
    attr_reader :user_id, :question_id, :id
    

    def self.followers_for_question_id(question_id)
        QuestionsDatabase.instance.execute(<<-SQL, question_id)
        SELECT
        users.*
        FROM
        users
        JOIN question_follows
        ON users.id = question_follows.user_id 
        WHERE
        question_id = ? 
        SQL
    end 

    def self.followed_questions_for_user_id(user_id)
        QuestionsDatabase.instance.execute(<<-SQL, user_id) 
        SELECT
        questions.*
        FROM 
        questions
        JOIN question_follows
        ON questions.id = question_follows.question_id 
        WHERE
        user_id = ? 
        SQL
    end 

    def self.find_by_id(id)
        data = QuestionsDatabase.instance.execute(<<-SQL, id)
        SELECT
        *
        FROM
        question_follows
        WHERE
        id = ?
        SQL
        return nil if data.nil?
        QuestionFollow.new(data.first)
    end
    
    def initialize(options)
        @id = options['id']
        @user_id = options['user_id']
        @question_id = options['question_id']
    end

    def create
        raise "#{self} already in database" if self.id
        QuestionsDatabase.instance.execute(<<-SQL, self.user_id, self.question_id)
        
        INSERT INTO
        question_follows(user_id, question_id)
        VALUES
        (?, ?)
        SQL
        @id = QuestionsDatabase.instance.last_insert_row_id
    end
end


class Reply
    attr_accessor :body, :user_id, :parent_id, :question_id

    def self.find_by_id(id)
        data = QuestionsDatabase.instance.execute(<<-SQL, id)
        SELECT 
        *
        FROM 
        replies
        WHERE
        id = ?
        SQL

        return nil if data.nil? 
        Reply.new(data.first) 
    end 

    def self.find_by_user_id(user_id)
        users = QuestionsDatabase.instance.execute(<<-SQL, user_id)
        SELECT
        *
        FROM
        replies
        WHERE
        user_id = ?
        SQL
        users.map {|user| Reply.new(user)}
    end

    def self.find_by_question_id(question_id)
        questions = QuestionsDatabase.instance.execute(<<-SQL, question_id)
        SELECT
        *
        FROM
        replies
        WHERE
        question_id = ?
        SQL
        questions.map {|question| Reply.new(question)}
    end

    def initialize(options)
        @id = options['id']
        @body = options['body']
        @user_id = options['user_id']
        @question_id = options['question_id'] 
        @parent_id = options['parent_id']
    end 

    def create 
        QuestionsDatabase.instance.execute(<<-SQL, self.body, self.user_id, self.question_id, self.parent_id)
        INSERT INTO
        replies(body, user_id, question_id, parent_id)
        VALUES
        (?, ?, ?, ?)
        SQL
        @id = QuestionsDatabase.instance.last_insert_row_id
    end

    def author
        # QuestionsDatabase.instance.execute(<<-SQL, self.id)
        # SELECT
        # users.fname, users.lname
        # FROM
        # users
        # WHERE
        # id = ?
        # SQL

        name = QuestionsDatabase.instance.execute(<<-SQL, self.user_id)
        SELECT
        users.fname, users.lname
        FROM 
        users
        WHERE
        id = ?
        SQL
        name.first.values.join(" ")
    end

    def question
        QuestionsDatabase.instance.execute(<<-SQL, self.question_id)
        SELECT
        *
        FROM
        questions
        WHERE
        id = ?
        SQL
    end

    def parent_reply
        QuestionsDatabase.instance.execute(<<-SQL, self.parent_id)
        SELECT
        *
        FROM
        replies
        WHERE
        id = ?
        SQL
    end

    def child_replies
        QuestionsDatabase.instance.execute(<<-SQL, @id)
        SELECT 
        * 
        FROM 
        replies
        WHERE
        parent_id = ?  
        SQL
    end 
end 


class QuestionLike
    attr_reader :user_id, :question_id, :id

    def self.find_by_id(id)
        data = QuestionsDatabase.instance.execute(<<-SQL, id)
        SELECT 
        *
        FROM 
        question_likes
        WHERE
        id = ?
        SQL

        return nil if data.nil? 
        QuestionLike.new(data.first) 
    end 

    def initialize(options)
        @user_id = options['user_id']
        @question_id = options['question_id'] 
    end 

    def create 
        QuestionsDatabase.instance.execute(<<-SQL, self.user_id, self.question_id)
        INSERT INTO
        question_likes(user_id, question_id)
        VALUES
        (?, ?)
        SQL
        @id = QuestionsDatabase.instance.last_insert_row_id
    end 
end 