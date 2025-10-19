import React, { type JSX } from "react";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import type { IOrder } from "@/@types/order";
import logoSrc from "@/assets/img/logo.png"; 
import QRCode from "qrcode";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
  },
  logo: {
    width: 160,
    marginBottom: 20,
    alignSelf: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 10,
    border: "1px solid #e0e0e0",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  sectionText: {
    marginBottom: 5,
  },
  table: {
    width: "auto",
    marginTop: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 4,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tableCellHeader: {
    flex: 1,
    padding: 5,
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  totalSection: {
    marginTop: 20,
    width: "30%",
    alignSelf: "flex-end",
    border: "1px solid #e0e0e0",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 3,
  },
  qrcode: {
    width: 100,
    marginBottom: 20,
    alignSelf: "center",
  }
});

interface OrderPDFProps {
  order: IOrder;
}

const formatDateFrench = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export default function OrderPDF({ order }: OrderPDFProps): JSX.Element {

  const [qrDataUrl, setQrDataUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (order?.ticket_code) {
      QRCode.toDataURL(order.qr_code, {
        margin: 2,
        errorCorrectionLevel: "H",
        color: { dark: "#000000", light: "#FFFFFF" },
      }).then(setQrDataUrl);
    }
  }, [order?.qr_code]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={logoSrc} style={styles.logo} />

        {qrDataUrl && <Image src={qrDataUrl} style={styles.qrcode} />}

        <Text style={styles.title}>Facture</Text>
        <Text style={styles.subtitle}>Commande n°{order.id}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionText}>
            Client : {order.user.firstname} {order.user.lastname}
          </Text>
          <Text style={styles.sectionText}>
            Date de la commande : {formatDateFrench(order.order_date)}
          </Text>
          <Text style={styles.sectionText}>
            Date de visite : {formatDateFrench(order.visit_date)}
          </Text>
          <Text style={styles.sectionText}>
            Méthode de paiement : {order.payment_method}
          </Text>
          <Text style={styles.sectionText}>
            Code ticket : {order.ticket_code}
          </Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCellHeader}>Produit</Text>
            <Text style={styles.tableCellHeader}>Prix unitaire</Text>
            <Text style={styles.tableCellHeader}>Quantité</Text>
            <Text style={styles.tableCellHeader}>Total</Text>
          </View>

          {order.order_lines.map((line) => (
            <View key={line.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{line.product?.name ?? "—"}</Text>
              <Text style={styles.tableCell}>{line.unit_price} €</Text>
              <Text style={styles.tableCell}>{line.quantity}</Text>
              <Text style={styles.tableCell}>
                {line.unit_price * line.quantity} €
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalSection}>
          <Text style={{ textAlign: "left", marginBottom: 5, fontSize: 12 }}>
            TVA ({order.vat}%) : {order.vat_amount} €
          </Text>
          <Text style={{ textAlign: "left", fontSize: 12, fontWeight: "bold" }}>
            Total TTC : {order.total} €
          </Text>
        </View>
      </Page>
    </Document>
  );
}