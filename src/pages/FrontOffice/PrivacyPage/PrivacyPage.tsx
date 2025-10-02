import React from "react";


const CONF = {
  siteName: "ZombieLand ",
  domain: "https://exemple.local",
  lastUpdated: "02/10/2025", 
  contactEmail: "contact@exemple.local",
  controller: {
    name: "Équipe Projet ZombieLand",
    address: "À compléter",
  },
  dpo: {
    name: "(optionnel) Délégué à la protection des données",
    email: "dpo@exemple.local",
  },
  analytics: {
    tool: "",
    ipAnonymized: true,
  },
  hosting: {
    name: "À compléter (hébergeur)",
    country: "À compléter",
  },
  dataTransfersOutsideEU: false, //
};

const sectionStyle: React.CSSProperties = { marginBottom: 24 };
const h2Style: React.CSSProperties = { fontSize: 18, fontWeight: 700, margin: "16px 0 8px" };
const smallStyle: React.CSSProperties = { color: "#fff", fontSize: 12 };
const wrapStyle: React.CSSProperties = {
  maxWidth: 880,
  margin: "0 auto",
  padding: "24px 16px",
  lineHeight: 1.6,
  color: "#fff", // texte blanc pour fond sombre
  fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
};

export default function PrivacyPage() {
  const c = CONF;
  return (
    <main style={wrapStyle}>
      <style>{`a{color:#fff;text-decoration:underline} ::selection{background:rgba(255,255,255,.2)} .divider{border-top:1px solid rgba(255,255,255,0.18)}`}</style>

      <header style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{
          display: "inline-block",
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: 12,
          padding: "4px 10px",
          fontSize: 12,
          letterSpacing: 0.4,
          textTransform: "uppercase",
        }}>
          Politique de confidentialité
        </div>
        <h1 style={{ fontSize: 28, margin: "12px 0 6px" }}>
          {c.siteName} — Protection des données
        </h1>
        <div style={smallStyle}>Dernière mise à jour : {c.lastUpdated}</div>
      </header>

      {/* 1. Qui est responsable ? */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>1. Responsable du traitement</h2>
        <p>
          Le responsable du traitement des données à caractère personnel est <strong>{c.controller.name}</strong>
          {c.controller.address ? <> (adresse : {c.controller.address})</> : null}. Vous pouvez nous contacter à
          {" "}
          <a href={`mailto:${c.contactEmail}`}>{c.contactEmail}</a>.
        </p>
        {c.dpo?.email && (
          <p>
            Pour toute question relative à la protection des données, vous pouvez contacter notre DPO :
            {" "}
            {c.dpo.name ? <><strong>{c.dpo.name}</strong> – </> : null}
            <a href={`mailto:${c.dpo.email}`}>{c.dpo.email}</a>.
          </p>
        )}
      </section>

      {/* 2. Quelles données sont collectées ? */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>2. Données collectées</h2>
        <ul style={{ paddingLeft: 18 }}>
          <li>Identité et contact (nom, prénom, email) pour les formulaires.</li>
          <li>Données de compte (identifiants, historique de sessions de démonstration).</li>
          <li>Éléments liés aux commandes de billets <em>fictives</em> dans le cadre du projet (dates, nombres de billets).</li>
          <li>Données techniques (adresse IP, logs techniques, navigateur) pour la sécurité et les statistiques.</li>
          <li>Cookies/traceurs nécessaires au fonctionnement et, avec consentement, mesure d’audience.</li>
        </ul>
      </section>

      {/* 3. Finalités et bases légales */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>3. Finalités et bases légales</h2>
        <p>Nous traitons vos données pour les finalités suivantes :</p>
        <ul style={{ paddingLeft: 18 }}>
          <li>Gestion des comptes et démonstrations de fonctionnalités (base légale : intérêt légitime pédagogique).</li>
          <li>Réponse aux demandes via le formulaire de contact (base légale : intérêt légitime / mesures précontractuelles).</li>
          <li>Sécurité du site, prévention de la fraude et maintien en conditions opérationnelles (base légale : intérêt légitime).</li>
          <li>Mesure d’audience (base légale : consentement si cookies non nécessaires).</li>
        </ul>
      </section>

      {/* 4. Durées de conservation */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>4. Durées de conservation</h2>
        <p>
          Les données sont conservées pour la durée strictement nécessaire aux objectifs pédagogiques du projet, puis supprimées
          ou anonymisées. À titre indicatif :
        </p>
        <ul style={{ paddingLeft: 18 }}>
          <li>Comptes de démonstration : suppression à la fin du semestre / de l’évaluation.</li>
          <li>Logs techniques : 3 à 6 mois maximum.</li>
          <li>Demandes de contact : 12 mois.</li>
        </ul>
      </section>

      {/* 5. Destinataires et hébergement */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>5. Destinataires et hébergement</h2>
        <p>
          Les données sont accessibles aux membres de l’équipe pédagogique et technique strictement habilités. Elles sont hébergées
          par <strong>{c.hosting.name}</strong> ({c.hosting.country}).
        </p>
      </section>

      {/* 6. Transferts hors UE */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>6. Transferts hors de l’Union européenne</h2>
        {c.dataTransfersOutsideEU ? (
          <p>
            Des transferts peuvent intervenir hors UE. Dans ce cas, nous mettons en place des garanties appropriées (clauses contractuelles types,
            pays reconnus adéquats, mesures complémentaires). Détails disponibles sur demande à {" "}
            <a href={`mailto:${c.contactEmail}`}>{c.contactEmail}</a>.
          </p>
        ) : (
          <p>Nous ne réalisons pas de transferts de données hors de l’Union européenne.</p>
        )}
      </section>

      {/* 7. Cookies et mesure d’audience */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>7. Cookies et mesure d’audience</h2>
        <p>
          Le site utilise des cookies nécessaires au fonctionnement. Des cookies de mesure d’audience peuvent être utilisés
          {c.analytics.tool ? <> via <em>{c.analytics.tool}</em></> : null}
          {c.analytics.ipAnonymized ? ", avec anonymisation de l’IP." : "."} Ces cookies ne sont déposés qu’avec votre consentement.
          Vous pouvez gérer vos préférences via la bannière ou les réglages de votre navigateur.
        </p>
        <p>
          Pour plus d’infos, consultez la page « Cookies » si vous en avez une.
        </p>
      </section>

      {/* 8. Vos droits */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>8. Vos droits</h2>
        <p>
          Vous disposez des droits d’accès, rectification, effacement, limitation, opposition, et portabilité. Pour exercer vos droits,
          contactez <a href={`mailto:${c.contactEmail}`}>{c.contactEmail}</a>. Vous pouvez également adresser une réclamation à la CNIL.
        </p>
      </section>

      {/* 9. Mineurs */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>9. Utilisation par des mineurs</h2>
        <p>
          Le site peut être utilisé dans un cadre encadré par l’établissement scolaire. Lorsque nécessaire, le consentement des titulaires
          de l’autorité parentale est recueilli par l’établissement.
        </p>
      </section>

      {/* 10. Sécurité */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>10. Sécurité</h2>
        <p>
          Nous mettons en œuvre des mesures techniques et organisationnelles raisonnables pour protéger les données (chiffrement en transit,
          journalisation, politiques d’accès minimales). Aucune mesure n’étant parfaite, nous encourageons l’usage de mots de passe forts.
        </p>
      </section>

      <div className="divider" style={{ margin: "16px 0" }} />

      {/* 11. Mise à jour de la politique */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>11. Modifications</h2>
        <p>
          Nous pouvons modifier la présente politique pour des raisons pédagogiques ou techniques. La date de « Dernière mise à jour »
          en haut de page fait foi. En cas de changement important, une information pourra être affichée sur la page d’accueil.
        </p>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.18)", paddingTop: 16, marginTop: 24, fontSize: 12, color: "#fff" }}>
        <div>© {new Date().getFullYear()} {c.controller.name}. Projet scolaire.</div>
        <div>Dernière mise à jour : {c.lastUpdated}</div>
      </footer>
    </main>
  );
}
