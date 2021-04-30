import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

import "./App.css";
//esitetään kaava, johon api:sta saatu tieto syötetään
const Countries = (props) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Country</th>
            <th>Capital</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.name}</td>
            <td>{props.capital}</td>
            <td>{props.population}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

const App = () => {
  // luodaan alasvetovalikon sisältö
  const [selection, setSelection] = useState([
    "",
    "Finland",
    "Sweden",
    "Norway",
    "France",
    "Poland",
    "Estonia",
    "Italy",
  ]);
  const [name, setName] = useState("");
  const [country, setCountry] = useState([]);
  const [valtio, setValtio] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const Add = selection.map((Add) => Add);

  //haetaan valikosta poimitun tekstin
  const handleSelectChange = (e) => setName(selection[e.target.value]);
  //tämä funktio odottaa, kunnes APIsta ladataan tiedot
  const handleClick = async (event) => {
    await getData(name);
    setLoaded(true);
    setName("");
  };
  //annetaan valikosta poimitun tekstin api-haulle ja ladataan tarvittavaa json-dataa
  const getData = (name) => {
    let url = "https://mongo2021.herokuapp.com/api/name/" + name;
    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        setCountry(data);
      });
  };
  //tällä haulla ladataan koko json tiedoston dataa
  const getValtiot = () => {
    fetch("https://mongo2021.herokuapp.com/api/countries")
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        setValtio(data);
      });
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card className="card">
              <h1 className="header">REACT API - PROJECT</h1>
            </Card>
          </Col>
        </Row>
        <Row>
          <div>
            <p>
              Here you can check the basic information about some European
              countries
            </p>
          </div>
        </Row>
        <Row>
          <Col>
            <form>
              <label>
                <h3>Choose a country</h3>
              </label>
              <select
                onChange={(e) => handleSelectChange(e)}
                className="browser-default custom-select"
              >
                {Add.map((selection, key) => (
                  <option value={key}>{selection}</option>
                ))}
              </select>
              <Button
                className="button"
                variant="success"
                onClick={handleClick}
              >
                {" "}
                Submit
              </Button>
            </form>
          </Col>
        </Row>

        <Row>
          <Col>
            {loaded &&
              country.map((any) => (
                <Countries
                  name={any.name}
                  capital={any.capital}
                  population={any.population}
                />
              ))}
          </Col>
        </Row>
        <Row>
          <Col>
            <label>
              <h3>Here you can get the whole list</h3>
            </label>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button className="button" variant="warning" onClick={getValtiot}>
              All the countries
            </Button>

            {valtio.map((some) => (
              <Countries
                name={some.name}
                capital={some.capital}
                population={some.population}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
