import { useState, useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { isEmpty } from "lodash";

export const List = () => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const traerTareas = () => {
    fetch("https://playground.4geeks.com/todo/users/ebattaner", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (!isEmpty(data.todos)) {
          setList(data.todos);
        } else {
          setList([]);
        }
      });
  };

  const nuevaEntrada = (e) => {
    if (e.key === "Enter") {
      fetch("https://playground.4geeks.com/todo/todos/ebattaner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: inputValue, done: false }),
      }).then(() => {
        setInputValue("");
        traerTareas();
      });
    }
  };

  const removeTask = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",
    }).then(traerTareas());
  };

  useEffect(() => {
    traerTareas();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "70px",
        height: "100vh",
      }}
    >
      <ListGroup style={{ width: "30%" }}>
        <ListGroup.Item>
          <input
            placeholder="Aquí tu nueva tarea"
            id="input"
            value={inputValue}
            onKeyDown={(event) => nuevaEntrada(event)}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </ListGroup.Item>
        <ListGroup.Item>
          <h1>To-Do List</h1>
        </ListGroup.Item>
        {list.map((item) => (
          <ListGroup.Item
            key={item.id}
            style={{ display: "flex", alignItems: "center" }}
            onMouseEnter={(e) =>
              (e.currentTarget.querySelector(".badge-remove").style.visibility =
                "visible")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.querySelector(".badge-remove").style.visibility =
                "hidden")
            }
          >
            {item.label}
            <Badge
              bg="dark"
              className="badge-remove"
              style={{
                marginLeft: "auto",
                cursor: "pointer",
                visibility: "hidden",
              }}
              onClick={() => removeTask(item.id)}
            >
              X
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};
