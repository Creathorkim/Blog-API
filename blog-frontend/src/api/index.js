const API_URL = "https://blog-api-m8jn.onrender.com";

export const getPosts = async () => {
  try {
    const res = await fetch(`${API_URL}/posts`);
    const result = await res.json();
    if (res.ok) {
      return { success: true, result: result };
    } else {
      return { success: false, error: result.error };
    }
  } catch (err) {
    console.log(err);
    return { success: false, error: "Network error, Please try again later." };
  }
};

export const getPost = async (id) => {
  try {
    const res = await fetch(`${API_URL}/posts/${id}`);
    const result = await res.json();
    if (res.ok) {
      return { success: true, result: result };
    } else {
      return { success: false, error: result.error };
    }
  } catch (err) {
    console.log(err);
    return { success: false, error: "Network error, Please try again" };
  }
};

export const signUp = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const result = await res.json();
    if (res.ok) {
      return { success: true, result };
    } else {
      return { success: false, error: result.error };
    }
  } catch (err) {
    console.log(err);
    return { success: false, error: "Network error, Please try again later." };
  }
};

export const LogIn = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const result = await res.json();
    if (res.ok) {
      return { success: true, result };
    } else {
      return { success: false, error: result.error };
    }
  } catch (err) {
    console.log(err);
    return { success: false, error: "Network error, Please try again later." };
  }
};

export const getComment = async (id) => {
  try {
    const res = await fetch(`${API_URL}/posts/comments/${id}`);
    const result = await res.json();
    if (res.ok) {
      return { success: true, result: result };
    } else {
      return { success: false, error: result.error };
    }
  } catch (err) {
    console.log(err);
    return { success: false, error: "Network error, Please try again later" };
  }
};

export const postComment = async (id, commentData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/posts/comments/createNew/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(commentData),
    });

    const result = res.json();

    if (res.ok) {
      return { success: true, result };
    } else {
      return { success: false, error: result.error };
    }
  } catch (err) {
    console.log(err);
    return { success: false, error: "Network error, Please try again later." };
  }
};

export const deleteComment = async (commentId, token) => {
  try {
    const res = await fetch(`${API_URL}/posts/comments/delete/${commentId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = res.json();
    if (res.ok) {
      return { success: true, result };
    } else {
      return { success: false, error: result.error };
    }
  } catch (err) {
    console.log(err);
    return { success: false, error: "Network error, Please try again later." };
  }
};
