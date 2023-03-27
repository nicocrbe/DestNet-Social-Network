import * as PostsApi from "../api/PostsRequests";

export const getTimelinePosts = (id) => async (dispatch) => {
  
  try {
    const { data } = await PostsApi.getTimelinePosts(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const deletePost = (id) => async(dispatch) => {
  try {
    await PostsApi.deletePost(id)
    dispatch({
      type: "DELETE_POST",
      data: id
    })
  } catch (error) {
    console.error(error)
  }
}

export const editPost = (id, post) => async(dispatch) => {
  try {
    const response = await PostsApi.updatePost(id, post)
    dispatch({
      type: "UPDATE_POST",
      data: response.data
    })
  } catch (error) {
    console.error(error)
  }
}
