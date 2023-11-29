import UserContext from "./UserContext";
import { useContext } from "react";

function Welcome() {
  let user = useContext(UserContext);

  return <span>Welcome back, {user.username}!</span>;
}
export default Welcome;
