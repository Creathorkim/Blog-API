const API_URL = "https://blog-api-1-r4vc.onrender.com";

export const login = async (data) => {
  try {
    const res = await fetch(`${API_URL}/authorLogin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) {
      return { success: false, error: result.error };
    }

    if (result.role !== "Author") {
      return { success: false, error: "Not authorized as Author" };
    }

    return { success: true, result };
  } catch (err) {
    console.log(err);
    return { success: false, error: "Network error. Please try again." };
  }
};

export const signUp = async (data) => {
  try {
    const res = await fetch(`${API_URL}/auth/author/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (res.ok) {
      return { success: true, result };
    } else {
      return { success: false, error: result.error };
    }
  } catch (err) {
    console.error(err);
    return { success: false, error: "Network error. Please try again." };
  }
};

export const getPosts = async (token) => {
  try {
    const res = await fetch(`${API_URL}/myPosts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (res.ok) {
      return { success: true, result: result };
    } else {
      return { success: false, error: result.error };
    }
  } catch (err) {
    console.log(err);
    return { success: false, error: "Network error. Please try again." };
  }
};

export const getSinglePost = async (id, token) => {
  try {
    const res = await fetch(`${API_URL}/post/${id}`, {
      method: "Get",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    if (res.ok) {
      return { success: true, result: result.post };
    } else {
      return { success: false, error: result.error };
    }
  } catch (err) {
    console.log(err);
    return { success: false, error: "Network error. Please try again." };
  }
};

export const createPost = async (data, token) => {
  try {
    const res = await fetch(`${API_URL}/posts/createNewPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) {
      return { success: true, result };
    } else {
      return { success: false, error: res.error };
    }
  } catch (err) {
    console.log(err);
    return { success: false, error: "Network error, Please try again later." };
  }
};

export const deletePost = async (id, token) => {
  try {
    const res = await fetch(`${API_URL}/posts/deletePost/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (res.ok) {
      return { success: true, result: result };
    } else {
      return { success: true, error: result.error };
    }
  } catch (err) {
    console.log(err);
    console.log("Network Error. Please try again later");
    return { success: false, error: "Network error, Please try again later." };
  }
};

export const updatePost = async (token, data, id) => {
  try {
    const res = await fetch(`${API_URL}/posts/updatePost/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
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

export const deleteComment = async (id, token) => {
  try {
    const res = await fetch(`${API_URL}/post/${id}/deleteComment`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return { success: "true" };
    } else {
      return { success: false, error: res.error };
    }
  } catch (err) {
    console.log(err);
    return { success: false, error: "Network error, Please try again later." };
  }
};

export const togglePublished = async (token, id, published) => {
  try {
    const res = await fetch(`${API_URL}/togglePublised`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, published }),
    });

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
