const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const prependText = document.getElementById("prependText");
const deleteIconElements = document.querySelectorAll(".delete__icon");

const addComment = (text, id, ownerUsername) => {
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";

  // comment_container 추가
  const commentContainer = document.createElement("div");
  commentContainer.className = "comment_container";

  // comment_userbox 추가
  const commentUserbox = document.createElement("div");
  commentUserbox.className = "comment_userbox";

  const icon = document.createElement("i");
  icon.className = "fas fa-comment";

  const span = document.createElement("span");
  span.className = "comment_username";
  span.innerText = ownerUsername; // 댓글 작성자의 이름

  // deleteIcon 추가
  const deleteIcon = document.createElement("span");
  deleteIcon.className = "delete__icon";
  deleteIcon.innerText = "❌";

  // commentUserbox에 아이콘과 닉네임, 삭제 아이콘 추가
  commentUserbox.appendChild(icon);
  commentUserbox.appendChild(span);
  commentUserbox.appendChild(deleteIcon);  // 삭제 아이콘을 닉네임 옆에 추가

  // comment_textbox 추가
  const commentTextbox = document.createElement("p");
  commentTextbox.className = "comment_textbox";
  commentTextbox.innerText = text;

  // commentContainer에 자식 요소들 추가
  commentContainer.appendChild(commentUserbox);
  commentContainer.appendChild(commentTextbox);

  // newComment에 commentContainer 추가
  newComment.appendChild(commentContainer);

  prependText.prepend(newComment);

  // 삭제 이벤트 추가
  deleteIcon.addEventListener("click", handleDelete);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;

  if (text === "") {
    return;
  }

  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId, ownerUsername, text } = await response.json();
    addComment(text, newCommentId, ownerUsername);  // 여기서 ownerUsername 사용
  }
};

const handleDelete = async (event) => {
  const deleteComment = event.target.closest("li.video__comment");  // 가장 가까운 li 요소 찾기

  const {
    dataset: { id },
  } = deleteComment; // 클릭한 deleteIcon을 포함하는 댓글의 id를 가져옴

  const videoId = videoContainer.dataset.id;

  const response = await fetch(`/api/videos/${videoId}/comment/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentId: id }),
  });

  if (response.status === 200) {
    deleteComment.remove();  // 해당 댓글 li 요소 삭제
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (deleteIconElements) {
  deleteIconElements.forEach((icon) => icon.addEventListener("click", handleDelete));
}
