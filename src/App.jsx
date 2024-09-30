import React, { useState, useEffect } from "react";
import logo from './assets/logo.png';
import nav from './assets/navbar.png';



import {
  Page,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
  Text,
} from "@react-pdf/renderer";
import { Input, Typography, Button } from "@material-tailwind/react";

// Styles du document PDF
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    padding: 20,
  },
  navbar: {
    marginBottom: 10,
    width: "100%",
    height: "60mm",
  },
  main: {
    marginTop: 20,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #ddd",
    paddingVertical: 5,
   
  },
  tableHeader: {
    fontWeight: "bold",
     backgroundColor :"#000",
    color :"#ffff"
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
});

// Composant Document PDF
const MyDocument = ({ commandes }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.navbar}>
        <Image src={nav} />
      </View>
      <View style={styles.main}>
        <Image
          src={logo}
          style={{ width: "100%", height: "auto", position: "absolute" }}
        />

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.cell, styles.tableHeader]}>N°</Text>
            <Text style={[styles.cell, styles.tableHeader]}>
              Nom de poisson
            </Text>
            <Text style={[styles.cell, styles.tableHeader]}>Poids</Text>

            <Text style={[styles.cell, styles.tableHeader]}>Prix</Text>
          </View>
          {commandes.map((cmd, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.cell}>{cmd.n}</Text>

              <Text style={styles.cell}>{cmd.nom}</Text>
              <Text style={styles.cell}>{cmd.poids}</Text>
              <Text style={styles.cell}>{cmd.prix}</Text>
              </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

// Composant principal
function App() {
  const [client, setClient] = useState({ nom: "", telephone: "" });
  const [commandes, setCommandes] = useState([
    { n: "1", nom: "", prix: "", poids: "" },
  ]);

  useEffect(() => {
    console.log(commandes);
    console.log(client);
  }, [client, commandes]);

  const handleDelete = (index) => {
    const filteredCommandes = commandes.filter((_, i) => i !== index);
    const updatedCommandes = filteredCommandes.map((cmd, i) => ({
      ...cmd,
      n: (i + 1).toString(),
    }));
    setCommandes(updatedCommandes);
  };

  return (
    <>
      <img src={nav} alt="" />
      <div className="w-full h-2 border-b-2 mb-3"></div>
      <Typography
        variant="h5"
        color="blue-gray"
        className="mb-2 p-4 bg-[#11104d] text-white"
      >
        Information client
      </Typography>
      <div className="w-full p-[30px] flex flex-col gap-5">
        <Input
          onChange={(val) => {
            const data = { ...client, nom: val.target.value };
            setClient(data);
          }}
          variant="standard"
          value={client.nom}
          label="Nom & Adresse"
          placeholder="samir longar dely brahim ....."
        />
        <Input
          onChange={(val) => {
            const data = { ...client, telephone: val.target.value };
            setClient(data);
          }}
          variant="standard"
          value={client.telephone}
          label="N° téléphone"
          placeholder="N° téléphone"
        />
      </div>
      <Typography
        variant="h5"
        color="blue-gray"
        className="mb-2 p-4 bg-[#11104d] text-white"
      >
        Commande
      </Typography>
      {commandes.map((e, i) => (
        <div key={i} className="w-full p-4 relative">
          <p className="absolute bg-[#0a5529] text-white p-1 rounded-xl left-8 top-1">
            #{e.n}
          </p>
          <p
            onClick={() => handleDelete(i)}
            className="absolute bg-[#ff0000] flex justify-center items-center text-white w-[25px] h-[25px] rounded-full right-10 top-1"
          >
            <span style={{ cursor: "pointer" }}>X</span>
          </p>
          <div className="w-full p-[30px] flex flex-col gap-3 border-[2px] rounded-md">
            <Input
              onChange={(val) => {
                const data = [...commandes];
                data[i].nom = val.target.value;
                setCommandes(data);
              }}
              variant="standard"
              label="Nom de poisson"
              placeholder="Nom de poisson"
              value={e.nom}
            />
            <Input
              onChange={(val) => {
                const data = [...commandes];
                data[i].prix = val.target.value;
                setCommandes(data);
              }}
              variant="standard"
              label="Prix->1KG"
              placeholder="Prix->1KG"
              value={e.prix}
            />
            <Input
              onChange={(val) => {
                const data = [...commandes];
                data[i].poids = val.target.value;
                setCommandes(data);
              }}
              variant="standard"
              label="Poids"
              placeholder="Poids"
              value={e.poids}
            />
          </div>
        </div>
      ))}
      <div className="w-full flex justify-center">
        <Button
          color="amber"
          onClick={() => {
            const data = [...commandes];
            data.push({
              n: (data.length + 1).toString(),
              nom: "",
              prix: "",
              poids: "",
            });
            setCommandes(data);
          }}
        >
          Ajouter commande
        </Button>
      </div>
      <div className="w-full flex justify-center mt-6">
        <PDFDownloadLink
          document={<MyDocument commandes={commandes} />}
          fileName="example.pdf"
          className="btn btn-primary bg-blue-600 text-[#fff] text-[30px] p-3 rounded-2xl"
        >
          {({ loading }) =>
            loading ? "Chargement du document..." : "Télécharger la facture"
          }
        </PDFDownloadLink>
      </div>
    </>
  );
}

export default App;

