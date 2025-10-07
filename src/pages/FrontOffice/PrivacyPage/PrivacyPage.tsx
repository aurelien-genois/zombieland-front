import React from "react";

const CONF = {
  siteName: "ZombieLand",
  domain: "https://exemple.local",
  lastUpdated: "02/10/2025",
  contactEmail: "contact@exemple.local",
  controller: {
    name: "le boss",
    address: "Chez eux",
  },
  dpo: {
    name: "Le boss",
    email: "dpo@exemple.local",
  },
  analytics: {
    tool: "",
    ipAnonymized: true,
  },
  hosting: {
    name: "VPS Olock",
    country: "Fr",
  },
  dataTransfersOutsideEU: false,
};

const sectionStyle: React.CSSProperties = { marginBottom: 24 };
const h2Style: React.CSSProperties = { fontSize: 18, fontWeight: 700, margin: "16px 0 8px", color: "#000" };
const wrapStyle: React.CSSProperties = {
  maxWidth: 880,
  margin: "0 auto",
  padding: "24px 16px",
  lineHeight: 1.6,

  color: "#000", // texte blanc pour fond sombre
  fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  background: "#fff", // facultatif, pour forcer le fond blanc si besoin
};

export default function PrivacyPage() {
  const c = CONF;
  return (
    <main style={wrapStyle}>
      <h2 className="font-bebas text-4xl text-center">Politique de confidentialité</h2>
      <section style={sectionStyle}>
        <h2 style={h2Style}>1. Responsable du traitement</h2>
        <p>
          Le responsable du traitement des données à caractère personnel est <strong>{c.controller.name}</strong>
          {c.controller.address ? <> (adresse : {c.controller.address})</> : null}. Vous pouvez nous contacter à{" "}
          <a href={`mailto:${c.contactEmail}`}>{c.contactEmail}</a>.
        </p>
        {c.dpo?.email && (
          <p>
            Pour toute question relative à la protection des données, vous pouvez contacter notre DPO :{" "}
            {c.dpo.name ? <><strong>{c.dpo.name}</strong> – </> : null}
            <a href={`mailto:${c.dpo.email}`}>{c.dpo.email}</a>.
          </p>
        )}
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>2. Données collectées</h2>
        <ul style={{ paddingLeft: 18 }}>
          <li>Identité et contact (nom, prénom, email) pour les formulaires.</li>
          <li>Données de compte (identifiants, historique de sessions de démonstration).</li>
          <li>Éléments liés aux commandes de billets <em>fictives</em> (dates, nombres de billets).</li>
          <li>Données techniques (adresse IP, logs techniques, navigateur).</li>
          <li>Cookies/traceurs nécessaires au fonctionnement et, avec consentement, mesure d’audience.</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>3. Finalités et bases légales</h2>
        <p>Nous traitons vos données pour les finalités suivantes :</p>
        <ul style={{ paddingLeft: 18 }}>
          <li>Gestion des comptes et démonstrations (intérêt légitime pédagogique).</li>
          <li>Réponse aux demandes via le formulaire de contact (intérêt légitime / mesures précontractuelles).</li>
          <li>Sécurité du site, prévention de la fraude (intérêt légitime).</li>
          <li>Mesure d’audience (consentement si non nécessaire).</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>4. Durées de conservation</h2>
        <p>Les données sont conservées pour la durée strictement nécessaire puis supprimées/anonymisées.</p>
        <ul style={{ paddingLeft: 18 }}>
          <li>Comptes de démo : fin de semestre/évaluation.</li>
          <li>Logs techniques : 3 à 6 mois.</li>
          <li>Demandes de contact : 12 mois.</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>5. Destinataires et hébergement</h2>
        <p>
          Les données sont accessibles aux membres habilités. Elles sont hébergées par <strong>{c.hosting.name}</strong> ({c.hosting.country}).
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>6. Transferts hors de l’Union européenne</h2>
        {c.dataTransfersOutsideEU ? (
          <p>
            Des transferts peuvent intervenir hors UE avec garanties appropriées. Détails sur demande à{" "}
            <a href={`mailto:${c.contactEmail}`}>{c.contactEmail}</a>.
          </p>
        ) : (
          <p>Nous ne réalisons pas de transferts hors de l’UE.</p>
        )}
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>7. Cookies et mesure d’audience</h2>
        <p>
          Cookies nécessaires au fonctionnement. Cookies de mesure d’audience
          {c.analytics.tool ? <> via <em>{c.analytics.tool}</em></> : null}
          {c.analytics.ipAnonymized ? ", avec anonymisation de l’IP." : "."} Déposés uniquement avec votre consentement.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>8. Vos droits</h2>
        <p>
          Droits d’accès, rectification, effacement, limitation, opposition, portabilité. Contact :{" "}
          <a href={`mailto:${c.contactEmail}`}>{c.contactEmail}</a>. Réclamation possible auprès de la CNIL.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>9. Utilisation par des mineurs</h2>
        <p>Utilisation encadrée par l’établissement scolaire. Consentement parental si nécessaire.</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>10. Sécurité</h2>
        <p>
          Mesures techniques/organisationnelles raisonnables (chiffrement en transit, journalisation, principes de moindre privilège).
        </p>
      </section>

      <div className="divider" style={{ margin: "16px 0" }} />

      <section style={sectionStyle}>
        <h2 style={h2Style}>11. Modifications</h2>
        <p>
          Politique susceptible d’évoluer. La date de « Dernière mise à jour » fait foi. En cas de changement important, une info pourra
          être affichée sur l’accueil.
        </p>
      </section>
    </main>
  );
}
