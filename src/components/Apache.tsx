import ApacheImage1 from "../assets/apache/apache_restart.png";
import ApacheImageConfigHTTPS from "../assets/apache/config-serverweb-http.png";
import ApacheImageConfigHTTP from "../assets/apache/config-serverweb-https.png";
import ApacheImageServerUp from "../assets/apache/capture_apache2.png";

const Apache = () => {
  return (
    <div>
      <h2 className="etape">Installation d'un serveur Apache</h2>
      <p>
        Nous allons déployer un serveur web sur notre machine Linux grâce à
        Apache. On commence par l'installation du package :
      </p>
      <p className="code">sudo apt install apache2</p>
      <h5 className="sous-titre">Génération des certificats</h5>
      <p>
        On s'occupe de la génération des certificats pour rassurer sur
        l'authenticité du site.
      </p>
      <p className="code">
        openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout
        /etc/ssl/private/apache-selfsigned.key -out
        /etc/ssl/certs/apache-selfsigned.crt
      </p>
      <p className="code_expl">
        <b>openssl req</b> est la commande pour générer une signature de
        certificat (CSR). <br />
        <b>-x509</b> indique de créer un certificat auto-signé plutôt qu'une
        demande de signature (utilisé pour les environnements de test ou en
        interne).
        <br />
        <b>-nodes, pour "no DES" (Data Encryption Standard)</b> indique que la
        clé privée ne sera pas protégée par un mot de passe - pratique pour les
        redémarrages automatiques sans intervention humaine mais moins sécurisé.
        <br />
        <b>-days 365</b> indique la durée de validité du certificats en jours,
        soit une année.
        <br />
        <b>-newkey rsa:2048</b> indique de générer une nouvelle clé privée RSA
        de 2048 bits en parallèle du certificat.
        <br />
        <b>-keyout et -out</b> indiquent respectivement les chemins des fichiers
        des clé et certificats générés.
      </p>
      <h5 className="sous-titre">
        Configuration du HTTP pour la redirection HTTPS
      </h5>
      <p>On édite dans un premier temps le fichier de configuration HTTP :</p>
      <p className="code">nano /etc/apache2/sites-available/000-default.conf</p>
      <div className="screenshot">
        <img
          className="sc-img"
          src={ApacheImageConfigHTTP}
          alt="code de déploiement HTTP apache"
        />
      </div>
      <p>
        On crée le fichier de configuration pour implémenter une redirection
        automatique de HTTP vers HTTPS. Les fichiers concernant le site sont
        stockés par défaut dans /etc/apache2/sites-available/ .
      </p>
      <p className="code">
        nano /etc/apache2/sites-available/http-to-https-conf
      </p>
      <div className="screenshot">
        <img
          className="sc-img"
          src={ApacheImageConfigHTTPS}
          alt="code de déploiement HTTP apache"
        />
      </div>
      <div className="screenshot">
        <img
          className="sc-img"
          src={ApacheImage1}
          alt="code de déploiement apache"
        />
      </div>
      <p>
        Apache permettant d'héberger plusieurs sites, on précise celui que l'on
        veut activer avec ces commandes : <br />
        (Apache va créer des liens vers ces références de configurations comme
        celle du site actif)
      </p>
      <p className="code">
        a2ensite http-to-https.conf
        <br />
        a2ensite 000-default.conf
      </p>
      <p>
        On active les modules Apache dont on va se servir avec ces commandes,
        puis on relance le service :
      </p>
      <p className="code">
        a2enmod ssl
        <br />
        a2enmod rewrite
        <br />
        systemctl restart apache2
      </p>
      <p>
        Le service tourne maintenant, en HTTPS, avec le site de disponible :
      </p>
      <div className="screenshot">
        <img
          className="sc-img"
          src={ApacheImageServerUp}
          alt="code de déploiement apache"
        />
      </div>
    </div>
  );
};

export default Apache;
