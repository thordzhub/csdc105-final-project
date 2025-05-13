import {formatISO9075} from "date-fns"; // Importing date formatting function
import {Link} from "react-router-dom"; // Importing Link for navigation

export default function Post({_id, title, summary, cover, content, createdAt, author}) {

  return (
    <div className="post">
      <div className="image">
        {/* Link to post detail page, wrapping the cover image */}
        <Link to={`/post/${_id}`}>
          {/* Displaying the cover image */}
          <img src={'http://localhost:4000/'+cover} alt="Post Cover"/>
        </Link>
      </div>

      <div className="texts">
        {/* Link to post detail page, wrapping the title */}
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>

        <p className="info">
          {/* Displaying the author's username */}
          <a className="author">{author.username}</a>

          {/* Formatting and displaying the post creation date */}
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>

        {/* Displaying the post summary */}
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
