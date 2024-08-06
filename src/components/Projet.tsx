import ArchiTier from "../assets/projet/archi_tier.svg";
import ArchiAll from "../assets/projet/schema_archi_05.svg";

const Projet = () => {
  return (
    <div>
      <h2 className="etape">Linux, déploiement et architecture</h2>
      <p>
        En premier, on peut vérifier l'état du réseau entre nos machines avec un
        ping. On installe ensuite Samba :
      </p>
      <p className="code">sudo apt install samba -y</p>
      <p>On édite le fichier de configuration :</p>
      <p className="code">sudo nano /etc/samba/smb.conf</p>
      <div className="screenshot">
        <img
          className="sc-img"
          src={ArchiTier}
          alt="screenshot de la manipulation"
        />
      </div>

      <div className="screenshot">
        <img
          className="sc-img"
          src={ArchiAll}
          alt="screenshot de la manipulation"
        />
      </div>
    </div>
  );
};

export default Projet;
