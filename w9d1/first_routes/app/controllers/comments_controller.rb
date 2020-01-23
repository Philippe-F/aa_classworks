class CommentsController < ApplicationController 

    def index
        if params.has_key?(:artwork_id)
            comments = Comment.where(artwork_id: params[:artwork_id])
            render json: comments
        elsif params.has_key?(:user_id)
            comments = Comment.where(user_id: params[:user_id])
            render json: comments
        else
            render json: "artwork not present"
        end
    
    end

    def create
        comment = Comment.new(comment_params)

        if comment.save
            render json: comment 
        else 
            render json: comment.errors.full_messages, status: 422 
        end 
    end

    def destroy
        comment = Comment.find(params[:id])
        comment.destroy
        render json: comment
    end

    private
    def comment_params
        params.require(:comment).permit(:user_id, :artwork_id, :body)
    end

end 