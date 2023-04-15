import React from "react";

function AuthorInput({formData, author, index, onChange, onDelete }) {
  return (
    <div key={index}>
      <label>
        {console.log(author)}
        Author Name:
        <input
          type="text"
          name={`authorlist[${index}].author`}
          value={formData?.authorlist[index]?.author}
          onChange={onChange}
        />
      </label>
      <label>
        Author ID:
        <input
          type="text"
          name={`authorlist[${index}].author_id`}
          value={formData?.authorlist[index]?.author_id}
          onChange={onChange}
        />
      </label>
      <button type="button" onClick={() => onDelete(index)}>
        Delete Author
      </button>
    </div>
  );
}

export default AuthorInput;
