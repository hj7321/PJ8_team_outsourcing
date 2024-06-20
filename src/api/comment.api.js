class CommentAPI {
  #supabase;

  constructor(supabase) {
    this.#supabase = supabase;
  }

  async getComments(postId) {
    const response = await this.#supabase.from('comments').select('*, users(email)').eq('post_id', postId);
    console.log('API GET COMMENTS___', response);
    return response;
  }

  async createComment(newCommentData) {
    const response = await this.#supabase.from('comments').insert(newCommentData);
    console.log('API CREATE COMMENT___', response);
    return response;
  }

  async deleteComment(commentId) {
    const response = await this.#supabase.from('comments').delete().eq('comment_id', commentId);
    console.log('API DELETE COMMENT___', response);
    return response;
  }

  // async updatePost(newPostData) {
  //   const response = await this.#supabase.from('posts').update(newPostData).eq('post_id', newPostData.post_id);
  //   console.log('API UPDATE POST___', response);
  //   return response;
  // }

  // async deletePost(deletePostId) {
  //   const response = await this.#supabase.from('posts').delete().eq('post_id', deletePostId);
  //   console.log('API DELETE POST___', response);
  //   return response;
  // }

  // async getPost(postId) {
  //   const response = await this.#supabase.from('posts').select().eq('post_id', postId);
  //   console.log('API GET POST___', response);
  //   return response;
  // }

  // async getPosts() {
  //   const response = await this.#supabase.from('posts').select('*').order('created_at', { ascending: false });
  //   console.log('API GET POSTS___', response);
  //   return response;
  // }
}

export default CommentAPI;
