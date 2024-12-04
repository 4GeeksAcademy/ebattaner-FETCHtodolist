import { useState } from "react";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";

export const List = () => {
  const [list, setList] = useState([
    {
      task: "Hacer la compra",
      id: crypto.randomUUID(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  function pressKey(event) {
    if (event.code === "Enter") {
      let variable = { task: event.target.value, id: crypto.randomUUID() };
      setList(list.concat(variable));
      setInputValue("");
    }
  }

  function removeTask(id) {
    setList(list.filter((item) => item.id !== id));
  }

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
          <h1>To-Do list</h1>
        </ListGroup.Item>
        <ListGroup.Item>
          <input
            style={{ width: "100%" }}
            type="text"
            placeholder="Aquí tu nueva tarea"
            id="input"
            value={inputValue}
            onKeyDown={(event) => pressKey(event)}
            onChange={(e) => setInputValue(e.target.value)}
          />
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
            {item.task}
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
