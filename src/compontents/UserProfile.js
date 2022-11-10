import UserList from "./UserList";
import { useState, useEffect } from "react";
import "./User.css";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    mobileNum: "",
  });

  const [userList, setUserList] = useState([]);

  const [isShowData, setShowData] = useState(true);

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const PostData = async (event) => {
    event.preventDefault();
    const { name, email, password, username, mobileNum } = user;

    const res = await fetch(
      "https://ixonotest.herokuapp.com/api/User/submit-profile",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          mobileNum,
          username,
          password,
        }),
      }
    );
    const data = await res.json();
    if (res.status === 400 || !data) {
      window.alert("Invalid Profile");
      console.log("Invalid Profile");
    } else {
      window.alert("Profile Successfull");
      console.log("Successfull");
    }
  };

  useEffect(() => {
    async function fetchUserList() {
      try {
        const requestUrl =
          "https://ixonotest.herokuapp.com/api/User/get-profiles";
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log(responseJSON);
        setUserList(responseJSON);
      } catch (error) {}
    }
    fetchUserList();
  }, []);

  return (
    <div>
      <section className="form__control">
        <form method="POST" className="form">
          <h1>Profile</h1>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputs}
            />
          </label>
          <br /> <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputs}
            />
          </label>
          <br /> <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputs}
            />
          </label>
          <br /> <br />
          <label>
            Mobile No:
            <input
              type="text"
              name="mobileNum"
              value={user.mobileNum}
              onChange={handleInputs}
            />
          </label>
          <br /> <br />
          <label>
            UserName:
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleInputs}
            />
          </label>
          <br /> <br />
          <button type="submit" onClick={PostData}>
            Sumbit
          </button>
        </form>
      </section>

      <div>
        <button onClick={() => setShowData(!isShowData)}>Show User</button>
        {isShowData && <UserList userList={userList} />}
      </div>
    </div>
  );
};

export default UserProfile;
