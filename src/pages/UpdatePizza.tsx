import { useEffect, useState } from "react";
import type { Pizza } from "../types/Pizza";
import { useParams } from "react-router-dom";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import type { CPizza } from "../types/CPizza";
import { Button, Container } from "react-bootstrap";

function UpdatePizza() {
  const { id } = useParams();
  const [pizza, setPizza] = useState<Pizza>();
  const [newPizza, setNewPizza] = useState<CPizza>({
    nev: "",
    ar: 0,
    leiras: "",
    imageUrl: "",
  });

  useEffect(() => {
    apiClient
      .get(`/pizzak/${id}`)
      .then((res) => setPizza(res.data))
      .catch(() => toast.error("Hiba a pizzak lekérésébe"));
  }, []);

  const savePizza = () => {
    apiClient
      .put(`/pizzak/${pizza?.id}`, newPizza)
      .then(() => {
        toast.success("Sikeres frissítés");
        setNewPizza({
          nev: "",
          ar: 0,
          leiras: "",
          imageUrl: "",
        });
      })
      .catch(() => toast.error("Sikertelen frissítés"));
  };

  return (
    <>
      {pizza == null ? (
        <h1>Pizza not found! </h1>
      ) : (
        <Container style={{ textAlign: "center" }}>
          <h1>Pizza Frissítése</h1>
          <p>
            Pizza neve:{" "}
            <input
              type="text"
              value={newPizza.nev}
              placeholder={pizza?.nev}
              onChange={(e) =>
                setNewPizza({ ...newPizza, nev: e.target.value })
              }
            />
          </p>
          <p>
            Pizza ára:{" "}
            <input
              type="number"
             
              placeholder={pizza?.ar.toString()}
              onChange={(e) =>
                setNewPizza({ ...newPizza, ar: Number(e.target.value) })
              }
            />
          </p>
          <p>
            Pizza leírása:{" "}
            <input
              type="text"
              value={newPizza.leiras}
              placeholder={pizza?.leiras}
              onChange={(e) =>
                setNewPizza({ ...newPizza, leiras: e.target.value })
              }
            />
          </p>
          <p>
            Pizza kép url:{" "}
            <input
              type="text"
              value={newPizza.imageUrl}
              placeholder={pizza?.imageUrl}
              onChange={(e) =>
                setNewPizza({ ...newPizza, imageUrl: e.target.value })
              }
            />
          </p>
          <Button variant="warning" onClick={savePizza}>
            Mentés
          </Button>
        </Container>
      )}
    </>
  );
}
export default UpdatePizza;
