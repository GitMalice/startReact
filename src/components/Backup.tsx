import LVMsc from "../assets/backup/Capture-LVM.png";
import CaptureScript from "../assets/backup/Capture-script.png";

const Backup = () => {
  return (
    <div>
      <h2 className="etape">Gestion du stockage + sauvegardes automatisées</h2>
      <p>
        Pour sécuriser notre infrastructure, il est important de réaliser des
        sauvegardes régulières et de les stocker sur une machine distante. Nous
        avons un serveur dédié à cette tâche, qui reçoit une copie de notre
        serveur web.
      </p>
      <p>
        Dans notre scénario, nous partons d'une machine de backup qui reçoit les
        données bientôt saturée. Le serveur gérant un important stock de
        données, on va pouvoir agrandir sa capacité grâce aux possibilités du
        LVM.
      </p>
      <h4 className="sous-titre">Gestion du stockage via LVM</h4>
      <p>
        On ajoute d'abord un espace de stockage sur notre machine, via
        l'hyperviser (un disque dur de 10Go).
      </p>
      <p>
        Pour visualiser les espaces de stockage disponibles, on utilise la
        commande :
      </p>
      <p className="code">lsblk</p>
      <p>Premièrement, on crée une partition sur cet espace :</p>
      <p className="code">fdisk /dev/vdb</p>
      <p className="code_expl">
        en options pour la création :<br />
        <b>n</b> pour créer un nouveau volume
        <br />
        <b>p</b> pour créer un volume primaire
        <br />
        on entre ensuite un numéro de partition
        <br />
        on sélectionne les secteurs par défaut, sauf dimensions spécifiques
        <br />
        <b>w</b> pour sauver
      </p>
      <p>On crée un Volume Group nommé myvg :</p>
      <p className="code">sudo vgcreate myvg /dev/vdb1</p>
      <p>
        Pour vérifier qu'il est bien créé, on peut visualiser les VG existants
        avec :
      </p>
      <p className="code">sudo vgs</p>
      <p>
        Pour travailler sur un volume flexible, on ajoute un Logical Volume,
        mylv, avec la commande :
      </p>
      <p className="code">lvcreate -L 10G -n mylv myvg</p>
      <p>Pour afficher les détails du volume créé, on utilise :</p>
      <p className="code">lvdisplay myvg</p>
      <div className="screenshot">
        <img className="sc-img" src={LVMsc} alt="code de déploiement apache" />
      </div>
      <p>
        On formate ensuite le nouveau volume avec le file system ext4 avec :
      </p>
      <p className="code">mkfs.ext4 /dev/myvg/mylv</p>
      <p>
        On monte le volume pour le rendre accessible comme un répertoire : (ici,
        on y accède sur /backup/)
      </p>
      <p className="code">
        mkdir /backup
        <br />
        mount /dev/myvg/mylv /backup
      </p>
      <p>Le disque est prêt à être utilisé</p>
      <p>
        On arrive ensuite à notre partie du scénario ou le stockage serait sur
        le point d'être saturé, et on souhaite l'étendre avec un disque
        additionnel.
      </p>
      <h5 className="sous-titre">Ajout d'un nouveau disque dur</h5>
      <p>
        On ajoute un nouvel espace de stockage sur la machine, puis on crée la
        partition :
      </p>
      <p className="code">fdisk /dev/vdc</p>
      <p className="code_expl">
        de nouveau, <b>n</b> pour nouveau, <b>p</b> pour partition primaire, la
        taille par défaut, et <b>w</b> pour sauver.
      </p>
      <p>On crée le Physical Volume avec :</p>
      <p className="code">sudo pvcreate /dev/vdc1</p>
      <p>
        Cette fois-ci on étend le Volume Group existant pour englober le nouveau
        PV créé :
      </p>
      <p className="code">sudo vgextend myvg /dev/vdc1</p>
      <p>Et pour vérifier que l'installation est fonctionnelle :</p>
      <p className="code">sudo vgs</p>
      <p>
        Nous avons bien maintenant 15Go d'espace de disponible, ce qui
        correspond bien au premier disque et celui de 5 Go ajouté ensuite.
        SUCCESS !!!
      </p>

      <h4 className="sous-titre">Sauvegardes automatisées</h4>
      <p>
        Nous partons sur la solution rsync pour faire une copie de notre serveur
        source, qui sera ensuite automatisée par un Cron job.
      </p>
      <p>
        Nous installons <b>rsync</b> sur la machine source et la machine cible,
        ainsi que openSSH pour faire la liaison.
      </p>
      <p className="code">
        sudo apt install rsync
        <br />
        sudo apt install openssh-server
      </p>
      <p>On génère ensuite une paire de clés sur la machine source :</p>
      <p className="code">ssh-keygen -t rsa -b 4096</p>
      <p>
        On envoie la clé vers le serveur de backup (192.168.1.62) pour
        s'identifier :
      </p>
      <p className="code">ssh-copy-id adil@192.168.1.62</p>
      <p className="code-expln">
        avec option -i pour spécifier un chemin de clé précis
      </p>
      <p>On peut maintenant établir une connexion :</p>
      <p className="code">ssh adil@192.168.1.62</p>
      <h5 className="sous-titre">Génération du script de backup</h5>
      <p>
        Pour pouvoir automatiser le procédé, on passe les commandes dans un
        script :
      </p>
      <p className="code">
        #!/bin/bash
        <br />
        # Variables
        <br />
        SOURCE_DIR="/home/adil/save"
        <br />
        BACKUP_DIR="/backup/"
        <br />
        BACKUP_HOST="adil@192.168.1.62"
        <br />
        DATE=$(date +'%Y%m%d%H%M')
        <br />
        LOGFILE="/var/log/backup-$DATE.log"
        <br />
        <br />
        # Exécuter rsync pour la sauvegarde
        <br />
        rsync -avz --delete $SOURCE_DIR $BACKUP_HOST:$BACKUP_DIR &gt; $LOGFILE
        2&gt;&1
        <br />
        # Vérifier le résultat
        <br />
        if [ $? -eq 0 ]; then
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;echo "Backup successful at $DATE" &gt;&gt;
        $LOGFILE
        <br />
        else
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;echo "Backup failed at $DATE" &gt;&gt; $LOGFILE
        <br />
        fi
      </p>
      <p className="code_expl">
        Explication des Options rsync : <br />
        <b>-a</b> : Archive, pour conserver les attributs des fichiers.
        <br />
        <b>-v</b> : Verbeux, pour afficher les détails du processus.
        <br />
        <b>-z</b> : Compression, pour réduire la bande passante utilisée pendant
        la transmission.
        <br />
        <b>--delete</b> : Supprimer les fichiers sur le serveur de sauvegarde
        qui ne sont plus présents sur le serveur source.
      </p>
      <div className="screenshot">
        <img
          className="sc-img"
          src={CaptureScript}
          alt="code de déploiement apache"
        />
      </div>
      <p>
        Attention, pour que l'opération soit permise, l'utilisateur doit avoir
        les droits sur les répertoires sources et destination. On lui octroie
        les accès avec les fonctions :
      </p>
      <p className="code">
        sudo chown adil /home/adil/save
        <br />
        sudo chmod 755 /home/adil/save
        <br />
        chown adil /backup
        <br />
        chmod 755 /backup
      </p>
      <p>
        Pour que cela fonctionne, c'est le droit à l'éxécution qui est
        fondamental.
      </p>
      <p>Pour rendre le script exécutable :</p>
      <p className="code">sudo chmod +x /usr/local/bin/backup-script.sh</p>
      <h5 className="sous_titre">Automatisation par les Cron jobs</h5>
      <p>Les Cron jobs sont simples d'utilisation, on y accède ainsi :</p>
      <p className="code">crontab -e</p>
      <p>On ajoute la ligne qui correspond à notre tâche et sa fréquence :</p>
      <p className="code">
        0 2 * * * /usr/local/bin/backup-script.sh &gt;&gt; /var/log/backup.log
        2&gt;&1
      </p>
      <p className="code-expl">
        avec la structure qui reprend les champs : minute heure jour mois année,
        puis la tâche à exécuter
        <br />
        Par exemple, la ligne :<br />
        55 16 * * * /usr/local/bin/backup-script.sh &gt;&gt; /var/log/backup.log
        2&gt;&1
        <br />
        va s'exécuter tous les jours à 16h55 !
      </p>
    </div>
  );
};

export default Backup;
