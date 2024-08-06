import React from "react";
import GitLabStart from "../assets/gitlab/capture-1ere-co-gitlab.png";
import GitLabDashboard from "../assets/gitlab/dashboard-gitlab.png";

const Gitlab = () => {
  return (
    <div>
      <h2 className="etape">Installation d'un serveur GitLab</h2>
      <p>
        Pour installer un serveur GitLab interne à notre équipe, nous
        l'installons sur un serveur Linux dédié.
      </p>
      <p>
        La documentation officielle détaille efficacement les étapes :<br />
        <a href="https://about.gitlab.com/install/#ubuntu">
          https://about.gitlab.com/install/#ubuntu
        </a>
      </p>
      <p>On commence par installer les dépendances nécessaires :</p>
      <p className="code">
        sudo apt-get update
        <br />
        sudo apt-get install -y curl openssh-server ca-certificates tzdata perl
      </p>
      <p>On ajoute Postfix pour les notifications emails :</p>
      <p className="code">sudo apt-get install -y postfix</p>
      <h5 className="sous-titre">
        Installation du package GitLab depuis son dépôt distant :
      </h5>
      <p className="code">
        curl
        https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.deb.sh
        | sudo bash
      </p>
      <p>
        Pour configurer notre DNS, on précise notre URL (localhost dans notre
        cas):
      </p>
      <p className="code">
        sudo EXTERNAL_URL="https://localhost" apt-get install gitlab-ce
      </p>
      <p>
        Pour mettre à jour les derniers changements de configuration, on utilise
        :
      </p>
      <p className="code">sudo gitlab-ctl reconfigure</p>
      <p>
        Après la configuration des mots de passe, GitLab tourne maintenant sur
        le serveur.
      </p>
      <div className="screenshot">
        <img
          className="sc-img"
          src={GitLabStart}
          alt="code de déploiement apache"
        />
      </div>
      <p>
        Il est ensuite recommandé d'adapter les droits d'accès et les
        restrictions nécessaires pour optimiser la sécurité du serveur.
      </p>
      <div className="screenshot">
        <img
          className="sc-img"
          src={GitLabDashboard}
          alt="code de déploiement apache"
        />
      </div>
    </div>
  );
};

export default Gitlab;
