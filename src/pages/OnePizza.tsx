import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Pizza } from "../types/Pizza";
import apiClient, { BaseUrl } from "../api/apiClient";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";

function OnePizza() {
  const { id } = useParams();
  const [pizza, setPizza] = useState<Pizza>();

  useEffect(() => {
    apiClient
      .get(`/pizzak/${id}`)
      .then((res) => setPizza(res.data))
      .catch(() => toast.error("Hiba a pizzak lekérésébe"));
  }, [id]);
  return (
    <>
      <Container style={{textAlign:"center"}}>
        <h2>{pizza?.nev}</h2>
        <img src={`${BaseUrl}/kepek/${pizza?.imageUrl}`} alt="Pizza" width={600}/>
        
        <h3>Ár: {pizza?.ar} Ft</h3>
        <p>{pizza?.leiras}</p>
      </Container>
    </>
  );
}
export default OnePizza;
