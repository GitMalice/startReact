import ArchiTier from "../assets/projet/archi_tier.svg";
import ArchiAll from "../assets/projet/schema_archi_05.svg";

const Projet = () => {
  return (
    <div>
      <p className="hero">
        Avec Linux, tout est :
        <br />
        OPEN SOURCE
        <br />
        AUTOMATISABLE
        <br />
        FICHIER
        <br />
        PROCESS
        <br />
        POSSIBLE.
        <br />
      </p>
      <div className="viewer">
        <div className="content mx-3 mx-md-5">
          <h2 className="etape">Linux, déploiement et architecture</h2>
          <p>
            La segmentation des réseaux et des services visent à optimiser la
            sécurité. En effet, limiter les utilisateurs concernés seulement par
            un service limite les risques d'intrusions, ou d'accès par mouvement
            latéral. Le niveau de sécurité requis augement avec la
            confidentialité des données. On peut établir la répartition des
            priorités selon le schéma de couches suivantes :
          </p>
          <div className="screenshot">
            <img
              className="sc-img"
              src={ArchiTier}
              alt="screenshot de la manipulation"
            />
          </div>
          <p>
            <br />
            <br />
            <br />
            <br />
            Cette hiérarchie oriente notre choix d'architecture, pour cloisonner
            au mieux les différents accès :
          </p>
          <div className="screenshot zoom_me">
            <img
              className="sc-img"
              src={ArchiAll}
              alt="screenshot de la manipulation"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projet;
