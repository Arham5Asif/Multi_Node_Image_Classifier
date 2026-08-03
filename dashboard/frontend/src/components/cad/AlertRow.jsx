import { Link } from "react-router-dom";

export default function AlertRow({ alert }) {
  return (
    <tr>
      <td>{alert.worker}</td>

      <td>{alert.issue}</td>

      <td>
        <span className={`severity ${alert.severity.toLowerCase()}`}>
          {alert.severity}
        </span>
      </td>

      <td>{alert.score}</td>

      <td>{alert.time}</td>

      <td>
        <Link className="details-link" to={`/cad/${alert.id}`}>
          View Details
        </Link>
      </td>
    </tr>
  );
}
