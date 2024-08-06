import React from "react";
import apacheRestartImage from "../assets/comp_apache/apache_restart.png";

const Apache = () => {
  return (
    <div>
      <h2 className="etape">Installation d'un serveur apache</h2>
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
        certificat (CSR).
      </p>
      <p className="code_expl">
        <b>-x509</b> indique de créer un certificat auto-signé plutôt qu'une
        demande de signature (utilisé pour les environnements de test ou en
        interne).
      </p>
      <p className="code_expl">
        <b>-nodes, pour "no DES" (Data Encryption Standard)</b> indique que la
        clé privée ne sera pas protégée par un mot de passe - pratique pour les
        redémarrages automatiques sans intervention humaine mais moins sécurisé.
      </p>
      <p className="code_expl">
        <b>-days 365</b> indique la durée de validité du certificats en jours,
        soit une année.
      </p>
      <p className="code_expl">
        <b>-newkey rsa:2048</b> indique de générer une nouvelle clé privée RSA
        de 2048 bits en parallèle du certificat.
      </p>
      <p className="code_expl">
        <b>-keyout et -out</b> indiquent respectivement les chemins des fichiers
        des clé et certificats générés.
      </p>
      <h5 className="sous-titre">Redirection du HTTPS</h5>
      <p>
        On édite les fichiers de configuration du site pour implémenter une
        redirection automatique de HTTP vers HTTPS. Les fichiers concernant le
        site sont stockés par défaut dans /etc/apachesites-available/ .
      </p>
      <p className="code">
        nano /etc/apache2/sites-available/http-to-https-conf
      </p>
      <img
        className="screenshot"
        src={apacheRestartImage}
        alt="code d'installation d'apache"
      />
    </div>
  );
};

export default Apache;
