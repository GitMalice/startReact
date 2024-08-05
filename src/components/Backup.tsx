import React from "react";
import GitLabStart from "../assets/gitlab/capture-1ere-co-gitlab.png";
import GitLabDashboard from "../assets/gitlab/dashboard-gitlab.png";

const Backup = () => {
  return (
    <div>
      <h2 className="etape">Sauvegardes automatisées</h2>
      <p>
        Pour sécuriser notre infrastructure, il est important de réaliser des
        sauvegardes régulières et de les stocker sur une machine distante. Nous
        avons un serveur dédié à cette tâche, qui reçoit une copie de notre
        serveur web.
      </p>
    </div>
  );
};

export default Backup;
