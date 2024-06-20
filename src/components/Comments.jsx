import { useRef } from 'react';
import { useLoaderData } from 'react-router-dom';
import useComment from '../hooks/useComment';
import { useToast } from '../hooks/useToast';
import Comment from './Comment';

/**
 * post_id 어떤 포스트?
 * user_id 작성자 id
 * content 댓글내용
 * created_at 생성시간
 * update_at 수정시간
 */
function Comments() {
  const toast = useToast();
  const loaderData = useLoaderData();
  const { data: postData } = loaderData;

  const inputRef = useRef(null);

  const { comments, isLoading, createComment } = useComment();

  //TODO user_id 하드코딩
  const onCreateCommentHandler = async () => {
    const newCommentData = {
      post_id: postData[0].post_id,
      user_id: '763e8f67-15f6-490e-9c80-5bbb03ba6905',
      created_at: new Date(),
      content: inputRef.current.value || null
    };

    const response = await createComment(newCommentData);
    // console.log('CREATE COMMENT RESPONSE___', response);
    const { error, data } = response;

    if (!data && error) {
      toast.createToast({
        title: 'FAILED',
        content: '댓글 작성에 실패했습니다.'
      });
    } else {
      toast.createToast({
        title: 'SUCCESS',
        content: '댓글을 작성했습니다.'
      });

      inputRef.current.value = '';
    }
  };

  return (
    <div
      className="flex flex-col max-w-[800px] w-full border-t-2 border-gray-200
      border-b-2 bg-gray-100 p-2 "
    >
      <ul className="w-full divide-y-2 divide-solid divide-gray-200 px-2">
        {!isLoading &&
          comments.data?.map(({ comment_id, content, created_at, users }) => (
            <Comment key={comment_id} comment_id={comment_id} content={content} created_at={created_at} users={users} />
          ))}
      </ul>

      <div className="flex flex-col gap-2 ">
        <textarea ref={inputRef} className="w-full p-2 resize-none" placeholder="댓글" maxLength={100} />
        <button
          onClick={onCreateCommentHandler}
          className=" py-2 px-6 text-xs rounded-lg border border-gray-300  ml-auto font-bold text-white
         bg-purple-500 
        hover:bg-purple-600 hover:shadow-md
        active:bg-purple-700"
        >
          버튼
        </button>
      </div>
    </div>
  );
}

export default Comments;
