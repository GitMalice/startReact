import PrometheusService from "../assets/monitoring/config-prometheus-service.png";
import PrometheusRunning from "../assets/monitoring/prometheus-running.jpg";
import GLPIbdd from "../assets/monitoring/bdd_glpi.png";
import GLPIrun from "../assets/monitoring/GLPI_running.png";
import GLPIrun2 from "../assets/monitoring/GLPI_running2.png";
import Grafana1 from "../assets/monitoring/grafana_1.png";
import Grafana2 from "../assets/monitoring/grafana_2.png";
import Grafana3 from "../assets/monitoring/grafana_3.png";
import NodeExporter from "../assets/monitoring/node_exporter.png";
import NodeExporter2 from "../assets/monitoring/node_exporter2.png";
import NodeExporter3 from "../assets/monitoring/node_exporter3.png";
import Zabbix from "../assets/monitoring/zabbix1.png";
import Zabbix2 from "../assets/monitoring/zabbix2.png";
import Zabbix3 from "../assets/monitoring/zabbix3.png";

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
      <div className="screenshot">
        <img
          className="sc-img"
          src={GLPIbdd}
          alt="code de déploiement HTTP apache"
        />
      </div>
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
      <p className="code">tar -xvf glpi-$VER.tgz</p>
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
      <div className="screenshot">
        <img
          className="sc-img"
          src={GLPIrun}
          alt="code de déploiement HTTP apache"
        />
      </div>
      <div className="screenshot">
        <img
          className="sc-img"
          src={GLPIrun2}
          alt="code de déploiement HTTP apache"
        />
      </div>
      <p>
        A noter : les premiers identifiants sont utilisateur :{" "}
        <b>glpi / glpi</b>, à modifier par la suite pour des raisons de
        sécurité.
      </p>
      {/* INSTALLATION DE PROMETHEUS */}
      <h3 className="sous_titre">Prometheus, feu!</h3>
      <p>1. On commence par installer le service</p>
      <p className="code">
        sudo groupadd prometheus
        <br />
        sudo useradd -s /sbin/nologin --system -g prometheus prometheus
        <br />
        sudo useradd --no-create-home --shell /bin/false node_exporter
      </p>
      <p>2. On crée les répertoires d'installation :</p>
      <p className="code">
        sudo mkdir /etc/prometheus
        <br />
        sudo mkdir /var/lib/prometheus
      </p>
      <p>
        3. On donne les droits à ces nouveaux utilisateurs sur les répertoires
        correspondants :
      </p>
      <p className="code">
        sudo chown prometheus:prometheus /var/lib/prometheus
        <br />
        sudo chown prometheus:prometheus /etc/prometheus
      </p>
      <p>
        4. On récupère la dernière version de prometheus en pointant vers son
        dépôt :
      </p>
      <p className="code">
        sudo wget
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
        sudo cp prometheus /usr/local/bin
        <br />
        sudo cp promtool /usr/local/bin
        <br />
        <br />
        sudo chown prometheus:prometheus /usr/local/bin/prometheus
        <br />
        sudo chown prometheus:prometheus /usr/local/bin/promtool
      </p>
      <p>
        7. On peut vérifier que les droits on bien été appliqués sur ces
        répertoires avec :
      </p>
      <p className="code">
        ls-l /usr/local/bin/prometheus
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
        sudo chown -R prometheus:prometheus /etc/prometheus/consoles
        <br />
        sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries
        <br />
        sudo chown -R prometheus:prometheus /etc/prometheus/promtool
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
      <p className="code">sudo nano /etc/systemd/system/Prometheus.service</p>
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
        sudo systemctl daemon-reload
        <br />
        sudo systemctl start prometheus
        <br />
        sudo systemctl enable prometheus
        <br />
        sudo systemctl status prometheus
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
      <h3 className="sous_titre">Grafana + NodeExporter</h3>
      <p>On installe le service et on édite le fichier de configuration :</p>
      <p className="code">
        sudo apt install -y grafana
        <br />
        sudo nano /etc/grafana/grafana.ini
      </p>
      <div className="screenshot">
        <img
          className="sc-img"
          src={Grafana1}
          alt="screenshot de la manipulation"
        />
      </div>
      <p>On autorise le lancement du processus au démarrage avec :</p>
      <p className="code">sudo systemctl enable -now grafana-server</p>
      <p>
        On peut maintenant y accéder sur le navigateur sur <b>localhost:3000</b>{" "}
        . On définit notre mot de passe pour sécuriser l'installation.
      </p>
      <p>
        On peut maintenant installer NodeExporter ! On trouve la référence du
        package le plus récent sur le site :{" "}
        <a href="https://prometheus.io/download/">
          https://prometheus.io/download/
        </a>
      </p>
      <p className="code">
        sudo wget
        https://github.com/prometheus/node_exporter/releases/download/v1.8.2/node_exporter-1.8.2.linux-amd64.tar.gz
        <br />
        tar -xvf node_exporter-1.8.2.linux-amd64.tar.gz
        <br />
        cd node_exporter-1.8.2.linux-amd64
        <br />
        mv node_exporter-1.8.2.linux-amd64 /usr/local/bin
        <br />
      </p>
      <p>On vérifie la version installée :</p>
      <p className="code">node_exporter --version</p>
      <div className="screenshot">
        <img
          className="sc-img"
          src={Grafana2}
          alt="screenshot de la manipulation"
        />
      </div>
      <p>
        On édite les paramètres du service sur le fichier{" "}
        <b>/etc/systemd/node_exporter.service</b> :
      </p>
      <p className="code">
        sudo nano /etc/systemd/system/node_exporter.service
      </p>
      <div className="screenshot">
        <img
          className="sc-img"
          src={Grafana3}
          alt="screenshot de la manipulation"
        />
      </div>
      <p>
        On peut maintenant relancer le service pour prendre en compte les
        nouveaux paramètres.
      </p>
      <p className="code">
        systemctl daemon-reload
        <br />
        sudo systemctl enable node_exporter
        <br />
        sudo systemctl start node_exporter
        <br />
        sudo systemctl status node_exporter
      </p>
      <p>
        Il nous reste à ajouter l'URL de NodeExporter pour lier Grafana à
        Prometheus :
      </p>
      <p className="code">nano /etc/prometheus/prometheus.yml</p>
      <p>
        On ajoute le <b>"localhost:9100"</b> au fichier de configuration :
      </p>
      <div className="screenshot">
        <img
          className="sc-img"
          src={NodeExporter}
          alt="screenshot de la manipulation"
        />
      </div>
      <p>
        On relance Prometheus pour la prise en compte des nouveaux paramètres.
      </p>
      <p className="code">
        sudo systemctl restart prometheus
        <br />
        sudo systemctl status prometheus
      </p>
      <div className="screenshot">
        <img
          className="sc-img"
          src={NodeExporter2}
          alt="screenshot de la manipulation"
        />
      </div>
      <p>
        Ensuite on retourne sur Grafana pour le configurer :
        <ul>
          <li>Cliquer sur data sources</li>
          <li>Selectionner Prometheus</li>
          <li>
            Indiquer l’url de connexion <b>http://localhost:9090</b>
          </li>
          <li>
            Cliquer sur <b>save and test</b>
          </li>
        </ul>
      </p>
      <p>
        Enfin, création du dashboard :
        <ul>
          <li>
            Cliquer sur le <b>+</b> en haut a droite dans Grafana
          </li>
          <li>
            Cliquer sur <b>import dashboard</b>
          </li>
          <li>
            Indiquez l'id <b>14513</b> (possibilité d'id sur
            https://grafana.com/grafana/dashboards/)
          </li>
        </ul>
      </p>
      <div className="screenshot">
        <img
          className="sc-img"
          src={NodeExporter3}
          alt="screenshot de la manipulation"
        />
      </div>
      {/* INSTALLATION DE ZABBIX */}
      <h3 className="sous_titre">Zabbix</h3>
      <div className="screenshot">
        <img
          className="sc-img"
          src={Zabbix}
          alt="screenshot de la manipulation"
        />
      </div>
      <div className="screenshot">
        <img
          className="sc-img"
          src={Zabbix2}
          alt="screenshot de la manipulation"
        />
      </div>
      <div className="screenshot">
        <img
          className="sc-img"
          src={Zabbix3}
          alt="screenshot de la manipulation"
        />
      </div>
    </div>
  );
};

export default Monitoring;
