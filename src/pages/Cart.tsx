import { useEffect, useState } from "react";
import type { Pizza } from "../types/Pizza";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { Button, Table } from "react-bootstrap";

function Cart() {
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

  const removeItem = (index: number) => {
    setKosar(kosar.filter((k, v) => v != index));
  };

const osszeg = kosar.reduce((sum, id) => {
  const pizza = pizzak.find((p) => p.id === id);
  return pizza ? sum + pizza.ar : sum;
}, 0);
  return (
    <>
      {kosar.length == 0 ? (
        <h2>Üres a kosár</h2>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Pizza</th>
                <th>Ár</th>
                <th>Művlet</th>
              </tr>
            </thead>
            <tbody>
              {kosar.map((k, index) => {
                const pizza = pizzak.find((p) => p.id == k);
                return (
                  <tr>
                    <td>{pizza?.nev}</td>
                    <td>{pizza?.ar}</td>
                    <td>
                      <Button
                        onClick={() => removeItem(index)}
                        variant="danger"
                      >
                        Törlés
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <h3>Összeg: {osszeg} Ft</h3>
          <Button variant="danger" onClick={() => setKosar([])}>
            Ürítés
          </Button>
        </>
      )}
    </>
  );
}
export default Cart;
