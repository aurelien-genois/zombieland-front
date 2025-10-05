import React from "react";

const LEGAL = {
  siteName: "ZombieLand",
  domain: "https://exemple.local", 
  lastUpdated: "02/10/2025", // JJ/MM/AAAA
  editor: {
    company: "ZombieLand Company",
    legalForm: "Projet pédagogique",
    address: "11 rue des catacombes",
    email: "contact@exemple.com",
    phone: "01.12.45.78.12",
  },
  host: {
    name: "À compléter",
    address: "À compléter",
    phone: "À compléter",
    site: "",
  },
  mediator: {
    name: " Médiateur de la consommation",
    site: "",
  },
  jurisdiction: "Droit français – tribunaux du ressort de votre académie/ville",
};

const sectionStyle: React.CSSProperties = { marginBottom: 24 };
const h2Style: React.CSSProperties = { fontSize: 18, fontWeight: 700, margin: "16px 0 8px" };
const wrapStyle: React.CSSProperties = {
  maxWidth: 880,
  margin: "0 auto",
  padding: "24px 16px",
  lineHeight: 1.6,
  fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  color: "#000",
};

export default function LegalPage() {
  const c = LEGAL;
  return (
    <main style={wrapStyle}>
      {/* Éditeur */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Éditeur du site</h2>
        <p><strong>Nom :</strong> {c.editor.company}</p>
        <p><strong>Statut :</strong> {c.editor.legalForm}</p>
        <p><strong>Adresse :</strong> {c.editor.address}</p>
        <p>
          <strong>Contact :</strong> <a href={`mailto:${c.editor.email}`}>{c.editor.email}</a>
          {c.editor.phone && <> — <strong>Tél :</strong> {c.editor.phone}</>}
        </p>
        {c.domain && (
          <p>
            <strong>Site :</strong> <a href={c.domain}>{c.domain}</a>
          </p>
        )}
      </section>

      {/* Hébergeur */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Hébergeur</h2>
        <p><strong>Nom :</strong> {c.host.name}</p>
        <p><strong>Adresse :</strong> {c.host.address}</p>
        <p><strong>Téléphone :</strong> {c.host.phone}</p>
        {c.host.site && (
          <p>
            <strong>Site :</strong> <a href={c.host.site}>{c.host.site}</a>
          </p>
        )}
      </section>

      {/* Données personnelles */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Données personnelles (RGPD)</h2>
        <p>
          Les données éventuellement collectées via ce site (formulaire de contact, compte utilisateur, achat de billets de démonstration, etc.)
          sont traitées dans le cadre d’un projet scolaire. Elles ne font l’objet d’aucune exploitation commerciale et sont conservées
          pour la seule durée nécessaire aux exercices pédagogiques.
        </p>
        <p>
          Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de
          portabilité. Pour exercer vos droits, écrivez-nous à <a href={`mailto:${c.editor.email}`}>{c.editor.email}</a>.
        </p>
        <p>
          En cas de difficulté, vous pouvez également saisir la CNIL.
        </p>
      </section>

      {/* Cookies */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Cookies</h2>
        <p>
          Ce site peut utiliser des cookies techniques (fonctionnement, sécurité, session). Des cookies de mesure d’audience ou marketing
          ne sont activés qu’avec votre consentement (si vous implémentez une bannière). Vous pouvez supprimer les cookies depuis les
          réglages de votre navigateur.
        </p>
      </section>

      {/* Propriété intellectuelle */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Propriété intellectuelle</h2>
        <p>
          Les contenus (textes, images, logos, maquettes, code) publiés dans le cadre de ce projet restent la propriété de leurs auteurs
          respectifs et ne peuvent être réutilisés sans autorisation.
        </p>
      </section>

      {/* Responsabilité */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Responsabilité</h2>
        <p>
          Les informations présentées sont fournies à titre pédagogique et peuvent comporter des erreurs ou des éléments fictifs.
          L’équipe ne saurait être tenue responsable de l’usage qui en est fait.
        </p>
      </section>

      {/* Liens */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Liens hypertexte</h2>
        <p>
          Les liens externes sont fournis pour information. Nous n’exerçons aucun contrôle sur leur contenu et déclinons toute responsabilité
          s’agissant des informations qui y figurent.
        </p>
      </section>

      {/* Droit applicable */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Droit applicable – Médiation</h2>
        <p>{c.jurisdiction}.</p>
        {c.mediator.site && (
          <p>
            Pour tout litige relatif à un achat en ligne, vous pouvez saisir gratuitement : {c.mediator.name} –
            <a href={c.mediator.site}> {c.mediator.site}</a>.
          </p>
        )}
      </section>
    </main>
  );
}
