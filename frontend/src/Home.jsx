import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Home() {
  const [addTask, setAddTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("username");
    setUsername(user || "User");
    console.log(username);
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const showTasks = await axios.get(
        "https://taskmanager-5yma.onrender.com/tasks/showTasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log("This ", showTasks.data);
      setTasks(showTasks.data.tasks);
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://taskmanager-5yma.onrender.com/tasks/add",
        { title: addTask },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setTasks([...tasks, response.data.task]);
        toast.success("Task Added", { position: "top-right" });
        setAddTask("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditTask = (taskId) => {
    navigate(`/edit/${taskId}`);
  };
  const handleDeletTask = async (taskId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(
        `https://taskmanager-5yma.onrender.com/delete/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        setTasks(tasks.filter((task) => task._id !== taskId));
        toast.success("Task deleted", { position: "top-right" });
      }
    } catch (error) {}
  };
  const handleTaskCompleted = async (taskId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `https://taskmanager-5yma.onrender.com/tasks/completed/${taskId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setTasks(
          tasks.map((task) =>
            task._id === taskId
              ? { ...task, status: res.data.task.status }
              : task
          )
        );
        toast.info(res.data.message, { position: "top-right" });
      }
    } catch (err) {}
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    toast.success("Logged out successfully");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-light bg-light px-4 mb-4 d-flex justify-content-between">
        <span className="navbar-brand mb-0 h1" style={{ color: "Blue" }}>
          {" "}
          <span style={{ color: "Black" }}>Welcome,</span> {username}
        </span>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Task Manager</h2>

        <div className="row mb-3 justify-content-center">
          <div className="col-md-6">
            <form className="d-flex">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Enter a new task"
                value={addTask}
                onChange={(e) => setAddTask(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleAddTask}
              >
                Add
              </button>
            </form>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <h4>Your Tasks</h4>
            <ul className="list-group">
              {tasks?.map((t) => (
                <li
                  key={t._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span
                    style={{
                      textDecoration:
                        t.status === "completed" ? "line-through" : "none",
                    }}
                  >
                    {t.title}
                  </span>
                  <div>
                    <span
                      className={`badge me-2 ${
                        t.status === "completed"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {t.status}
                    </span>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEditTask(t._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger me-2"
                      onClick={() => handleDeletTask(t._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleTaskCompleted(t._id)}
                    >
                      {t.status === "pending"
                        ? "Mark Completed"
                        : "Mark Pending"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
