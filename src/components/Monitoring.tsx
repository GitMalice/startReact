import React from "react";
import GitLabDashboard from "../assets/gitlab/dashboard-gitlab.png";

const Monitoring = () => {
  return (
    <div>
      <h2 className="etape">
        Installation des services GLPI, sa base de données, Prometheus, Grafana,
        NodeExporter et Zabbix
      </h2>
      <h3 className="sous_titre">GLPI let's go</h3>
      <p>BLABLABLA</p>
      {/* INSTALLATION DE PROMETHEUS */}
      <h3 className="sous_titre">Prometheus, feu!</h3>
      <p>On commence par installer le service</p>
      <p className="code">
        useradd –no-create-home –shell /bin/false/ Prometheus
        <br />
        useradd –no-create-home –shell /bin/false node_exporter
      </p>
      <p>On crée les répertoires d'installation :</p>
      <p className="code">
        mkdir /etc/Prometheus
        <br />
        mkdir /var/lib/prometheus
      </p>
      <p>
        On donne les droits à ces nouveaux utilisateurs sur les répertoires
        correspondants :
      </p>
      <p className="code">
        chown prometheus:prometheus /var/lib/Prometheus
        <br />
        chown prometheus:Prometheus /etc/prometheus
      </p>
      <p>
        On récupère la dernière version de prometheus en pointant vers son dépôt
        :
      </p>
      <p className="code">
        wget
        https://github.com/prometheus/prometheus/releases/download/v2.54.0-rc.0/prometheus-2.54.0-rc.0.linux-amd64.tar.gz
      </p>
      <p>Puis on décompresse l'archive :</p>
      <p className="code">
        sha256sum prometheus-2.54.0-rc.0.linux-amd64.tar.gz
        <br />
        tar -xvf prometheus-2.54.0-rc.0.linux-amd64.tar.gz
        <br />
        cd prometheus-2.54.0-rc.0.linux-amd64
      </p>
      {/* INSTALLATION DE GRAFANA */}
      <h3 className="sous_titre">Grafana</h3>
      <h3 className="sous_titre">NodeExporter</h3>
      {/* INSTALLATION DE ZABBIX */}
      <h3 className="sous_titre">Zabbix</h3>
    </div>
  );
};

export default Monitoring;
