const postReducer = (
  state = { posts: null, loading: false, error: false, uploading: false},
  action
) => {
  switch (action.type) {
    // belongs to PostShare.jsx
    case "UPLOAD_START":
      return { ...state, error: false, uploading: true };
    case "UPLOAD_SUCCESS":
      return { ...state, posts: [action.data, ...state.posts], uploading: false, error: false };
    case "UPLOAD_FAIL":
      return { ...state, uploading: false, error: true };
    // belongs to Posts.jsx
    case "RETREIVING_START":
      return { ...state, loading: true, error: false };
    case "RETREIVING_SUCCESS":
      return { ...state, posts: action.data, loading: false, error: false };
    case "RETREIVING_FAIL":
      return { ...state, loading: false, error: true };
    case "DELETE_POST":
      return {...state, loading: false, error: false, posts: state.posts.filter(post => post?._id !== action.data)}
    case "UPDATE_POST":
      window.location.reload()
      return {...state, loading: false, error: false, posts: state.posts.map(post => post?._id === action.data._id ? action.data : post)}
    default:
      return state;
  }
};

export default postReducer;
