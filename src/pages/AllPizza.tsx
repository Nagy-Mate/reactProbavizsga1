import { useEffect, useState } from "react";
import type { Pizza } from "../types/Pizza";
import apiClient, { BaseUrl } from "../api/apiClient";
import { toast } from "react-toastify";
import { Button, Card, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const AllPizza = () => {
  const [pizzak, setPizzak] = useState<Array<Pizza>>([]);
  const [kosar, setKosar] = useState<Array<number>>(
    JSON.parse(localStorage.getItem("kosar") ?? "[]"),
  );

  useEffect(() => {
    apiClient
      .get("/pizzak")
      .then((res) => setPizzak(res.data))
      .catch(() => toast.error("Hiba a pizzak lekérésébe"));
  }, []);

  useEffect(() => {
    localStorage.setItem("kosar", JSON.stringify(kosar));
  }, [kosar]);

  const deletePizza = (id: number) => {
    apiClient
      .delete(`/pizzak/${id}`)
      .then(() => {
        toast.success("Sikeresen törölve");
        setPizzak(pizzak.filter((p) => p.id != id));
      })
      .catch(() => toast.error("Sikertelen törlés"));
  };

  const generateCard = (p: Pizza) => {
    return (
      <Card style={{ width: "20rem", margin: 5 }}>
        <Card.Img
          variant="top"
          src={`${BaseUrl}/kepek/${p.imageUrl}`}
          width={300}
        />
        <Card.Body>
          <Card.Title>{p.nev}</Card.Title>
          <Card.Text>
            {p.ar} Ft{" "}
            <Button
              variant="success"
              style={{ float: "right" }}
              onClick={() => {
                if (kosar.includes(p.id)) {
                  toast.error("Ez már a kosárban van");
                } else {
                  setKosar([...kosar, p.id]);
                  toast.success("Kosárba rakva");
                }
              }}
            >
              Kosárba
            </Button>
          </Card.Text>
        </Card.Body>
        <Card.Footer style={{ textAlign: "center" }}>
          <Link to={`/onePizza/${p.id}`}>
            <Button variant="primary" style={{marginRight: 5}}>Részletek</Button>
          </Link>
          <Button
            variant="danger"
            onClick={() => deletePizza(p.id)}
            style={{ marginRight: 5 }}
          >
            Törlés
          </Button>
          <Link to={`/updatePizza/${p.id}`}>
            <Button variant="warning" style={{ marginTop: 5 }}>
              Szerkesztés
            </Button>{" "}
          </Link>
        </Card.Footer>
      </Card>
    );
  };

  return (
    <>
      <Container>
        All pizza   
        <Row>{pizzak.map((p) => generateCard(p))}</Row>
      </Container>
    </>
  );
};
export default AllPizza;
