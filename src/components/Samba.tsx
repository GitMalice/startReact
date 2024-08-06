import Samba1 from "../assets/samba/config-samba.png";
import Samba2 from "../assets/samba/samba_run.png";

const Samba = () => {
  return (
    <div>
      <h2 className="etape">Installation d'un service de partage Samba</h2>
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
          src={Samba1}
          alt="screenshot de la manipulation"
        />
      </div>
      <p>On y ajoute à la fin :</p>
      <p className="code">
        [partage]
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;comment = mon_partage
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;path = /home/adil/partage
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;guest ok = no
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;browseable = yes
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;read only = no
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;valid users = adil
      </p>
      <p>
        Ici, l'utilisateur autorisé sera donc <b>Adil</b>!
      </p>
      <p>On crée un dossier qui sera partagé :</p>
      <p className="code">mkdir /home/adil/partage</p>
      <p>Pour tester la configuration, on utilise :</p>
      <p className="code">testparm</p>
      <p>On peut maintenant sur loguer sur Samba :</p>
      <p className="code">sudo smbpasswd -a adil</p>
      <p>
        On entre le mot de passe de session. Cette étape crée un nouvel
        utilisateur dans le groupe <b>samba</b>.
      </p>
      <p>
        On ajoute l'utilitaire <b>cifs-utils</b> qui gère le partage de
        fichiers.
      </p>
      <p className="code">apt install cifs-utils samba-client -y</p>
      <p>
        On relance le service pour la prise en compte des dernières
        modifications.
      </p>
      <p className="code">
        sudo systemctl start smb
        <br />
        sudo systemctl enable smb
      </p>
      <p>
        Et let's go !!! Les fichiers sont maintenant accessible depuis le poste
        Windows distant :)
      </p>
      <div className="screenshot">
        <img
          className="sc-img"
          src={Samba2}
          alt="screenshot de la manipulation"
        />
      </div>
    </div>
  );
};

export default Samba;
