import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function EditTask() {
  const [title, setTitle] = useState("");
  const { taskId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:3000/tasks/getTask/${taskId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTitle(res.data.task.title);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTask();
  }, [taskId]);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:3000/tasks/update/${taskId}`,
        { title },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
      if (res.data.success) {
        toast.success("Task updated",{position:"top-right"});
        navigate("/home");
      }
    } catch (err) {}
  };
  return (
    <div
      className="container mt-5"
      style={{
        maxWidth: "500px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0px 0px 15px rgba(0,0,0,0.2)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Edit Task</h2>
      <form>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Edit task title"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #be7e7eff",
            fontSize: "16px",
          }}
        />
        <button
          onClick={handleUpdate}
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Update
        </button>
      </form>
    </div>
  );s
}

export default EditTask;
