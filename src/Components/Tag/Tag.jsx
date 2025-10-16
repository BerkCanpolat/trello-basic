import './Tag.css';

const Tag = ({ tagName, handleSelectedTag, handleCheckTags }) => {
    const changeTag = {
        Code: { backgroundColor: "#fda821" },
    Life: { backgroundColor: "#15d4c8" },
    Sports: { backgroundColor: "#4cdafc" },
    Exam: { backgroundColor: "#ffd12c" },
    default: { backgroundColor: "#f9f9f9" },
    }
  return (
    <button style={handleCheckTags ? changeTag[tagName] : changeTag.default} type='button' onClick={() => handleSelectedTag(tagName)}>{tagName}</button>
  )
}

export default Tag