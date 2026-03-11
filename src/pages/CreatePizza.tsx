import { useState } from "react";
import type { CPizza } from "../types/CPizza";
import { Button, Container } from "react-bootstrap";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";

function CreatePizza() {
  const [pizza, setPizza] = useState<CPizza>({
    nev: "",
    ar: 0,
    leiras: "",
    imageUrl: "",
  });

  const addPizza = () => {
    apiClient
      .post("/pizzak", pizza)
      .then(() => {
        toast.success("Sikeresen létrehozva");
        setPizza({
          nev: "",
          ar: 0,
          leiras: "",
          imageUrl: "",
        });
      })
      .catch(() => toast.error("Sikertelen létrehozás"));
  };
  return (
    <>
      {pizza == null ? (
        <h1>Pizza not found</h1>
      ) : (
        <Container style={{ textAlign: "center" }}>
          <h1>Pizza létrehozása</h1>
          <p>
            Pizza neve:{" "}
            <input
              type="text"
              value={pizza.nev}
              onChange={(e) => setPizza({ ...pizza, nev: e.target.value })}
            />
          </p>
          <p>
            Pizza ára:{" "}
            <input
              type="number"
              onChange={(e) =>
                setPizza({ ...pizza, ar: Number(e.target.value) })
              }
            />
          </p>
          <p>
            Pizza leírása:{" "}
            <input
              type="text"
              value={pizza.leiras}
              onChange={(e) => setPizza({ ...pizza, leiras: e.target.value })}
            />
          </p>
          <p>
            Pizza kép url:{" "}
            <input
              type="text"
              value={pizza.imageUrl}
              onChange={(e) => setPizza({ ...pizza, imageUrl: e.target.value })}
            />
          </p>
          <Button variant="success" onClick={addPizza}>
            Létrehozás
          </Button>
        </Container>
      )}
    </>
  );
}
export default CreatePizza;
