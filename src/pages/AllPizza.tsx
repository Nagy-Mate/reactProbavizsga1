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
  const [osszeg, setOsszeg] = useState<number>(0);

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
          <Card.Text>{p.ar} Ft</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button
            variant="success"
            onClick={() => {
              if (kosar.includes(p.id)) {
                toast.error("Ez már a kosárban van");
              } else {
                setKosar([...kosar, p.id]);
                toast.success("Kosárba rakva");
              }
            }}
            style={{ marginRight: 5 }}
          >
            Kosárba
          </Button>
          <Link to={`/onePizza/${p.id}`}>
            <Button variant="primary">Részletek</Button>{" "}
          </Link>
          <Button variant="danger" onClick={() => deletePizza(p.id)}>
            Törlés
          </Button>
        </Card.Footer>
      </Card>
    );
  };

  return (
    <>
      <Container>
        <Row>{pizzak.map((p) => generateCard(p))}</Row>
      </Container>
    </>
  );
};
export default AllPizza;
