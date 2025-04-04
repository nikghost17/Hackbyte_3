import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/timetable">Timetable</Link>
        </li>
        <li>
          <Link to="/feedbackform">Feedback</Link>
        </li>
        <li>
          <Link to="/signup">SignUp</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
