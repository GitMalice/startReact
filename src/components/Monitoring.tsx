import PrometheusService from "../assets/monitoring/config-prometheus-service.png";
import PrometheusRunning from "../assets/monitoring/prometheus-running.jpg";

const Monitoring = () => {
  return (
    <div>
      <h2 className="etape">
        Installation des services GLPI, sa base de données, Prometheus, Grafana,
        NodeExporter et Zabbix
      </h2>
      <h3 className="sous_titre">GLPI let's go</h3>
      <p>
        GLPI requiert les packages PHP et Apache pour pouvoir s'exécuter. On
        commence donc par les installer :
      </p>
      <p className="code">
        sudo apt -y install php
        php-&#123;curl,gd,imagick,intl,apcu,memcache,imap,mysql,cas,ldap,tidy,pear,xmlrpc,pspell,mbstring,json,iconv,xml,gd,xsl,zip,bz2&#125;
        <br />
        <br />
        sudo apt-get -y install apache2 libapache2-mod-php
      </p>
      <p>
        Installation de la base de données MariaDB pour stocker les données de
        GLPI :
      </p>
      <p className="code">sudo apt -y install mariadb-server</p>
      <p>Une fois installée, on peut s'y connecter :</p>
      <p className="code">sudo mysql -u root -p</p>
      <p>
        Nous sommes maintenant dans l'invite de commande de manipulation mySQL,
        nous allons créer notre base de données pour GLPI :
      </p>
      <p className="code">
        CREATE DATABASE glpidb;
        <br />
        <br />
        CREATE USER glpiuser@localhost IDENTIFIED BY 'passwordHere';
        <br />
        <br />
        GRANT ALL PRIVILEGES ON glpidb.* TO glpiuser@localhost;
        <br />
        <br />
        FLUSH PRIVILEGES;
        <br />
        <br />
        exit;
      </p>
      <p>
        On poursuit avec l'installation de GLPI en récupérant sa dernière
        version sur le dépôt officiel :{" "}
        <a href="https://glpi-project.org/downloads/"> (dépôt ici)</a>
      </p>
      <p className="code">
        sudo apt-get -y install wget
        <br />
        export VER="10.0.11"
        <br />
        wget
        https://github.com/glpi-project/glpi/releases/download/$VER/glpi-$VER.tgz
      </p>
      <p>On décompresse l'archive obtenue :</p>
      <p className="code">tar xvf glpi-$VER.tgz</p>
      <p>On déplace le contenu là où l'on souhaite conserver l'application.</p>
      <p className="code">sudo mv glpi /var/www/html</p>
      <p>On modifie les droits de l'utilisateur sur le répertoire :</p>
      <p className="code">sudo chown -R userHere:userHere /var/www/html/glpi</p>
      <p>
        On redémarre ensuite Apache pour être sûr que les modifications sont
        bien effectives
      </p>
      <p className="code">systemctl restart apache2</p>
      <p>
        Le portail est maintenant disponible sur le browser, avec le nom d'hôte
        suivi du répertoire /glpi. Par exemple, on peut mettre //localhost/glpi.
      </p>
      <p>
        A noter : les premiers identifiants sont utilisateur :{" "}
        <b>glpi / glpi</b>, à modifier par la suite pour des raisons de
        sécurité.
      </p>
      {/* INSTALLATION DE PROMETHEUS */}
      <h3 className="sous_titre">Prometheus, feu!</h3>
      <p>1. On commence par installer le service</p>
      <p className="code">
        useradd –no-create-home –shell /bin/false/ Prometheus
        <br />
        useradd –no-create-home –shell /bin/false node_exporter
      </p>
      <p>2. On crée les répertoires d'installation :</p>
      <p className="code">
        mkdir /etc/Prometheus
        <br />
        mkdir /var/lib/prometheus
      </p>
      <p>
        3. On donne les droits à ces nouveaux utilisateurs sur les répertoires
        correspondants :
      </p>
      <p className="code">
        chown prometheus:prometheus /var/lib/Prometheus
        <br />
        chown prometheus:Prometheus /etc/prometheus
      </p>
      <p>
        4. On récupère la dernière version de prometheus en pointant vers son
        dépôt :
      </p>
      <p className="code">
        wget
        https://github.com/prometheus/prometheus/releases/download/v2.54.0-rc.0/prometheus-2.54.0-rc.0.linux-amd64.tar.gz
      </p>
      <p>5. Puis on décompresse l'archive :</p>
      <p className="code">
        sha256sum prometheus-2.54.0-rc.0.linux-amd64.tar.gz
        <br />
        tar -xvf prometheus-2.54.0-rc.0.linux-amd64.tar.gz
        <br />
        cd prometheus-2.54.0-rc.0.linux-amd64
      </p>
      <p>
        6. On copie les fichiers extraits vers le répertoire bin, et on leur
        attribue les droits utilisateurs prévus à cet effet :
      </p>
      <p className="code">
        cp Prometheus /usr/local/bin
        <br />
        cp promtool /usr/local/bin
        <br />
        <br />
        chown prometheus:prometheus /usr/local/bin/Prometheus
        <br />
        chown prometheus:prometheus /usr/local/bin/promtool
      </p>
      <p>
        7. On peut vérifier que les droits on bien été appliqués sur ces
        répertoires avec :
      </p>
      <p className="code">
        ls-l /usr/local/bin/Prometheus
        <br />
        ls-l /usr/local/bin/promtool
      </p>
      <p>
        8. Même chose maintenant avec la suite des répertoires à installer :
      </p>
      <p className="code">
        cp -R consoles /etc/prometheus
        <br />
        cp -R console_libraries /etc/prometheus
        <br />
        cp prometheus.yml /etc/prometheus
        <br />
        <br />
        chown -R prometheus:prometheus /etc/prometheus/consoles
        <br />
        chown -R prometheus:prometheus /etc/prometheus/console_libraries
        <br />
        chown -R prometheus:prometheus /etc/prometheus/promtool
      </p>
      <p>
        9. On peut vérifier que Prometheus est bien installé avec l'affichage de
        la version :
      </p>
      <p className="code">prometheus -verion</p>
      <p>
        10. La configuration du service est disponible dans le fichier{" "}
        <b>/etc/systemd/system/Prometheus.service</b> . On l'édite avec :
      </p>
      <p className="code">nano /etc/systemd/system/Prometheus.service</p>
      <div className="screenshot">
        <img
          className="sc-img"
          src={PrometheusService}
          alt="édition des settings Prometheus"
        />
      </div>
      <p>
        11. Une fois le service configuré, on sauve les modifications et on
        relance le service.
      </p>
      <p className="code">
        systemctl daemon-reload
        <br />
        systemctl start prometheus
        <br />
        systemctl enable prometheus
        <br />
        systemctl status prometheus
      </p>
      <p>12. On peut le voir tourner en vérifiant avec notre-IP:9090</p>
      <div className="screenshot">
        <img
          className="sc-img"
          src={PrometheusRunning}
          alt="édition des settings Prometheus"
        />
      </div>
      {/* INSTALLATION DE GRAFANA */}
      <h3 className="sous_titre">Grafana</h3>
      <h3 className="sous_titre">NodeExporter</h3>
      {/* INSTALLATION DE ZABBIX */}
      <h3 className="sous_titre">Zabbix</h3>
    </div>
  );
};

export default Monitoring;
